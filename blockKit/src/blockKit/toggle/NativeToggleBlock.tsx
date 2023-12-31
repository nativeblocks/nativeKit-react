import {
  BlockProps,
  NONE_INDEX,
  useNativeFrameState,
} from "@nativeblocks/nativeblocks-react";
import React, { FC } from "react";
import { getJsonPathValue, getVariableValue } from "../../utility/VariableUtil";
import { getPadding } from "../../utility/SpaceUtil";
import { getBoxShadow, getDropShadow } from "../../utility/ShadowUtil";
import { getDirection } from "../../utility/LayoutUtil";
import { getHeight, getWidth } from "../../utility/SizeUtil";
import {
  generateExtraClass,
  getToggleOffIcon,
  getToggleOnIcon,
  isEnable,
} from "../../utility/BlockUtil";
import { mergeClasses, mergeStyles } from "../../utility/StyleUtil";
import { css } from "@emotion/css";
import { getTinitColor } from "../../utility/ColorUtil";

const NativeToggleBlock: FC<BlockProps> = (blockProps: BlockProps) => {
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
  const extraClass = generateExtraClass(blockProps.block);
  const onIcon = getToggleOnIcon(blockProps.block);
  const offIcon = getToggleOffIcon(blockProps.block);
  const tintColor = getTinitColor(blockProps.block);
  const enable = isEnable(blockProps.block);

  const mergedStyle = mergeStyles([padding, direction]);
  const classes = mergeClasses([
    css(mergedStyle),
    dropShadow,
    boxShadow,
    height,
    width,
    extraClass,
  ]);

  return (
    <label key={blockKey}>
      <input
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
        {result ? (
          <img className={css(tintColor)} key={Math.random()} src={onIcon} />
        ) : (
          <img className={css(tintColor)} key={Math.random()} src={offIcon} />
        )}
      </span>
    </label>
  );
};

export default NativeToggleBlock;
