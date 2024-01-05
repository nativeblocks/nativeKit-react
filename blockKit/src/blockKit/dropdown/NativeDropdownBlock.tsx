import {
  BlockProps,
  NONE_INDEX,
  NativeBlockModel,
  useNativeFrameState,
} from "@nativeblocks/nativeblocks-react";
import React, { FC } from "react";
import { getJsonPathValue, getVariableValue } from "../../utility/VariableUtil";
import {
  generateExtraClass,
  getDropdownItems,
  getPlaceholder,
  getProperty,
  isEnable,
} from "../../utility/BlockUtil";
import { getPadding } from "../../utility/SpaceUtil";
import { getBorderRaduis } from "../../utility/BorderRadiusUtil";
import { getBoxShadow, getDropShadow } from "../../utility/ShadowUtil";
import { getDirection } from "../../utility/LayoutUtil";
import {
  getBackgroundColor,
  getForegroundColor,
  getOutlineColor,
} from "../../utility/ColorUtil";
import { getHeight, getWidth } from "../../utility/SizeUtil";
import {
  getFontFamily,
  getFontSize,
  getFontWeight,
  getLetterSpacing,
  getTextAlign,
} from "../../utility/FontUtil";
import { mergeClasses, mergeStyles } from "../../utility/StyleUtil";
import { css } from "@emotion/css";

const NativeDropdownBlock: FC<BlockProps> = (blockProps: BlockProps) => {
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
  let currentValue = result;

  const magics = state.magics?.get(blockKey) ?? [];

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
  const placeholder = getPlaceholder(blockProps.block);
  const enable = isEnable(blockProps.block);
  const extraClass = generateExtraClass(blockProps.block);

  const itemsKey = getDropdownItems(blockProps.block);
  const itemsVariable = state.variables?.get(itemsKey);
  const items = JSON.parse(itemsVariable?.value ?? "[]") ?? [];

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
      value={currentValue}
      onChange={(event) => {
        currentValue = event.target.value;
        if (variable) {
          variable.value = currentValue;
          blockProps.onVariableChange?.(variable);
        }

        if (!magics) return;
        const onChangeEvent = magics.find(
          (magic: any) => magic.event === "onSelect"
        );
        if (onChangeEvent) {
          blockProps.onHandleMagic?.(
            blockProps.index ?? NONE_INDEX,
            onChangeEvent,
            "onSelect"
          );
        }
      }}
      className={classes}
    >
      {items?.map((item: any) => {
        return (
          <option value={item.id} key={item.id}>
            {item.text}
          </option>
        );
      })}
    </select>
  );
};

function getItemsVariable(block: NativeBlockModel | null) {
  const itemsKey = getProperty(block, "itemsVariable");
  if (itemsKey.valueMobile) return itemsKey.valueMobile;
  if (itemsKey.valueTablet) return itemsKey.valueTablet;
  if (itemsKey.valueDesktop) return itemsKey.valueDesktop;
}

export default NativeDropdownBlock;
