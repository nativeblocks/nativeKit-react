import {
  BlockProps,
  NativeBlockModel,
  useNativeFrameState,
} from "@nativeblocks/nativeblocks-react";
import React, { FC } from "react";
import { getJsonPathValue, getVariableValue } from "../../utility/VariableUtil";
import { getPadding } from "../../utility/SpaceUtil";
import { getBoxShadow, getDropShadow } from "../../utility/ShadowUtil";
import { getBorderRaduis } from "../../utility/BorderRadiusUtil";
import { getDirection } from "../../utility/LayoutUtil";
import {
  convertTailwindToPixels,
  getHeight,
  getWidth,
} from "../../utility/SizeUtil";
import { generateExtraClass, getProperty } from "../../utility/BlockUtil";
import { mergeClasses, mergeStyles } from "../../utility/StyleUtil";
import { css } from "@emotion/css";

const NativeIframeBlock: FC<BlockProps> = (blockProps: BlockProps) => {
  const { state } = useNativeFrameState();

  const blockKey = blockProps.block?.key ?? "";
  const visibility = state.variables?.get(
    blockProps.block?.visibilityKey ?? ""
  );
  if (visibility && (visibility.value ?? "true") === "false") {
    return <></>;
  }

  const variable = state.variables?.get(blockKey);
  let result = {} as any;
  if (blockProps.block?.jsonPath) {
    const query = getVariableValue(
      blockProps.block?.jsonPath,
      "index",
      blockProps.index.toString()
    );
    result = getJsonPathValue(variable?.value ?? "", query);
  } else {
    result = variable?.value ?? "";
  }

  const padding = getPadding(blockProps.block);
  const boxShadow = getBoxShadow(blockProps.block);
  const dropShadow = getDropShadow(blockProps.block);
  const shapeRadius = getBorderRaduis(blockProps.block);
  const direction = getDirection(blockProps.block);
  const height = getHeight(blockProps.block);
  const width = getWidth(blockProps.block);
  const title = getIframeTitle(blockProps.block);
  const extraClass = generateExtraClass(blockProps.block);

  const mergedStyle = mergeStyles([padding, shapeRadius, direction]);
  const classes = mergeClasses([
    css(mergedStyle),
    dropShadow,
    boxShadow,
    height,
    width,
    extraClass,
  ]);

  return (
    <iframe
      id={blockKey}
      className={classes}
      key={blockKey}
      src={result ?? ""}
      title={title}
    ></iframe>
  );
};

function getIframeTitle(block: NativeBlockModel | null) {
  const inputTypeProperty = getProperty(block, "title");
  if (inputTypeProperty.valueMobile) return inputTypeProperty.valueMobile;
  if (inputTypeProperty.valueTablet) return inputTypeProperty.valueTablet;
  if (inputTypeProperty.valueDesktop) return inputTypeProperty.valueDesktop;
}

export default NativeIframeBlock;
