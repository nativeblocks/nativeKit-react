import React from "react";
import {
  NativeblocksManager,
  NativeblocksProvider,
} from "@nativeblocks/nativeblocks-react";

import { NativeblocksBlockHelper } from "@nativeblocks/block-kit-react"

function AppNativeblocks() {
  NativeblocksManager.initialize({
    endpoint: "http://localhost:8585/graphql",
    apiKey:
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI5OTU4YjIyNC04MmJiLTRmMGUtOWU1MS0wNjE4Mjg3MGE3NjIiLCJvcmciOiJhYmIxYWU5Yy02NzZjLTRhOWMtOTY3OC1jZTRkYTllYjI4OGQiLCJpYXQiOjE3MDA0MDQ4NDIsImV4cCI6MTczMTk0MDg0Mn0.t4aW58C_R4xUg_2FqDfQlpX8V4KkCQh0ZR1EIvovmbs",
    developmentMode: true,
  });

  NativeblocksBlockHelper.provideBlocks()

  return (
    <>
      <NativeblocksProvider frameRoute={null} />
    </>
  );
}

export default AppNativeblocks;
