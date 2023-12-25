import {
  BlockProps,
  useNativeFrameState,
} from "@nativeblocks/nativeblocks-react";
import React, { FC } from "react";
import { getJsonPathValue, getVariableValue } from "../../utility/VariableUtil";
import { handleOnClick } from "../../utility/EventUtil";
import { getPadding } from "../../utility/SpaceUtil";
import { getBoxShadow, getDropShadow } from "../../utility/ShadowUtil";
import { getDirection } from "../../utility/LayoutUtil";
import { getHeight, getWidth } from "../../utility/SizeUtil";
import { generateExtraClass, getAlt } from "../../utility/BlockUtil";
import { mergeClasses, mergeStyles } from "../../utility/StyleUtil";
import { css } from "@emotion/css";
import { getObjectType } from "../../utility/IconUtil";

const NativeImageBlock: FC<BlockProps> = (blockProps: BlockProps) => {
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

  const magics = state.magics?.get(blockKey) ?? [];

  const padding = getPadding(blockProps.block);
  const boxShadow = getBoxShadow(blockProps.block);
  const dropShadow = getDropShadow(blockProps.block);
  const direction = getDirection(blockProps.block);
  const height = getHeight(blockProps.block);
  const width = getWidth(blockProps.block);
  const altText = getAlt(blockProps.block);
  const objectType = getObjectType(blockProps.block);
  const extraClass = generateExtraClass(blockProps.block);

  const mergedStyle = mergeStyles([padding, direction]);
  const classes = mergeClasses([
    css(mergedStyle),
    dropShadow,
    boxShadow,
    height,
    width,
    objectType,
    extraClass,
  ]);

  return (
    <img
      id={blockKey}
      className={classes}
      key={blockProps.block?.key}
      onClick={(e) => {
        handleOnClick(blockProps, magics);
      }}
      src={result}
      alt={altText}
    />
  );
};

export default NativeImageBlock;
