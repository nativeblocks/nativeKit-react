import { INativeAction, ActionProps, VariableModel, nativeFrameStateService } from "@nativeblocks/nativeblocks-react";
import { getVariableValue } from "../../utility/VariableUtil";

export default class NativeChangeVariableMagic implements INativeAction {
  handle(magicProps: ActionProps): void {
    const latestState = nativeFrameStateService.getState();

    const properties = magicProps.nativeTrigger?.properties;

    const variableKey = properties?.get("variableKey")?.value ?? "";
    const variableType = properties?.get("variableType")?.value ?? "";
    const variableValue = properties?.get("variableValue")?.value ?? "STRING";

    let value = variableValue;
    latestState.variables?.forEach((variable) => {
      value = getVariableValue(value, variable.key ?? "", variable.value ?? "");
    });

    if (magicProps.onVariableChange) {
      const chagedVariable = {
        key: variableKey,
        value: value,
        type: variableType,
      } as VariableModel;
      magicProps.onVariableChange(chagedVariable);
    }

    if (magicProps.nativeTrigger) {
      if (magicProps.onHandleNextTrigger) {
        magicProps.onHandleNextTrigger(magicProps.nativeTrigger);
      }
    }
  }
}
