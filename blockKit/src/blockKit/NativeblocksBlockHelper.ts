import { NativeblocksManager } from "@nativeblocks/nativeblocks-react";
import NativeButtonBlock from "./button/NativeButtonBlock";
import NativeCheckboxBlock from "./checkbox/NativeCheckboxBlock";
import NativeContainerBlock from "./container/NativeContainerBlock";
import NativeDropdownBlock from "./dropdown/NativeDropdownBlock";
import NativeHtmlBlock from "./html/NativeHtmlBlock";
import NativeIframeBlock from "./iframe/NativeIframeBlock";
import NativeImageBlock from "./image/NativeImageBlock";
import NativeListBlock from "./list/NativeListBlock";
import NativeMarkdownBlock from "./markdown/NativeMarkdownBlock";
import NativeRadioGroup from "./radioGroup/NativeRadioGroupBlock";
import NativeSwitchBlock from "./switch/NativeSwitchBlock";
import NativeTableBlock from "./table/NativeTableBlock";
import NativeTextBlock from "./text/NativeTextBlock";
import NativeTextFieldBlock from "./textField/NativeTextFieldBlock";
import NativeToggleBlock from "./toggle/NativeToggleBlock";

export const NativeblocksBlockHelper = {
  provideBlocks() {
    NativeblocksManager.getInstance().provideBlock("NATIVE_CONTAINER", NativeContainerBlock);
    NativeblocksManager.getInstance().provideBlock("NATIVE_LIST", NativeListBlock);
    NativeblocksManager.getInstance().provideBlock("NATIVE_TEXT", NativeTextBlock);
    NativeblocksManager.getInstance().provideBlock("NATIVE_BUTTON", NativeButtonBlock);
    NativeblocksManager.getInstance().provideBlock("NATIVE_TEXT_FIELD", NativeTextFieldBlock);
    NativeblocksManager.getInstance().provideBlock("NATIVE_IMAGE", NativeImageBlock);
    NativeblocksManager.getInstance().provideBlock("NATIVE_DROPDOWN", NativeDropdownBlock);
    NativeblocksManager.getInstance().provideBlock("NATIVE_CHECKBOX", NativeCheckboxBlock);
    NativeblocksManager.getInstance().provideBlock("NATIVE_SWITCH", NativeSwitchBlock);
    NativeblocksManager.getInstance().provideBlock("NATIVE_IFRAME", NativeIframeBlock);
    NativeblocksManager.getInstance().provideBlock("NATIVE_TABLE", NativeTableBlock);
    NativeblocksManager.getInstance().provideBlock("NATIVE_TOGGLE", NativeToggleBlock);
    NativeblocksManager.getInstance().provideBlock("NATIVE_RADIO_GROUP", NativeRadioGroup);
    NativeblocksManager.getInstance().provideBlock("NATIVE_HTML", NativeHtmlBlock);
    NativeblocksManager.getInstance().provideBlock("NATIVE_MARKDOWN", NativeMarkdownBlock);
  },
};
