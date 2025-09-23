import { NativeblocksManager } from "@nativeblocks/nativeblocks-react";
import NativeNavigationMagic from "./navigation/NativeNavigationMagic";
import NativeRestApi from "./restApi/NativeRestApi";
import NativeChangeVariableMagic from "./variable/NativeChangeVariableMagic";
import NativeJsonParserMagic from "./jsonParser/NativeJsonParserMagic";
import NativeLocalStorageMagic from "./localStorage/NativeLocalStorageMagic";
import NativeFunctionMagic from "./code/NativeFunctionMagic";
import NativeDelayMagic from "./delay/NativeDelayMagic";

export const NativeblocksActionHelper = {
  provideActions() {
    NativeblocksManager.getInstance().provideAction("NATIVE_NAVIGATION", new NativeNavigationMagic());
    NativeblocksManager.getInstance().provideAction("NATIVE_REST_API", new NativeRestApi());
    NativeblocksManager.getInstance().provideAction("NATIVE_CHANGE_VARIABLE", new NativeChangeVariableMagic());
    NativeblocksManager.getInstance().provideAction("NATIVE_JSON_PARSER", new NativeJsonParserMagic());
    NativeblocksManager.getInstance().provideAction("NATIVE_LOCAL_STORAGE_DATA_SOURCE", new NativeLocalStorageMagic());
    NativeblocksManager.getInstance().provideAction("NATIVE_FUNCTION", new NativeFunctionMagic());
    NativeblocksManager.getInstance().provideAction("NATIVE_DELAY", new NativeDelayMagic());
  },
};
