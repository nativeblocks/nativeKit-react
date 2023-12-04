import {
  INativeMagic,
  MagicProps,
  NativeVariableModel,
  nativeFrameStateService,
} from "@nativeblocks/nativeblocks-react";
import { getJsonPathValue, getVariableValue } from "../../utility/VariableUtil";

export default class NativeJsonParserMagic implements INativeMagic {
  handle(magicProps: MagicProps): void {
    const latestState = nativeFrameStateService.getState();

    const properties = magicProps.nativeTrigger?.properties;

    const variableKey = properties?.get("variableKey")?.value ?? "";
    const variableType = properties?.get("variableType")?.value ?? "";
    const json = properties?.get("json")?.value ?? "";
    const jsonPath = properties?.get("jsonPath")?.value ?? "";

    let jsonPathValue = jsonPath
    latestState.variables?.forEach((variable) => {
      jsonPathValue = getVariableValue(jsonPathValue, variable.key ?? "", variable.value ?? "")
    });
    jsonPathValue = getVariableValue(jsonPathValue, "index", magicProps.index.toString())

    let jsonValue = json
    latestState.variables?.forEach((variable) => {
      jsonValue = getVariableValue(jsonValue, variable.key ?? "", variable.value ?? "")
    });
    jsonValue = getVariableValue(jsonValue, "index", magicProps.index.toString())

    if (magicProps.onVariableChange) {
      const chagedVariable = {
        key: variableKey,
        value: getJsonPathValue(jsonValue, jsonPathValue),
        variableType: variableType,
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
