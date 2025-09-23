import { ActionProps, INativeAction } from "@nativeblocks/nativeblocks-react";

export default class NativeDelayMagic implements INativeAction {
  handle(magicProps: ActionProps): void {
    const delayField = magicProps.nativeTrigger?.properties?.get("delay");
    setTimeout(() => {
      if (magicProps.nativeTrigger) {
        if (magicProps.onHandleNextTrigger) {
          magicProps.onHandleNextTrigger(magicProps.nativeTrigger);
        }
      }
    }, Number(delayField?.value) ?? 0);
  }
}
