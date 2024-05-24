import { NativeblocksBlockHelper } from "@nativeblocks/block-kit-react";
import { NativeblocksMagicHelper } from "@nativeblocks/magic-kit-react";
import {
  INativeLogger,
  NativeblocksLoading,
  NativeblocksManager,
  NativeblocksProvider,
} from "@nativeblocks/nativeblocks-react";
import React, { useState } from "react";

function AppNativeblocks() {
  NativeblocksManager.initialize({
    endpoint: "http://localhost:8585/graphql",
    apiKey:
      "",
    developmentMode: true,
  });

  NativeblocksBlockHelper.provideBlocks();
  NativeblocksMagicHelper.provideMagics();

  NativeblocksManager.getInstance().provideEventLogger("AppLogger", new AppLogger());

  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <NativeblocksProvider
        onLoading={() => {
          setIsLoading(true);
        }}
        onError={(error: string) => {
          console.log("ERROR", error);

          setIsLoading(false);
        }}
        onSuccess={() => {
          setIsLoading(false);
        }}
      />
      {isLoading ? <NativeblocksLoading /> : <></>}
    </>
  );
}

export default AppNativeblocks;

class AppLogger implements INativeLogger {
  log(eventName: string, parameters: Map<string, string>): void {
    console.log(eventName, parameters);
  }
}
