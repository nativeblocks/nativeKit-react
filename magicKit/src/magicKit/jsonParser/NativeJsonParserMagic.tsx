import {
  INativeMagic,
  MagicProps,
  NativeVariableModel,
  nativeFrameStateService,
} from "@nativeblocks/nativeblocks-react";
import {
  getIndexValue,
  getJsonPathValue,
  getVariableValue,
} from "../../utility/VariableUtil";

export default class NativeJsonParserMagic implements INativeMagic {
  
  private isObject(item: any): boolean {
    return typeof item === "object" && !Array.isArray(item) && item !== null;
  }
  
  private isArray(item: any): boolean {
    return Array.isArray(item) && item !== null;
  }

  handle(magicProps: MagicProps): void {
    const latestState = nativeFrameStateService.getState();

    const properties = magicProps.nativeTrigger?.properties;

    const variableKey = properties?.get("variableKey")?.value ?? "";
    const variableType = properties?.get("variableType")?.value ?? "";
    const json = properties?.get("json")?.value ?? "";
    const jsonPath = properties?.get("jsonPath")?.value ?? "";

    let jsonPathValue = jsonPath;
    latestState.variables?.forEach((variable) => {
      jsonPathValue = getVariableValue(
        jsonPathValue,
        variable.key ?? "",
        variable.value ?? ""
      );
    });
    jsonPathValue = getIndexValue(jsonPathValue, magicProps.index);

    let jsonValue = latestState.variables?.get(json)?.value ?? "";

    if (magicProps.onVariableChange) {
      const result = getJsonPathValue(jsonValue, jsonPathValue) ?? {};
      const chagedVariable = {
        key: variableKey,
        value: (this.isObject(result) || this.isArray(result)) ? JSON.stringify(result) : result,
        type: variableType,
      } as NativeVariableModel;
      magicProps.onVariableChange(chagedVariable);
    }

    if (magicProps.nativeTrigger) {
      if (magicProps.onHandleNextTrigger) {
        magicProps.onHandleNextTrigger(magicProps.nativeTrigger);
      }
    }
  }
}
