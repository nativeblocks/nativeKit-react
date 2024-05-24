import { INativeMagic, MagicProps, nativeFrameStateService, VariableModel } from "@nativeblocks/nativeblocks-react";
import { getVariableValue } from "../../utility/VariableUtil";

type NativeFunction = () => any;

export default class NativeFunctionMagic implements INativeMagic {
  handle(magicProps: MagicProps): void {
    const latestState = nativeFrameStateService.getState();

    const properties = magicProps.nativeTrigger?.properties;

    const functionCode = properties?.get("functionCode")?.value ?? "";
    const variableKey = properties?.get("variableKey")?.value ?? "";
    const variableType = properties?.get("variableType")?.value ?? "";

    let value = functionCode;
    latestState.variables?.forEach((variable) => {
      value = getVariableValue(value, variable.key ?? "", variable.value ?? "");
    });

    const nativeFunction: NativeFunction = new Function(value) as NativeFunction;

    const result: any = nativeFunction();

    if (magicProps.onVariableChange) {
      const chagedVariable = {
        key: variableKey,
        value: result ? JSON.stringify(result) : "",
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
