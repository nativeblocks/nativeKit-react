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
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmNzc4ZTQ2OS1hZGMzLTRjMjItYjFlNy03NzE2MDlhNDllN2MiLCJvcmciOiJmM2Y4MmM5ZS0xZmFhLTRlZmEtOTA2NS1jN2RkYTdkZmJlNDYiLCJpYXQiOjE3MDk2MzgxMjgsImV4cCI6MTc0MTE3NDEyOH0.bm3Y1hSfd8L3JYWUdBjdUYiMgEgPDW2mIm-J2_6p934",
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
