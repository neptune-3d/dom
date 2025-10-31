import type { DomElementTagNameMap } from "./types";

export const UNITLESS_CSS_PROPS: Record<string, 1> = {
  opacity: 1,
  zIndex: 1,
  fontWeight: 1,
  lineHeight: 1,
  flexGrow: 1,
  flexShrink: 1,
  order: 1,
  zoom: 1,
  scale: 1,
  counterIncrement: 1,
  counterReset: 1,
  tabSize: 1,
  orphans: 1,
  widows: 1,
  columns: 1,
  columnCount: 1,
  gridRow: 1,
  gridColumn: 1,
};

export const VENDOR_CSS_PROPS: Record<string, 1> = {
  WebkitAppearance: 1,
};

export const SVG_TAGS = [
  "svg",
  "circle",
  "rect",
  "path",
  "line",
  "polyline",
  "polygon",
  "g",
  "text",
  "defs",
  "use",
  "symbol",
  "clipPath",
  "mask",
];

export const TAG_ALIAS = {
  svgA: "a",
} satisfies Record<string, keyof DomElementTagNameMap>;

export type TagAlias = typeof TAG_ALIAS;
