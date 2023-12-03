import { NativeblocksManager } from "@nativeblocks/nativeblocks-react";

import NativeContainerBlock from "./container/NativeContainerBlock";
import NativeButtonBlock from "./button/NativeButtonBlock";
import NativeTextBlock from "./text/NativeTextBlock";
import NativeListBlock from "./list/NativeListBlock";
import NativeTextFieldBlock from "./textField/NativeTextFieldBlock";
import NativeImageBlock from "./image/NativeImageBlock";
import NativeDropdownBlock from "./dropdown/NativeDropdownBlock";
import NativeCheckboxBlock from "./checkbox/NativeCheckboxBlock";
import NativeSwitchBlock from "./switch/NativeSwitchBlock";
import NativeIframeBlock from "./iframe/NativeIframeBlock";

export const NativeblocksBlockHelper = {
  provideBlocks() {
    NativeblocksManager.getInstance().provideBlock(
      "NATIVE_CONTAINER",
      NativeContainerBlock
    );
    NativeblocksManager.getInstance().provideBlock(
      "NATIVE_LIST",
      NativeListBlock
    );
    NativeblocksManager.getInstance().provideBlock(
      "NATIVE_TEXT",
      NativeTextBlock
    );
    NativeblocksManager.getInstance().provideBlock(
      "NATIVE_BUTTON",
      NativeButtonBlock
    );
    NativeblocksManager.getInstance().provideBlock(
      "NATIVE_TEXT_FIELD",
      NativeTextFieldBlock
    );
    NativeblocksManager.getInstance().provideBlock(
      "NATIVE_IMAGE",
      NativeImageBlock
    );
    NativeblocksManager.getInstance().provideBlock(
      "NATIVE_DROPDOWN",
      NativeDropdownBlock
    );
    NativeblocksManager.getInstance().provideBlock(
      "NATIVE_CHECKBOX",
      NativeCheckboxBlock
    );
    NativeblocksManager.getInstance().provideBlock(
      "NATIVE_SWITCH",
      NativeSwitchBlock
    );
    NativeblocksManager.getInstance().provideBlock(
      "NATIVE_IFRAME",
      NativeIframeBlock
    );
  },
};