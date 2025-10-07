import { NativeblocksManager } from "@nativeblocks/nativeblocks-react";
import NativeNavigationMagic from "./navigation/NativeNavigationMagic";
import NativeRestApi from "./restApi/NativeRestApi";
import NativeChangeVariableAction from "./variable/NativeChangeVariableAction";
import NativeJsonParserMagic from "./jsonParser/NativeJsonParserMagic";
import NativeLocalStorageMagic from "./localStorage/NativeLocalStorageMagic";
import NativeFunctionAction from "./code/NativeFunctionAction";
import NativeDelayMagic from "./delay/NativeDelayMagic";

export const NativeblocksActionHelper = {
  provideActions() {
    NativeblocksManager.getInstance().provideAction("nativeblocks/change_variable", new NativeChangeVariableAction());
    NativeblocksManager.getInstance().provideAction("nativeblocks/function", new NativeFunctionAction());
    // NativeblocksManager.getInstance().provideAction("nativeblocks/navigation", new NativeNavigationMagic());
    // NativeblocksManager.getInstance().provideAction("nativeblocks/rest_api", new NativeRestApi());
    // NativeblocksManager.getInstance().provideAction("nativeblocks/json_parser", new NativeJsonParserMagic());
    // NativeblocksManager.getInstance().provideAction("nativeblocks/local_storage_data_source", new NativeLocalStorageMagic());
    // NativeblocksManager.getInstance().provideAction("nativeblocks/function", new NativeFunctionMagic());
    // NativeblocksManager.getInstance().provideAction("nativeblocks/delay", new NativeDelayMagic());
  },
};
