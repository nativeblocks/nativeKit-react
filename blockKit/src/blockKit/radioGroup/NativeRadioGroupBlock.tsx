import { css } from "@emotion/css";
import { BlockProps, NONE_INDEX, useNativeFrameState } from "@nativeblocks/nativeblocks-react";
import React, { FC } from "react";
import { generateExtraClass } from "../../utility/BlockUtil";
import { getAccentColor } from "../../utility/ColorUtil";
import { getDirection, getGap, getOrientation } from "../../utility/LayoutUtil";
import { getBoxShadow, getDropShadow } from "../../utility/ShadowUtil";
import { getHeight, getWidth } from "../../utility/SizeUtil";
import { getPadding } from "../../utility/SpaceUtil";
import { mergeClasses, mergeStyles } from "../../utility/StyleUtil";

const NativeRadioGroup: FC<BlockProps> = (blockProps: BlockProps) => {
  const { state } = useNativeFrameState();

  const visibility = state.variables?.get(blockProps.block?.visibilityKey ?? "");
  if (visibility && (visibility.value ?? "true") === "false") {
    return <></>;
  }

  const blockKey = blockProps.block?.key ?? "";
  const magics = state.magics?.get(blockKey) ?? [];

  const data = blockProps.block?.data ?? new Map();
  const items = state.variables?.get(data.get("items")?.value ?? "")?.value ?? "";
  const itemsValue = JSON.parse(items ?? "[]") ?? [];

  const select = state.variables?.get(data.get("selectValue")?.value ?? "");
  let selectValue = select?.value ?? "";

  const padding = getPadding(blockProps.block);
  const boxShadow = getBoxShadow(blockProps.block);
  const dropShadow = getDropShadow(blockProps.block);
  const direction = getDirection(blockProps.block);
  const orientation = getOrientation(blockProps.block);
  const height = getHeight(blockProps.block);
  const width = getWidth(blockProps.block);
  const gap = getGap(blockProps.block);
  const extraClass = generateExtraClass(blockProps.block);
  const foregroundColor = getAccentColor(blockProps.block);

  const mergedStyle = mergeStyles([padding, direction, foregroundColor]);
  const classes = mergeClasses([
    css(mergedStyle),
    "flex",
    orientation,
    gap,
    dropShadow,
    boxShadow,
    height,
    width,
    extraClass,
  ]);

  return (
    <div
      key={blockKey}
      onChange={(event: any) => {
        selectValue = event.target.value;
        if (select) {
          select.value = selectValue;
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
      {itemsValue?.map((option: any) => {
        return (
          <label key={option.id}>
            <input className="h-4 w-4" type="radio" name={`radio-group-${blockKey}`} value={option.id}></input>
            <span className="px-2">{option.text}</span>
          </label>
        );
      }) ?? []}
    </div>
  );
};

export default NativeRadioGroup;
