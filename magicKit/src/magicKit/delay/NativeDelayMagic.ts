import { INativeMagic, MagicProps } from "@nativeblocks/nativeblocks-react";

export default class NativeDelayMagic implements INativeMagic {
  handle(magicProps: MagicProps): void {
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
