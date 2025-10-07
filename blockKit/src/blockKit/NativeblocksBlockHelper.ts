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
    NativeblocksManager.getInstance().provideBlock("nativeblocks/container", NativeContainerBlock);
    NativeblocksManager.getInstance().provideBlock("nativeblocks/text", NativeTextBlock);
    NativeblocksManager.getInstance().provideBlock("nativeblocks/button", NativeButtonBlock);
    NativeblocksManager.getInstance().provideBlock("nativeblocks/text_field", NativeTextFieldBlock);
    NativeblocksManager.getInstance().provideBlock("nativeblocks/image", NativeImageBlock);
    // NativeblocksManager.getInstance().provideBlock("nativeblocks/list", NativeListBlock);
    // NativeblocksManager.getInstance().provideBlock("nativeblocks/dropdown", NativeDropdownBlock);
    // NativeblocksManager.getInstance().provideBlock("nativeblocks/checkbox", NativeCheckboxBlock);
    // NativeblocksManager.getInstance().provideBlock("nativeblocks/switch", NativeSwitchBlock);
    // NativeblocksManager.getInstance().provideBlock("nativeblocks/iframe", NativeIframeBlock);
    // NativeblocksManager.getInstance().provideBlock("nativeblocks/table", NativeTableBlock);
    // NativeblocksManager.getInstance().provideBlock("nativeblocks/toggle", NativeToggleBlock);
    // NativeblocksManager.getInstance().provideBlock("nativeblocks/radio_group", NativeRadioGroup);
    // NativeblocksManager.getInstance().provideBlock("nativeblocks/html", NativeHtmlBlock);
    // NativeblocksManager.getInstance().provideBlock("nativeblocks/markdown", NativeMarkdownBlock);
  },
};
