import { css } from "@emotion/css";
import { BlockProps, NONE_INDEX, useNativeFrameState } from "@nativeblocks/nativeblocks-react";
import React, { FC } from "react";
import { generateExtraClass } from "../../utility/BlockUtil";
import { getTinitColor } from "../../utility/ColorUtil";
import { getDirection } from "../../utility/LayoutUtil";
import { getBoxShadow, getDropShadow } from "../../utility/ShadowUtil";
import { getHeight, getWidth } from "../../utility/SizeUtil";
import { getPadding } from "../../utility/SpaceUtil";
import { mergeClasses, mergeStyles } from "../../utility/StyleUtil";

const NativeToggleBlock: FC<BlockProps> = (blockProps: BlockProps) => {
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

  const onIcon = state.variables?.get(data.get("onIcon")?.value ?? "")?.value ?? "";
  const offIcon = state.variables?.get(data.get("offIcon")?.value ?? "")?.value ?? "";

  const padding = getPadding(blockProps.block);
  const boxShadow = getBoxShadow(blockProps.block);
  const dropShadow = getDropShadow(blockProps.block);
  const direction = getDirection(blockProps.block);
  const height = getHeight(blockProps.block);
  const width = getWidth(blockProps.block);
  const extraClass = generateExtraClass(blockProps.block);
  const tintColor = getTinitColor(blockProps.block);

  const mergedStyle = mergeStyles([padding, direction]);
  const classes = mergeClasses([css(mergedStyle), dropShadow, boxShadow, height, width, extraClass]);

  return (
    <label key={blockKey}>
      <input
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
        {checkValue ? (
          <img className={css(tintColor)} key={Math.random()} src={onIcon} />
        ) : (
          <img className={css(tintColor)} key={Math.random()} src={offIcon} />
        )}
      </span>
    </label>
  );
};

export default NativeToggleBlock;
