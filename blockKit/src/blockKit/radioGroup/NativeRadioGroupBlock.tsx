import {
  BlockProps,
  NONE_INDEX,
  useNativeFrameState,
} from "@nativeblocks/nativeblocks-react";
import React, { FC } from "react";
import { getJsonPathValue, getVariableValue } from "../../utility/VariableUtil";
import { getPadding } from "../../utility/SpaceUtil";
import { getBoxShadow, getDropShadow } from "../../utility/ShadowUtil";
import { getDirection, getGap } from "../../utility/LayoutUtil";
import { getAccentColor } from "../../utility/ColorUtil";
import { getHeight, getWidth } from "../../utility/SizeUtil";
import { generateExtraClass, getRadioOptions } from "../../utility/BlockUtil";
import { mergeClasses, mergeStyles } from "../../utility/StyleUtil";
import { css } from "@emotion/css";

const NativeRadioGroup: FC<BlockProps> = (blockProps: BlockProps) => {
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
    result = variable?.value ?? false;
  }

  const magics = state?.magics?.get(blockKey) ?? [];

  const padding = getPadding(blockProps.block);
  const boxShadow = getBoxShadow(blockProps.block);
  const dropShadow = getDropShadow(blockProps.block);
  const direction = getDirection(blockProps.block);
  const height = getHeight(blockProps.block);
  const width = getWidth(blockProps.block);
  const gap = getGap(blockProps.block);
  const extraClass = generateExtraClass(blockProps.block);
  const foregroundColor = getAccentColor(blockProps.block);

  const optionsKey = getRadioOptions(blockProps.block);
  const optionsVariable = state.variables?.get(optionsKey);
  const options = JSON.parse(optionsVariable?.value ?? "[]") ?? [];

  const mergedStyle = mergeStyles([padding, direction, foregroundColor]);
  const classes = mergeClasses([
    css(mergedStyle),
    "flex",
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
        result = event.target.value;
        if (variable) {
          variable.value = result;
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
      {options.map((option: any) => {
        return (
          <label key={option.id}>
            <input
              className="h-4 w-4"
              type="radio"
              name={`radio-group-${blockKey}`}
              value={option.id}
            ></input>
            <span className="px-2">{option.text}</span>
          </label>
        );
      })}
    </div>
  );
};

export default NativeRadioGroup;
