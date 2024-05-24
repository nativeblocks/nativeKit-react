import { INativeMagic, MagicProps, nativeFrameStateService, VariableModel } from "@nativeblocks/nativeblocks-react";
import { getIndexValue, getVariableValue } from "../../utility/VariableUtil";

type RestApiMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
type RestApiRequestModel = {
  url: string;
  method: RestApiMethod;
  headers: any;
  body: any;
};

function parseJson(data: string, replacements: Map<string, VariableModel> | null): any {
  const parsedData = JSON.parse(data);

  for (const key in parsedData) {
    if (typeof parsedData[key] === "string" && parsedData[key].startsWith("{") && parsedData[key].endsWith("}")) {
      const dynamicValue = parsedData[key].slice(1, -1);
      const replacement = replacements?.get(dynamicValue);

      if (replacement?.value) {
        let replacedValue: any = replacement.value; // Initialize with original value
        if (replacement?.value === "null" || replacement?.value === null) {
          parsedData[key] = null;
        } else if (replacement.type === "STRING") {
          // No change needed (already string)
        } else if (replacement.type === "BOOLEAN") {
          replacedValue = replacedValue === null ? null : replacedValue === "true" ? true : false;
        } else if (
          replacement.type &&
          (replacement.type.toUpperCase().includes("INT") ||
            replacement.type.toUpperCase().includes("FLOAT") ||
            replacement.type.toUpperCase().includes("DOUBLE") ||
            replacement.type.toUpperCase().includes("LONG"))
        ) {
          replacedValue = parseFloat(replacedValue); // Handle numeric types (INT, FLOAT, DOUBLE, LONG)
        }

        parsedData[key] = replacedValue;
      } else {
        parsedData[key] = null; // Handle missing replacements
      }
    }
  }

  return parsedData;
}

export default class NativeRestApi implements INativeMagic {
  handle(magicProps: MagicProps): void {
    const properties = magicProps.nativeTrigger?.properties;

    const latestState = nativeFrameStateService.getState();

    // https://api.example.com/page/{pageVariable}?state={stateVariable}&level={levelVariable}
    const endpointUrl = properties?.get("endpointUrl")?.value ?? "";
    const method = properties?.get("method")?.value ?? "";
    const headers = properties?.get("headers")?.value ?? "";
    const body = properties?.get("body")?.value ?? "";

    let normalizeEndpointUrl = endpointUrl;
    let normalizeHeaders = headers;
    let normalizeBody = body;

    latestState.variables?.forEach((variable) => {
      if (normalizeEndpointUrl) {
        normalizeEndpointUrl = getVariableValue(normalizeEndpointUrl, variable.key, variable.value);
      }
      if (normalizeHeaders) {
        normalizeHeaders = getVariableValue(normalizeHeaders, variable.key, variable.value);
      }
    });

    normalizeEndpointUrl = getIndexValue(normalizeEndpointUrl, magicProps.index);
    normalizeHeaders = getIndexValue(normalizeHeaders, magicProps.index);
    normalizeBody = getIndexValue(normalizeBody, magicProps.index);

    const restApiRequestModel: RestApiRequestModel = {
      url: normalizeEndpointUrl,
      method: method.toUpperCase() as RestApiMethod,
      headers: normalizeHeaders ? JSON.parse(normalizeHeaders) : {},
      body: normalizeBody ? parseJson(normalizeBody, latestState.variables) : {},
    };

    const successResponseCodeKey = properties?.get("successResponseCodeKey")?.value ?? "";
    const successResponseBodyKey = properties?.get("successResponseBodyKey")?.value ?? "";
    const successResponseHeaderKey = properties?.get("successResponseHeaderKey")?.value ?? "";

    const successResponseCodeVariable = latestState.variables?.get(successResponseCodeKey);
    const successResponseBodyVariable = latestState.variables?.get(successResponseBodyKey);
    const successResponseHeaderVariable = latestState.variables?.get(successResponseHeaderKey);

    const failureResponseCodeKey = properties?.get("failureResponseCodeKey")?.value ?? "";
    const failureResponseBodyKey = properties?.get("failureResponseBodyKey")?.value ?? "";
    const failureResponseHeaderKey = properties?.get("failureResponseHeaderKey")?.value ?? "";

    const failureResponseCodeVariable = latestState.variables?.get(failureResponseCodeKey);
    const failureResponseBodyVariable = latestState.variables?.get(failureResponseBodyKey);
    const failureResponseHeaderVariable = latestState.variables?.get(failureResponseHeaderKey);

    const prepearedBody =
      restApiRequestModel.method === "GET" || restApiRequestModel.method === "DELETE"
        ? null
        : JSON.stringify(restApiRequestModel.body);

    let responseStatus: number = 0;
    let responseIsSuccessful: boolean = false;
    let responseHeaders: any = undefined;

    fetch(restApiRequestModel.url, {
      method: restApiRequestModel.method,
      headers: restApiRequestModel.headers,
      body: prepearedBody,
    })
      .then((response) => {
        responseStatus = response.status;
        responseIsSuccessful = response.status >= 200 && response.status <= 399;
        responseHeaders = response.headers;
        return response.json();
      })
      .then((result) => {
        if (magicProps.onVariableChange) {
          if (responseIsSuccessful) {
            if (successResponseCodeVariable) {
              const successCode = successResponseCodeVariable;
              successCode.value = responseStatus.toString();
              magicProps.onVariableChange(successCode);
            }
            if (successResponseHeaderVariable) {
              const successHeaders = successResponseHeaderVariable;
              successHeaders.value = JSON.stringify(responseHeaders);
              magicProps.onVariableChange(successHeaders);
            }
            if (successResponseBodyVariable) {
              const successBody = successResponseBodyVariable;
              successBody.value = JSON.stringify(result);
              magicProps.onVariableChange(successBody);
            }
            if (magicProps.nativeTrigger && result) {
              if (magicProps.onHandleSuccessNextTrigger) {
                magicProps.onHandleSuccessNextTrigger(magicProps.nativeTrigger);
              }
            }
          } else {
            if (failureResponseCodeVariable) {
              const failureCode = failureResponseCodeVariable;
              failureCode.value = responseStatus.toString();
              magicProps.onVariableChange(failureCode);
            }
            if (failureResponseHeaderVariable) {
              const failureHeaders = failureResponseHeaderVariable;
              failureHeaders.value = JSON.stringify(responseHeaders);
              magicProps.onVariableChange(failureHeaders);
            }
            if (failureResponseBodyVariable) {
              const failureBody = failureResponseBodyVariable;
              failureBody.value = JSON.stringify(result);
              magicProps.onVariableChange(failureBody);
            }
            if (magicProps.nativeTrigger && result) {
              if (magicProps.onHandleFailureNextTrigger) {
                magicProps.onHandleFailureNextTrigger(magicProps.nativeTrigger);
              }
            }
          }
        }
      });
  }
}
