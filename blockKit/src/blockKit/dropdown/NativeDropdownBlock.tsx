import { css } from "@emotion/css";
import { BlockProps, NONE_INDEX, useNativeFrameState } from "@nativeblocks/nativeblocks-react";
import React, { FC } from "react";
import { generateExtraClass } from "../../utility/BlockUtil";
import { getBorderRaduis } from "../../utility/BorderRadiusUtil";
import { getBackgroundColor, getForegroundColor, getOutlineColor } from "../../utility/ColorUtil";
import { getFontFamily, getFontSize, getFontWeight, getLetterSpacing, getTextAlign } from "../../utility/FontUtil";
import { getDirection } from "../../utility/LayoutUtil";
import { getBoxShadow, getDropShadow } from "../../utility/ShadowUtil";
import { getHeight, getWidth } from "../../utility/SizeUtil";
import { getPadding } from "../../utility/SpaceUtil";
import { mergeClasses, mergeStyles } from "../../utility/StyleUtil";

const NativeDropdownBlock: FC<BlockProps> = (blockProps: BlockProps) => {
  const { state } = useNativeFrameState();

  const visibility = state.variables?.get(blockProps.block?.visibilityKey ?? "");
  if (visibility && (visibility.value ?? "true") === "false") {
    return <></>;
  }

  const blockKey = blockProps.block?.key ?? "";
  const magics = state.magics?.get(blockKey) ?? [];

  const data = blockProps.block?.data ?? new Map();
  const enable = state.variables?.get(data.get("enable")?.value ?? "")?.value === "true";
  const items = state.variables?.get(data.get("items")?.value ?? "")?.value ?? "";
  const placeholder = JSON.parse(state.variables?.get(data.get("placeholder")?.value ?? "")?.value ?? "{}");
  const itemsValue = JSON.parse(items ?? "[]") ?? [];
  const list = placeholder.length > 0 ? [placeholder, ...itemsValue] : itemsValue;

  const select = state.variables?.get(data.get("selectValue")?.value ?? "");
  let selectValue = select?.value ?? "";

  const padding = getPadding(blockProps.block);
  const shapeRadius = getBorderRaduis(blockProps.block);
  const boxShadow = getBoxShadow(blockProps.block);
  const dropShadow = getDropShadow(blockProps.block);
  const direction = getDirection(blockProps.block);
  const foregroundColor = getForegroundColor(blockProps.block);
  const backgroundColor = getBackgroundColor(blockProps.block);
  const outlineColor = getOutlineColor(blockProps.block);
  const height = getHeight(blockProps.block);
  const width = getWidth(blockProps.block);
  const fontFamily = getFontFamily(blockProps.block);
  const letterSpacing = getLetterSpacing(blockProps.block);
  const textAlign = getTextAlign(blockProps.block);
  const fontWeight = getFontWeight(blockProps.block);
  const fontSize = getFontSize(blockProps.block);
  const extraClass = generateExtraClass(blockProps.block);

  const mergedStyle = mergeStyles([
    padding,
    shapeRadius,
    direction,
    foregroundColor,
    backgroundColor,
    outlineColor,
    fontFamily,
    letterSpacing,
    fontSize,
  ]);
  const classes = mergeClasses([
    css(mergedStyle),
    "border-r-8 border-transparent",
    "outline",
    dropShadow,
    boxShadow,
    height,
    width,
    textAlign,
    extraClass,
    fontWeight,
  ]);

  return (
    <select
      id={blockKey}
      disabled={!enable}
      key={blockKey}
      value={selectValue}
      onChange={(event) => {
        selectValue = event.target.value;
        if (select) {
          select.value = selectValue.length > 0 ? selectValue : null;
          blockProps.onVariableChange?.(select);
        }

        if (!magics) return;
        const onChangeEvent = magics.find((magic: any) => magic.event === "onSelect");
        if (onChangeEvent) {
          blockProps.onHandleMagic?.(blockProps.index ?? NONE_INDEX, onChangeEvent, "onSelect");
        }
      }}
      className={classes}
    >
      {list?.map((item: any) => {
        return (
          <option value={item.id} key={item.id ?? Math.random()}>
            {item.text}
          </option>
        );
      }) ?? []}
    </select>
  );
};

export default NativeDropdownBlock;
