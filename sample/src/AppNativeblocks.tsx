import { NativeblocksBlockHelper } from "@nativeblocks/block-kit-react";
import { NativeblocksActionHelper } from "@nativeblocks/action-kit-react";
import {
  INativeLogger,
  NativeblocksError,
  NativeblocksFrame,
  NativeblocksLoading,
  NativeblocksManager,
} from "@nativeblocks/nativeblocks-react";
import React, { useState } from "react";

function AppNativeblocks() {
  NativeblocksManager.initialize({
    edition: {
      type: "CLOUD",
      endpoint: "http://localhost:8585/graphql",
      apiKey:
        "",
      developmentMode: true,
    },
  });

  NativeblocksBlockHelper.provideBlocks(NativeblocksManager.getInstance());
  NativeblocksActionHelper.provideActions();

  NativeblocksManager.getInstance().provideEventLogger("AppLogger", new AppLogger());

  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <NativeblocksFrame frameRoute="/home" Loading={NativeblocksLoading} Error={NativeblocksError} />
    </>
  );
}

export default AppNativeblocks;

class AppLogger implements INativeLogger {
  log(eventName: string, parameters: Map<string, string>): void {
    console.log(eventName, parameters);
  }
}
