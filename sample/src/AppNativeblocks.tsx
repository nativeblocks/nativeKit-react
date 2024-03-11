import React, { useState } from "react";
import {
  INativeLogger,
  NativeblocksLoading,
  NativeblocksManager,
  NativeblocksProvider,
} from "@nativeblocks/nativeblocks-react";
import { NativeblocksBlockHelper } from "@nativeblocks/block-kit-react";
import { NativeblocksMagicHelper } from "@nativeblocks/magic-kit-react";

function AppNativeblocks() {
  NativeblocksManager.initialize({
    endpoint: "http://localhost:8585/graphql",
    apiKey:
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI5OTU4YjIyNC04MmJiLTRmMGUtOWU1MS0wNjE4Mjg3MGE3NjIiLCJvcmciOiJhYmIxYWU5Yy02NzZjLTRhOWMtOTY3OC1jZTRkYTllYjI4OGQiLCJpYXQiOjE3MDA0MDQ4NDIsImV4cCI6MTczMTk0MDg0Mn0.t4aW58C_R4xUg_2FqDfQlpX8V4KkCQh0ZR1EIvovmbs",
    developmentMode: true,
  });

  NativeblocksBlockHelper.provideBlocks();
  NativeblocksMagicHelper.provideMagics();
  NativeblocksManager.getInstance().provideEventLogger(
    "AppLogger",
    new AppLogger()
  );
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
