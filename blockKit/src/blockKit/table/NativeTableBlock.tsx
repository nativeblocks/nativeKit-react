import {
  BlockProps,
  useNativeFrameState,
} from "@nativeblocks/nativeblocks-react";
import React, { FC } from "react";
import { getJsonPathValue, getVariableValue } from "../../utility/VariableUtil";
import { getBoxShadow, getDropShadow } from "../../utility/ShadowUtil";
import { getDirection } from "../../utility/LayoutUtil";
import { getHeight, getWidth } from "../../utility/SizeUtil";
import {
  getTableBodyBackgroundColor,
  getTableBodyForegroundColor,
  getTableHeaderBackgroundColor,
  getTableHeaderForegroundColor,
} from "../../utility/ColorUtil";
import {
  getTableBodyPadding,
  getTableHeaderPadding,
} from "../../utility/SpaceUtil";
import {
  generateTableBodyExtraClass,
  generateTableHeaderExtraClass,
  getTableHeaderItems,
  getTableSelectedItemCell,
} from "../../utility/BlockUtil";
import {
  getTableBodyFontFamily,
  getTableBodyFontSize,
  getTableBodyFontWeight,
  getTableBodyLetterSpacing,
  getTableBodyTextAlign,
  getTableBodyTextDecoration,
  getTableHeaderFontFamily,
  getTableHeaderFontSize,
  getTableHeaderFontWeight,
  getTableHeaderLetterSpacing,
  getTableHeaderTextAlign,
  getTableHeaderTextDecoration,
} from "../../utility/FontUtil";
import { mergeClasses, mergeStyles } from "../../utility/StyleUtil";
import { css } from "@emotion/css";
import {
  getBorderRaduis,
  getTableBorder,
} from "../../utility/BorderRadiusUtil";
import { handleTableItemCellClick } from "../../utility/EventUtil";

const NativeTableBlock: FC<BlockProps> = (blockProps: BlockProps) => {
  const { state } = useNativeFrameState();

  const blockKey = blockProps.block?.key ?? "";
  const visibility = state.variables?.get(
    blockProps.block?.visibilityKey ?? ""
  );
  if (visibility && (visibility.value ?? "true") === "false") {
    return <></>;
  }

  const magics = state.magics?.get(blockKey) ?? [];
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

  const boxShadow = getBoxShadow(blockProps.block);
  const dropShadow = getDropShadow(blockProps.block);
  const direction = getDirection(blockProps.block);

  const height = getHeight(blockProps.block);
  const width = getWidth(blockProps.block);
  const shapeRadius = getBorderRaduis(blockProps.block);
  const tableBorder = getTableBorder(blockProps.block);

  const hforegroundColor = getTableHeaderForegroundColor(blockProps.block);
  const hbackgroundColor = getTableHeaderBackgroundColor(blockProps.block);
  const headerPadding = getTableHeaderPadding(blockProps.block);
  const headerExtraClass = generateTableHeaderExtraClass(blockProps.block);

  const headerFontFamily = getTableHeaderFontFamily(blockProps.block);
  const headerLetterSpacing = getTableHeaderLetterSpacing(blockProps.block);
  const headerFontSize = getTableHeaderFontSize(blockProps.block);
  const headerTextAlign = getTableHeaderTextAlign(blockProps.block);
  const headerFontWeight = getTableHeaderFontWeight(blockProps.block);
  const headerTextDecoration = getTableHeaderTextDecoration(blockProps.block);

  const bforegroundColor = getTableBodyForegroundColor(blockProps.block);
  const bbackgroundColor = getTableBodyBackgroundColor(blockProps.block);
  const bodyPadding = getTableBodyPadding(blockProps.block);
  const bodyExtraClass = generateTableBodyExtraClass(blockProps.block);

  const bodyFontFamily = getTableBodyFontFamily(blockProps.block);
  const bodyLetterSpacing = getTableBodyLetterSpacing(blockProps.block);
  const bodyFontSize = getTableBodyFontSize(blockProps.block);
  const bodyTextAlign = getTableBodyTextAlign(blockProps.block);
  const bodyFontWeight = getTableBodyFontWeight(blockProps.block);
  const bodyTextDecoration = getTableBodyTextDecoration(blockProps.block);

  const headerMergedStyle = mergeStyles([
    headerPadding,
    direction,
    hforegroundColor,
    hbackgroundColor,
    // borderColor,
    headerFontFamily,
    headerLetterSpacing,
    headerFontSize,
  ]);

  const bodyMergedStyle = mergeStyles([
    bodyPadding,
    direction,
    bforegroundColor,
    bbackgroundColor,
    // borderColor,
    bodyFontFamily,
    bodyLetterSpacing,
    bodyFontSize,
  ]);

  const mergedStyle = mergeStyles([shapeRadius]);

  const classes = mergeClasses([
    "overflow-hidden",
    tableBorder,
    css(mergedStyle),
    dropShadow,
    boxShadow,
    height,
    width,
  ]);

  const headerClasses = mergeClasses([
    css(headerMergedStyle),
    headerExtraClass,
    headerFontWeight,
    headerTextAlign,
    headerTextDecoration,
  ]);

  const bodyClasses = mergeClasses([
    css(bodyMergedStyle),
    bodyExtraClass,
    bodyFontWeight,
    bodyTextAlign,
    bodyTextDecoration,
  ]);

  const headersVariable = state.variables?.get(
    getTableHeaderItems(blockProps.block)
  );
  const headers = JSON.parse(headersVariable?.value ?? "[]") ?? [];

  const itemsVariable = state.variables?.get(blockKey);
  const items = JSON.parse(itemsVariable?.value ?? "[]") ?? [];

  const selectedItemCell = state.variables?.get(
    getTableSelectedItemCell(blockProps.block)
  );

  return (
    <>
      <table key={blockKey} className={classes}>
        <thead>
          <tr>
            {headers ? (
              headers?.map((item: any) => {
                return (
                  <th key={item.id} scope="col" className={headerClasses}>
                    {item.text}
                  </th>
                );
              })
            ) : (
              <></>
            )}
          </tr>
        </thead>
        <tbody>
          {items
            ? items?.map((row: any, index: number) => {
                if (!row) {
                  return <></>;
                } else {
                  return (
                    <tr key={row + index}>
                      {row?.map((cell: any) => {
                        return (
                          <td
                            key={cell.id}
                            className={bodyClasses}
                            onClick={(e) => {
                              if (selectedItemCell) {
                                blockProps.onVariableChange?.({
                                  key: selectedItemCell.key,
                                  value: JSON.stringify(cell),
                                  type: "STRING",
                                });
                              }
                              handleTableItemCellClick(blockProps, magics);
                            }}
                          >
                            {cell.text}
                          </td>
                        );
                      })}
                    </tr>
                  );
                }
              })
            : []}
        </tbody>
      </table>
    </>
  );
};

export default NativeTableBlock;
