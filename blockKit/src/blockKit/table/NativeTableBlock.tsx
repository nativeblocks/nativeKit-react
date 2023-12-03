// import {
//   BlockProps,
//   useNativeFrameState,
// } from "@nativeblocks/nativeblocks-react";
// import React, { FC } from "react";
// import {
//   directionMapper,
//   spacingMapper,
//   toArgb,
// } from "../../utility/BlockUtil";
// import { getJsonPathValue, getVariableValue } from "../../utility/VariableUtil";

// const headers = [
//   {
//     id: "h1",
//     text: "Head 1",
//   },
//   {
//     id: "h2",
//     text: "Head 2",
//   },
//   {
//     id: "h3",
//     text: "Head 3",
//   },
//   {
//     id: "h4",
//     text: "Head 4",
//   },
//   {
//     id: "h5",
//     text: "Head 5",
//   },
// ];

// const items = [
//   [
//     {
//       id: "row1",
//       text: "row1-item 1",
//     },
//     {
//       id: "row1",
//       text: "row1-item 2",
//     },
//     {
//       id: "row1",
//       text: "row1-item 3",
//     },
//     {
//       id: "row1",
//       text: "row1-item 4",
//     },
//     {
//       id: "row1",
//       text: "row1-item 5",
//     },
//   ],
//   [
//     {
//       id: "row2",
//       text: "row2-item 1",
//     },
//     {
//       id: "row2",
//       text: "row2-item 2",
//     },
//     {
//       id: "row2",
//       text: "row2-item 3",
//     },
//     {
//       id: "row2",
//       text: "row2-item 4",
//     },
//     {
//       id: "row2",
//       text: "row2-item 5",
//     },
//   ],
// ];

// const NativeTableBlock: FC<BlockProps> = (blockProps: BlockProps) => {
//   const { state } = useNativeFrameState();

//   const blockKey = blockProps.block?.key ?? "";
//   const visibility = state.variables?.get(
//     blockProps.block?.visibilityKey ?? ""
//   );
//   if (visibility && (visibility.value ?? "true") === "false") {
//     return <></>;
//   }

//   const variable = state.variables?.get(blockKey);
//   let result = {} as any;
//   if (blockProps.block?.jsonPath) {
//     const query = getVariableValue(
//       blockProps.block?.jsonPath,
//       "index",
//       blockProps.index.toString()
//     );
//     result = getJsonPathValue(variable?.value ?? "", query);
//   } else {
//     result = variable?.value ?? "";
//   }

//   const magics = state.magics?.get(blockKey) ?? [];

//   const properties = blockProps.block?.properties ?? new Map();

//   const boxShadow = properties.get("boxShadow")?.value ?? "";
//   const dropShadow = properties.get("dropShadow")?.value ?? "";

//   const direction = properties.get("direction")?.value ?? "";

//   const height = properties.get("height")?.value ?? "";
//   const width = properties.get("width")?.value ?? "";

//   const headerPaddingTop = properties.get("headerPaddingTop")?.value ?? "";
//   const headerPaddingBottom = properties.get("headerPaddingBottom")?.value ?? "";
//   const headerPaddingStart = properties.get("headerPaddingStart")?.value ?? "";
//   const headerPaddingEnd = properties.get("headerPaddingEnd")?.value ?? "";

//   const headerPadding = spacingMapper(
//     headerPaddingStart,
//     headerPaddingTop,
//     headerPaddingEnd,
//     headerPaddingBottom
//   );

//   const headerFontFamily = properties.get("headerFontFamily")?.value ?? "";
//   const headerLetterSpacing = properties.get("headerLetterSpacing")?.value ?? "";
//   const headerTextAlign = properties.get("headerTextAlign")?.value ?? "";
//   const headerTextDecoration = properties.get("headerTextDecoration")?.value ?? "";
//   const headerFontWeight = properties.get("headerFontWeight")?.value ?? "";
//   const headerFontSize = properties.get("headerFontSize")?.value ?? "";

//   const headerForegroundColor = properties.get("headerForegroundColor")?.value ?? "";
//   const headerForegroundColorOpacity = properties.get("headerForegroundColorOpacity")?.value ?? "";

