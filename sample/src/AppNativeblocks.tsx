import React from "react";
import {
  INativeLogger,
  NativeblocksManager,
  NativeblocksProvider,
} from "@nativeblocks/nativeblocks-react";
import { NativeblocksBlockHelper } from "@nativeblocks/block-kit-react";
import { NativeblocksMagicHelper } from "@nativeblocks/magic-kit-react";

function AppNativeblocks() {
  NativeblocksManager.initialize({
    endpoint: "http://localhost:8585/graphql",
    apiKey:
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0YTNmN2E2Yi1hYjg5LTQwOGItOTNmNC01ZmVhM2NhYWJiNmUiLCJvcmciOiJhYmIxYWU5Yy02NzZjLTRhOWMtOTY3OC1jZTRkYTllYjI4OGQiLCJpYXQiOjE3MDM1MjI4OTAsImV4cCI6MTczNTA1ODg5MH0.TN7b0q_d2meha54e9-7R_OzxclE1HEQu5E-s5d8JdGQ",
    developmentMode: true,
  });

  NativeblocksBlockHelper.provideBlocks();
  NativeblocksMagicHelper.provideMagics();
  NativeblocksManager.getInstance().provideEventLogger(
    "AppLogger",
    new AppLogger()
  );

  return (
    <>
      <NativeblocksProvider frameRoute={null} />
    </>
  );
}

export default AppNativeblocks;

class AppLogger implements INativeLogger {
  log(eventName: string, parameters: Map<string, string>): void {
    console.log(eventName, parameters);
  }
}
