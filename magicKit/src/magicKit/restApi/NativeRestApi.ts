import {
  INativeMagic,
  MagicProps,
  nativeFrameStateService,
} from "@nativeblocks/nativeblocks-react";
import axios from "axios";

type RestApiMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
type RestApiRequestModel = {
  url: string;
  method: RestApiMethod;
  headers: any;
  bodyForm: any;
};

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
    if (normalizeEndpointUrl) {
      latestState.variables?.forEach(
        (variable) =>
          (normalizeEndpointUrl = normalizeEndpointUrl?.replace(
            `{${variable.key}}`,
            variable.value ?? ""
          ))
      );
    }

    let normalizeHeaders = headers;
    if (normalizeHeaders) {
      latestState.variables?.forEach(
        (variable) =>
          (normalizeHeaders = normalizeHeaders?.replace(
            `{${variable.key}}`,
            variable.value ?? ""
          ))
      );
    }

    let normalizeBody = body;
    if (normalizeBody) {
      latestState.variables?.forEach(
        (variable) =>
          (normalizeBody = normalizeBody?.replace(
            `{${variable.key}}`,
            variable.value ?? ""
          ))
      );
    }

    normalizeEndpointUrl =
      normalizeEndpointUrl?.replace("{index}", magicProps.index.toString()) ??
      "";
    normalizeHeaders =
      normalizeHeaders?.replace("{index}", magicProps.index.toString()) ?? "";
    normalizeBody =
      normalizeBody?.replace("{index}", magicProps.index.toString()) ?? "";

    const restApiRequestModel: RestApiRequestModel = {
      url: normalizeEndpointUrl,
      method: method.toUpperCase() as RestApiMethod,
      headers: normalizeHeaders ? JSON.parse(normalizeHeaders) : {},
      bodyForm: normalizeBody ? JSON.parse(normalizeBody) : {},
    };

    const successResponseCodeKey =
      properties?.get("successResponseCodeKey")?.value ?? "";
    const successResponseBodyKey =
      properties?.get("successResponseBodyKey")?.value ?? "";
    const successResponseHeaderKey =
      properties?.get("successResponseHeaderKey")?.value ?? "";

    const successResponseCodeVariable = latestState.variables?.get(
      successResponseCodeKey
    );
    const successResponseBodyVariable = latestState.variables?.get(
      successResponseBodyKey
    );
    const successResponseHeaderVariable = latestState.variables?.get(
      successResponseHeaderKey
    );

    const failureResponseCodeKey =
      properties?.get("failureResponseCodeKey")?.value ?? "";
    const failureResponseBodyKey =
      properties?.get("failureResponseBodyKey")?.value ?? "";
    const failureResponseHeaderKey =
      properties?.get("failureResponseHeaderKey")?.value ?? "";

    const failureResponseCodeVariable = latestState.variables?.get(
      failureResponseCodeKey
    );
    const failureResponseBodyVariable = latestState.variables?.get(
      failureResponseBodyKey
    );
    const failureResponseHeaderVariable = latestState.variables?.get(
      failureResponseHeaderKey
    );

    fetch(restApiRequestModel.url, {
      method: restApiRequestModel.method,
      headers: restApiRequestModel.headers,
      body:
        restApiRequestModel.method === "GET" ||
        restApiRequestModel.method === "DELETE"
          ? null
          : restApiRequestModel.bodyForm,
    })
      .then((response) => response.json())
      .then(function (response) {
        if (magicProps.onVariableChange) {
          if (successResponseCodeVariable) {
            const successCode = successResponseCodeVariable;
            successCode.value = response.status.toString();
            magicProps.onVariableChange(successCode);
          }
          if (successResponseBodyVariable) {
            const successBody = successResponseBodyVariable;
            successBody.value = JSON.stringify(response.data);
            magicProps.onVariableChange(successBody);
          }
          if (successResponseHeaderVariable) {
            const successHeaders = successResponseHeaderVariable;
            successHeaders.value = JSON.stringify(response.headers);
            magicProps.onVariableChange(successHeaders);
          }
        }

        if (magicProps.nativeTrigger) {
          if (magicProps.onHandleSuccessNextTrigger) {
            magicProps.onHandleSuccessNextTrigger(magicProps.nativeTrigger);
          }
        }
      })
      .catch(function (error) {
        if (magicProps.onVariableChange) {
          if (failureResponseCodeVariable) {
            const failureCode = failureResponseCodeVariable;
            failureCode.value = error.response.status.toString();
            magicProps.onVariableChange(failureCode);
          }
          if (failureResponseBodyVariable) {
            const failureBody = failureResponseBodyVariable;
            failureBody.value = JSON.stringify(error.response.data);
            magicProps.onVariableChange(failureBody);
          }
          if (failureResponseHeaderVariable) {
            const failureHeaders = failureResponseHeaderVariable;
            failureHeaders.value = JSON.stringify(error.response.headers);
            magicProps.onVariableChange(failureHeaders);
          }
        }

        if (magicProps.nativeTrigger) {
          if (magicProps.onHandleFailureNextTrigger) {
            magicProps.onHandleFailureNextTrigger(magicProps.nativeTrigger);
          }
        }
      });
  }
}