//   const hforegroundColor = toArgb(
//     headerForegroundColor,
//     headerForegroundColorOpacity
//   );

//   const headerExtraClass = properties.get("headerClass")?.value ?? "";

//   const bodyPaddingTop = properties.get("bodyPaddingTop")?.value ?? "";
//   const bodyPaddingBottom = properties.get("bodyPaddingBottom")?.value ?? "";
//   const bodyPaddingStart = properties.get("bodyPaddingStart")?.value ?? "";
//   const bodyPaddingEnd = properties.get("bodyPaddingEnd")?.value ?? "";

//   const bodyPadding = spacingMapper(
//     bodyPaddingStart,
//     bodyPaddingTop,
//     bodyPaddingEnd,
//     bodyPaddingBottom
//   );

//   const bodyFontFamily = properties.get("bodyFontFamily")?.value ?? "";
//   const bodyLetterSpacing = properties.get("bodyLetterSpacing")?.value ?? "";
//   const bodyTextAlign = properties.get("bodyTextAlign")?.value ?? "";
//   const bodyTextDecoration = properties.get("bodyTextDecoration")?.value ?? "";
//   const bodyFontWeight = properties.get("bodyFontWeight")?.value ?? "";
//   const bodyFontSize = properties.get("bodyFontSize")?.value ?? "";

//   const bodyForegroundColor = properties.get("bodyForegroundColor")?.value ?? "";
//   const bodyForegroundColorOpacity = properties.get("bodyForegroundColorOpacity")?.value ?? "";

//   const bBackgroundcolor = toArgb(
//     bodyForegroundColor,
//     bodyForegroundColorOpacity
//   );

//   const bodyExtraClass = properties.get("bodyClass")?.value ?? "";

//   // const headersKey = properties.get("headersVariable")?.value ?? "";
//   // const headersVariable = state.variables?.get(headersKey);
//   // const headers = JSON.parse(headersVariable?.value ?? "[]") ?? [];

//   // const itemsKey = properties.get("itemsVariable")?.value ?? "";
//   // const itemsVariable = state.variables?.get(itemsKey);
//   // const items = JSON.parse(itemsVariable?.value ?? "[]") ?? [];

//   return (
//     <>
//       {/* <div className="flex flex-col">
//         <div className="overflow-x-auto">
//           <div className="p-1.5 min-w-full inline-block align-middle">
//             <div className="overflow-hidden">

//             </div>
//           </div>
//         </div>
//       </div> */}
//       <table
//         className={`
//         ${dropShadow}
//         ${boxShadow}
//         ${height}
//         ${width}`}
//         style={{
//           ...directionMapper(direction),
//         }}
//       >
//         <thead>
//           <tr>
//             {headers ? (
//               headers?.map((item) => {
//                 return (
//                   <th
//                     scope="col"
//                     style={{
//                       ...directionMapper(direction),
//                       ...headerPadding,
//                       fontFamily: headerFontFamily,
//                       fontSize: `${headerFontSize}rem`,
//                       letterSpacing: `${headerLetterSpacing}rem`,
//                       color: hforegroundColor,
//                     }}
//                     className={`
//                             ${headerTextAlign}
//                             ${headerTextDecoration}
//                             ${headerFontWeight}
//                             ${headerExtraClass}`}
//                   >
//                     {item.text}
//                   </th>
//                 );
//               })
//             ) : (
//               <></>
//             )}
//           </tr>
//         </thead>
//         <tbody>
//           {items?.map((row) => {
//             return (
//               <tr>
//                 {row?.map((cell) => {
//                   return (
//                     <td
//                       style={{
//                         ...directionMapper(direction),
//                         ...bodyPadding,
//                         fontFamily: bodyFontFamily,
//                         fontSize: `${bodyFontSize}rem`,
//                         letterSpacing: `${bodyLetterSpacing}rem`,
//                         color: bBackgroundcolor,
//                       }}
//                       className={`
//                             ${bodyTextAlign}
//                             ${bodyTextDecoration}
//                             ${bodyFontWeight}
//                             ${bodyExtraClass}`}
//                     >
//                       {cell?.text}
//                     </td>
//                   );
//                 })}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </>
//   );
// };

// export default NativeTableBlock;
