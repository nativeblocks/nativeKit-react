import { INativeAction, ActionProps, VariableModel, nativeFrameStateService } from "@nativeblocks/nativeblocks-react";
import { getVariableValue } from "../../utility/VariableUtil";

export default class NativeChangeVariableAction implements INativeAction {
  handle(actionProps: ActionProps): void {
    const latestState = nativeFrameStateService.getState();

    const properties = actionProps.nativeTrigger?.properties;
    const variableKey = properties?.get("variableKey")?.value ?? "";
    const variableType = properties?.get("variableType")?.value ?? "";
    const variableValue = properties?.get("variableValue")?.value ?? "STRING";

    let value = variableValue;
    latestState.variables?.forEach((variable) => {
      value = getVariableValue(value, variable.key ?? "", variable.value ?? "");
    });

    if (actionProps.onVariableChange) {
      const chagedVariable = {
        key: variableKey,
        value: value,
        type: variableType,
      } as VariableModel;
      actionProps.onVariableChange(chagedVariable);
    }

    if (actionProps.nativeTrigger) {
      if (actionProps.onHandleNextTrigger) {
        actionProps.onHandleNextTrigger(actionProps.nativeTrigger);
      }
    }
  }
}
