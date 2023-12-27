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
      const chagedVariable = {
        key: variableKey,
        value: JSON.stringify(getJsonPathValue(jsonValue, jsonPathValue) ?? {}),
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
