import {
  BlockProps,
  useNativeFrameState,
} from "@nativeblocks/nativeblocks-react";
import React, { FC } from "react";
import { generateExtraClass, isEnable } from "../../utility/BlockUtil";
import { getJsonPathValue, getVariableValue } from "../../utility/VariableUtil";
import { handleOnClick } from "../../utility/EventUtil";
import {
  getBackgroundColor,
  getBorderColor,
  getForegroundColor,
  getTinitColor,
} from "../../utility/ColorUtil";
import { mergeClasses, mergeStyles } from "../../utility/StyleUtil";
import { css } from "@emotion/css";
import { getPadding } from "../../utility/SpaceUtil";
import { getBorderRaduis } from "../../utility/BorderRadiusUtil";
import { getBoxShadow, getDropShadow } from "../../utility/ShadowUtil";
import { getDirection } from "../../utility/LayoutUtil";
import { getHeight, getWidth } from "../../utility/SizeUtil";
import {
  getFontFamily,
  getFontSize,
  getFontWeight,
  getLetterSpacing,
  getTextAlign,
} from "../../utility/FontUtil";
import { getLeadingIcon, getTrailingIcon } from "../../utility/IconUtil";

const NativeButtonBlock: FC<BlockProps> = (blockProps: BlockProps) => {
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
  const shapeRadius = getBorderRaduis(blockProps.block);
  const boxShadow = getBoxShadow(blockProps.block);
  const dropShadow = getDropShadow(blockProps.block);
  const direction = getDirection(blockProps.block);
  const foregroundColor = getForegroundColor(blockProps.block);
  const backgroundColor = getBackgroundColor(blockProps.block);
  const tintColor = getTinitColor(blockProps.block);
  const borderColor = getBorderColor(blockProps.block);
  const height = getHeight(blockProps.block);
  const width = getWidth(blockProps.block);
  const extraClass = generateExtraClass(blockProps.block);
  const fontFamily = getFontFamily(blockProps.block);
  const letterSpacing = getLetterSpacing(blockProps.block);
  const fontSize = getFontSize(blockProps.block);
  const textAlign = getTextAlign(blockProps.block);
  const fontWeight = getFontWeight(blockProps.block);
  const leadingIcon = getLeadingIcon(blockProps.block);
  const trailingIcon = getTrailingIcon(blockProps.block);
  const isEnableButton = isEnable(blockProps.block);

  const mergedStyle = mergeStyles([
    padding,
    shapeRadius,
    direction,
    foregroundColor,
    backgroundColor,
    borderColor,
    fontFamily,
    letterSpacing,
    fontSize,
  ]);
  const classes = mergeClasses([
    css(mergedStyle),
    "border",
    dropShadow,
    boxShadow,
    height,
    width,
    extraClass,
    fontWeight,
  ]);
  return (
    <button
      disabled={!isEnableButton}
      className={classes}
      onClick={(e) => {
        handleOnClick(blockProps, magics);
      }}
    >
      <ButtonContent
        tintColor={tintColor}
        leadingIcon={leadingIcon}
        text={result}
        trailingIcon={trailingIcon}
        textAlign={textAlign}
      />
    </button>
  );
};

const ButtonContent: FC<any> = ({
  leadingIcon,
  text,
  trailingIcon,
  tintColor,
  textAlign,
}) => {
  return (
    <div className={`flex flex-row w-auto items-center`}>
      {leadingIcon ? (
        <img src={leadingIcon} className={`h-5 w5 ${css(tintColor)}`} alt="" />
      ) : (
        <></>
      )}
      <p className={`w-full px-2 ${textAlign}`}>{text}</p>
      {trailingIcon ? (
        <img src={trailingIcon} className={`h-5 w5 ${css(tintColor)}`} alt="" />
      ) : (
        <></>
      )}
    </div>
  );
};

export default NativeButtonBlock;
