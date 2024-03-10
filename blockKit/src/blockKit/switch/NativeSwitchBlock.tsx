import { css } from "@emotion/css";
import { BlockProps, NONE_INDEX, useNativeFrameState } from "@nativeblocks/nativeblocks-react";
import React, { FC } from "react";
import { generateExtraClass } from "../../utility/BlockUtil";
import { getBackgroundColor, getForegroundAsBackgroundColor } from "../../utility/ColorUtil";
import { getDirection } from "../../utility/LayoutUtil";
import { getBoxShadow, getDropShadow } from "../../utility/ShadowUtil";
import { mergeClasses, mergeStyles } from "../../utility/StyleUtil";

const NativeSwitchBlock: FC<BlockProps> = (blockProps: BlockProps) => {
  const { state } = useNativeFrameState();

  const visibility = state.variables?.get(blockProps.block?.visibilityKey ?? "");
  if (visibility && (visibility.value ?? "true") === "false") {
    return <></>;
  }

  const blockKey = blockProps.block?.key ?? "";
  const magics = state.magics?.get(blockKey) ?? [];

  const data = blockProps.block?.data ?? new Map();
  const check = state.variables?.get(data.get("checkValue")?.value ?? "");
  let checkValue = check?.value === "true";
  const enable = state.variables?.get(data.get("enable")?.value ?? "")?.value === "true";

  const boxShadow = getBoxShadow(blockProps.block);
  const dropShadow = getDropShadow(blockProps.block);
  const direction = getDirection(blockProps.block);
  const foregroundColor = getForegroundAsBackgroundColor(blockProps.block, null, checkValue ? "100" : "60");
  const backgroundColor = getBackgroundColor(blockProps.block, null, checkValue ? "100" : "60");
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
    `${checkValue ? "p-0" : "p-1"}`,
    dropShadow,
    boxShadow,
    extraClass,
  ]);

  return (
    <>
      <label id={blockKey} className="relative inline-flex cursor-pointer select-none items-center rounded-full">
        <input
          // disabled={!enable}
          className={"hidden"}
          defaultChecked={checkValue}
          type="checkbox"
          key={blockKey}
          onChange={(event) => {
            checkValue = event.target.checked;
            if (check) {
              check.value = `${checkValue}`;
              blockProps.onVariableChange?.(check);
            }

            if (!magics) return;
            const onChangeEvent = magics.find((magic: any) => magic.event === "onCheckChange");
            if (onChangeEvent) {
              blockProps.onHandleMagic?.(blockProps.index ?? NONE_INDEX, onChangeEvent, "onCheckChange");
            }
          }}
        />
        <span className={classes}>
          <span
            className={`h-5 w-5 ${css(foregroundColor)} rounded-full duration-200 ${checkValue ? "translate-x-8" : ""}`}
          ></span>
        </span>
      </label>
    </>
  );
};

export default NativeSwitchBlock;
