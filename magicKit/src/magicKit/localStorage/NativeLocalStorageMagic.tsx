import { INativeMagic, MagicProps, VariableModel, nativeFrameStateService } from "@nativeblocks/nativeblocks-react";

export default class NativeLocalStorageMagic implements INativeMagic {
  handle(magicProps: MagicProps): void {
    const latestState = nativeFrameStateService.getState();

    const properties = magicProps.nativeTrigger?.properties;
    const actionType = properties?.get("actionType")?.value ?? "";

    const storageKey = properties?.get("storageKey")?.value ?? "";
    const variableKey = properties?.get("variableKey")?.value ?? "";

    const variable = latestState.variables?.get(variableKey);

    switch (actionType) {
      case "GET":
        const localStorageValue = localStorage.getItem(storageKey);
        if (magicProps.onVariableChange) {
          const chagedVariable = {
            key: variableKey,
            value: localStorageValue,
            type: variable?.type,
          } as VariableModel;
          magicProps.onVariableChange(chagedVariable);
        }
        break;
      case "ADD":
        if (variable?.value) {
          const value = localStorage.setItem(storageKey, variable?.value);
        }
        break;
      case "UPDATE":
        if (variable?.value) {
          const value = localStorage.setItem(storageKey, variable?.value);
        }
        break;
      case "DELETE":
        if (variable?.value) {
          const value = localStorage.removeItem(storageKey);
        }
        break;
    }

    if (magicProps.nativeTrigger) {
      if (magicProps.onHandleNextTrigger) {
        magicProps.onHandleNextTrigger(magicProps.nativeTrigger);
      }
    }
  }
}
