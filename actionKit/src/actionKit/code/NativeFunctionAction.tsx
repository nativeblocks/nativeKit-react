import { INativeAction, ActionProps, nativeFrameStateService, VariableModel } from "@nativeblocks/nativeblocks-react";
import { getVariableValue } from "../../utility/VariableUtil";

type NativeFunction = () => any;

export default class NativeFunctionAction implements INativeAction {
  handle(actionProps: ActionProps): void {
    const latestState = nativeFrameStateService.getState();

    const properties = actionProps.nativeTrigger?.properties;

    const functionCode = properties?.get("functionCode")?.value ?? "";
    const variableKey = properties?.get("variableKey")?.value ?? "";
    const variableType = properties?.get("variableType")?.value ?? "";

    let value = functionCode;
    latestState.variables?.forEach((variable) => {
      value = getVariableValue(value, variable.key ?? "", variable.value ?? "");
    });

    const nativeFunction: NativeFunction = new Function(value) as NativeFunction;

    const result: any = nativeFunction();

    if (actionProps.onVariableChange) {
      const chagedVariable = {
        key: variableKey,
        value: result ? JSON.stringify(result) : "",
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
