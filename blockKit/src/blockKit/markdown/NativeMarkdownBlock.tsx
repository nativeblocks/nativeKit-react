import { css } from "@emotion/css";
import { BlockProps, useNativeFrameState } from "@nativeblocks/nativeblocks-react";
import React, { FC } from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { generateExtraClass } from "../../utility/BlockUtil";
import { getDirection } from "../../utility/LayoutUtil";
import { getBoxShadow, getDropShadow } from "../../utility/ShadowUtil";
import { getHeight, getWidth } from "../../utility/SizeUtil";
import { getPadding } from "../../utility/SpaceUtil";
import { mergeClasses, mergeStyles } from "../../utility/StyleUtil";

const NativeMarkdownBlock: FC<BlockProps> = (blockProps: BlockProps) => {
  const { state } = useNativeFrameState();

  const visibility = state.variables?.get(blockProps.block?.visibilityKey ?? "");
  if (visibility && (visibility.value ?? "true") === "false") {
    return <></>;
  }

  // const blockKey = blockProps.block?.key ?? "";
  // const magics = state.magics?.get(blockKey) ?? [];

  const data = blockProps.block?.data ?? new Map();
  const content = state.variables?.get(data.get("content")?.value ?? "")?.value ?? "";

  const padding = getPadding(blockProps.block);
  const boxShadow = getBoxShadow(blockProps.block);
  const dropShadow = getDropShadow(blockProps.block);
  const direction = getDirection(blockProps.block);
  const height = getHeight(blockProps.block);
  const width = getWidth(blockProps.block);
  const extraClass = generateExtraClass(blockProps.block);

  const mergedStyle = mergeStyles([padding, direction]);
  const classes = mergeClasses([css(mergedStyle), dropShadow, boxShadow, height, width, extraClass, "select-text"]);

  return (
    <Markdown
      className={classes}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        a: ({ ...props }) => {
          return (
            <>
              <a className="text-blue-600" target="_blank" href={props.href}>
                {props.children}
              </a>
            </>
          );
        },
        code({ node, inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || "");

          return !inline && match ? (
            <SyntaxHighlighter PreTag="div" language={match[1]} {...props}>
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </Markdown>
  );
};

export default NativeMarkdownBlock;
