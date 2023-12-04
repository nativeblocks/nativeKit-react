import { NativeblocksManager } from "@nativeblocks/nativeblocks-react";
import NativeNavigationMagic from "./navigation/NativeNavigationMagic";
import NativeRestApi from "./restApi/NativeRestApi";
import NativeChangeVariableMagic from "./variable/NativeChangeVariableMagic";
import NativeJsonParserMagic from "./jsonParser/NativeChangeVariableMagic";

export const NativeblocksMagicHelper = {
  provideMagics() {
    NativeblocksManager.getInstance().provideMagic(
      "NATIVE_NAVIGATION",
      new NativeNavigationMagic()
    );
    NativeblocksManager.getInstance().provideMagic(
      "NATIVE_REST_API",
      new NativeRestApi()
    );
    NativeblocksManager.getInstance().provideMagic(
      "NATIVE_CHANGE_VARIABLE",
      new NativeChangeVariableMagic()
    );
    NativeblocksManager.getInstance().provideMagic(
      "NATIVE_JSON_PARSER",
      new NativeJsonParserMagic()
    );
  },
};