import {
  INativeMagic,
  MagicProps,
  NativeVariableModel,
  nativeFrameStateService,
} from "@nativeblocks/nativeblocks-react";

export default class NativeChangeVariableMagic implements INativeMagic {
  handle(magicProps: MagicProps): void {
    const latestState = nativeFrameStateService.getState();

    const properties = magicProps.nativeTrigger?.properties;

    const variableKey = properties?.get("variableKey")?.value ?? "";
    const variableType = properties?.get("variableType")?.value ?? "";
    const variableValue = properties?.get("variableValue")?.value ?? "STRING";

    let value = variableValue;
    latestState.variables?.forEach(
      (variable) =>
        (value = value?.replace(`{${variable.key}}`, variable.value ?? ""))
    );

    if (magicProps.onVariableChange) {
      const chagedVariable = {
        key: variableKey,
        value: value,
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
