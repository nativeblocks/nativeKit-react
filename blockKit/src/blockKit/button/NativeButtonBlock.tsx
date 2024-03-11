import { css } from "@emotion/css";
import { BlockProps, useNativeFrameState } from "@nativeblocks/nativeblocks-react";
import React, { FC } from "react";
import { generateExtraClass } from "../../utility/BlockUtil";
import { getBorderRaduis } from "../../utility/BorderRadiusUtil";
import { getBackgroundColor, getBorderColor, getForegroundColor, getTinitColor } from "../../utility/ColorUtil";
import { handleOnClick } from "../../utility/EventUtil";
import { getFontFamily, getFontSize, getFontWeight, getLetterSpacing, getTextAlign } from "../../utility/FontUtil";
import { getDirection } from "../../utility/LayoutUtil";
import { getBoxShadow, getDropShadow } from "../../utility/ShadowUtil";
import { getHeight, getWidth } from "../../utility/SizeUtil";
import { getPadding } from "../../utility/SpaceUtil";
import { mergeClasses, mergeStyles } from "../../utility/StyleUtil";

const NativeButtonBlock: FC<BlockProps> = (blockProps: BlockProps) => {
  const { state } = useNativeFrameState();

  const visibility = state.variables?.get(blockProps.block?.visibilityKey ?? "");
  if (visibility && (visibility.value ?? "true") === "false") {
    return <></>;
  }

  const blockKey = blockProps.block?.key ?? "";
  const magics = state.magics?.get(blockKey) ?? [];

  const data = blockProps.block?.data ?? new Map();
  const text = state.variables?.get(data.get("text")?.value ?? "")?.value ?? "";
  const isEnableButton = state.variables?.get(data.get("enable")?.value ?? "")?.value === "true";
  const leadingIcon = state.variables?.get(data.get("leadingIcon")?.value ?? "")?.value ?? "";
  const trailingIcon = state.variables?.get(data.get("trailingIcon")?.value ?? "")?.value ?? "";

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
      id={blockKey}
      disabled={!isEnableButton}
      className={classes}
      onClick={(e) => {
        handleOnClick(blockProps, magics);
      }}
    >
      <ButtonContent
        tintColor={tintColor}
        leadingIcon={leadingIcon}
        text={text}
        trailingIcon={trailingIcon}
        textAlign={textAlign}
      />
    </button>
  );
};

const ButtonContent: FC<any> = ({ leadingIcon, text, trailingIcon, tintColor, textAlign }) => {
  return (
    <div className={`flex flex-row w-auto items-center`}>
      {leadingIcon ? <img src={leadingIcon} className={`h-5 w5 ${css(tintColor)}`} alt="" /> : <></>}
      <p className={`w-full px-2 ${textAlign}`}>{text}</p>
      {trailingIcon ? <img src={trailingIcon} className={`h-5 w5 ${css(tintColor)}`} alt="" /> : <></>}
    </div>
  );
};

export default NativeButtonBlock;
