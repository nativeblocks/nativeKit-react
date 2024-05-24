import { BlockProps, MagicModel, NONE_INDEX } from "@nativeblocks/nativeblocks-react";

export function handleOnClick(blockProps: BlockProps, magics: MagicModel[]) {
  if (!magics) return;
  const onClickEvent = magics.find((magic: any) => magic.event === "onClick");

  if (onClickEvent) {
    blockProps.onHandleMagic?.(blockProps.index ?? NONE_INDEX, onClickEvent, "onClick");
  }
}

export function handleTableItemCellClick(blockProps: BlockProps, magics: MagicModel[]) {
  if (!magics) return;
  const onClickEvent = magics.find((magic: any) => magic.event === "onItemCellClick");

  if (onClickEvent) {
    blockProps.onHandleMagic?.(blockProps.index ?? NONE_INDEX, onClickEvent, "onItemCellClick");
  }
}

export function onTextChange(blockProps: BlockProps, magics: MagicModel[]) {
  if (!magics) return;
  const onChangeEvent = magics.find((magic: any) => magic.event === "onTextChange");
  if (onChangeEvent) {
    blockProps.onHandleMagic?.(blockProps.index ?? NONE_INDEX, onChangeEvent, "onTextChange");
  }
}
