import {
  BlockProps,
  NONE_INDEX,
  useNativeFrameState,
} from "@nativeblocks/nativeblocks-react";
import React, { FC } from "react";
import { getJsonPathValue, getVariableValue } from "../../utility/VariableUtil";
import {
  getBackgroundColor,
  getForegroundAsBackgroundColor,
} from "../../utility/ColorUtil";
import { getBoxShadow, getDropShadow } from "../../utility/ShadowUtil";
import { getDirection } from "../../utility/LayoutUtil";
import { generateExtraClass, isEnable } from "../../utility/BlockUtil";
import { mergeClasses, mergeStyles } from "../../utility/StyleUtil";
import { css } from "@emotion/css";

const NativeSwitchBlock: FC<BlockProps> = (blockProps: BlockProps) => {
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

  const boxShadow = getBoxShadow(blockProps.block);
  const dropShadow = getDropShadow(blockProps.block);
  const direction = getDirection(blockProps.block);
  const foregroundColor = getForegroundAsBackgroundColor(
    blockProps.block,
    null,
    result ? "100" : "60"
  );
  const backgroundColor = getBackgroundColor(
    blockProps.block,
    null,
    result ? "100" : "60"
  );
  const enable = isEnable(blockProps.block);
  const extraClass = generateExtraClass(blockProps.block);

  const mergedStyle = mergeStyles([direction, backgroundColor]);
  const classes = mergeClasses([
    css(mergedStyle),
    "slider",
    "flex",
    "h-7",
    "w-14",
    "items-center",
    "rounded-full",
    "duration-200",
    `${result ? "p-0" : "p-1"}`,
    dropShadow,
    boxShadow,
    extraClass,
  ]);

  return (
    <>
      <label className="relative inline-flex cursor-pointer select-none items-center rounded-full">
        <input
          // disabled={!enable}
          className={"hidden"}
          defaultChecked={result}
          type="checkbox"
          key={blockKey}
          onChange={(event) => {
            result = event.target.checked;
            if (variable) {
              variable.value = result;
              blockProps.onVariableChange?.(variable);
            }

            if (!magics) return;
            const onChangeEvent = magics.find(
              (magic: any) => magic.event === "onCheckChange"
            );
            if (onChangeEvent) {
              blockProps.onHandleMagic?.(
                blockProps.index ?? NONE_INDEX,
                onChangeEvent,
                "onCheckChange"
              );
            }
          }}
        />
        <span className={classes}>
          <span
            className={`h-5 w-5 ${css(
              foregroundColor
            )} rounded-full duration-200 ${result ? "translate-x-8" : ""}`}
          ></span>
        </span>
      </label>
    </>
  );
};

export default NativeSwitchBlock;
