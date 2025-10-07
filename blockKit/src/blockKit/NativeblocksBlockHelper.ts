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
  provideBlocks( manager: NativeblocksManager) {
    manager.provideBlock("nativeblocks/container", NativeContainerBlock);
    manager.provideBlock("nativeblocks/text", NativeTextBlock);
    manager.provideBlock("nativeblocks/button", NativeButtonBlock);
    manager.provideBlock("nativeblocks/text_field", NativeTextFieldBlock);
    manager.provideBlock("nativeblocks/image", NativeImageBlock);
    // manager.provideBlock("nativeblocks/list", NativeListBlock);
    // manager.provideBlock("nativeblocks/dropdown", NativeDropdownBlock);
    // manager.provideBlock("nativeblocks/checkbox", NativeCheckboxBlock);
    // manager.provideBlock("nativeblocks/switch", NativeSwitchBlock);
    // manager.provideBlock("nativeblocks/iframe", NativeIframeBlock);
    // manager.provideBlock("nativeblocks/table", NativeTableBlock);
    // manager.provideBlock("nativeblocks/toggle", NativeToggleBlock);
    // manager.provideBlock("nativeblocks/radio_group", NativeRadioGroup);
    // manager.provideBlock("nativeblocks/html", NativeHtmlBlock);
    // manager.provideBlock("nativeblocks/markdown", NativeMarkdownBlock);
  },
};
