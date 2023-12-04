import {
  INativeMagic,
  MagicProps,
  nativeFrameStateService,
} from "@nativeblocks/nativeblocks-react";

const NAVIGATION_BACK = "../";

export default class NativeNavigationMagic implements INativeMagic {
  handle(magicProps: MagicProps): void {
    const latestState = nativeFrameStateService.getState();

    const destinationField =
      magicProps.nativeTrigger?.properties?.get("destinationUrl");
    let destination = destinationField?.value;
    latestState.variables?.forEach(
      (variable) =>
        (destination = destination?.replace(
          `{${variable.key}}`,
          variable.value ?? ""
        ))
    );
    destination =
      destination?.replace("{index}", magicProps.index.toString()) ?? "";

    if (destination === NAVIGATION_BACK) {
      window.history.back();
    } else {
      window.location.href = destination;
    }
  }
}
