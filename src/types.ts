import type { PropertiesFallback } from "csstype";
import type { DomElement } from "./DomElement";
import type { InputCheckbox } from "./InputCheckbox";
import type { InputColor } from "./InputColor";
import type { InputNumber } from "./InputNumber";
import type { InputRange } from "./InputRange";
import type { InputText } from "./InputText";

export type CssProperties = PropertiesFallback<string | number> & {
  [key: `--${string}`]: string | number | undefined;
};

export type { Property as CssProperty } from "csstype";

export type Autocomplete<T extends string> = T | (string & {});

export type DomElementChild =
  | DomElement<any>
  | Node
  | string
  | number
  | boolean
  | null
  | undefined;

export type DomReferenceNode = Node | DomElement<any> | null;

export type DomElementTagNameMap = HTMLElementTagNameMap & SvgElementTagNameMap;

export type SvgElementTagNameMap = {
  svgA: SVGAElement;
  animate: SVGAnimateElement;
  animateMotion: SVGAnimateMotionElement;
  animateTransform: SVGAnimateTransformElement;
  circle: SVGCircleElement;
  clipPath: SVGClipPathElement;
  defs: SVGDefsElement;
  desc: SVGDescElement;
  ellipse: SVGEllipseElement;
  feBlend: SVGFEBlendElement;
  feColorMatrix: SVGFEColorMatrixElement;
  feComponentTransfer: SVGFEComponentTransferElement;
  feComposite: SVGFECompositeElement;
  feConvolveMatrix: SVGFEConvolveMatrixElement;
  feDiffuseLighting: SVGFEDiffuseLightingElement;
  feDisplacementMap: SVGFEDisplacementMapElement;
  feDistantLight: SVGFEDistantLightElement;
  feDropShadow: SVGFEDropShadowElement;
  feFlood: SVGFEFloodElement;
  feFuncA: SVGFEFuncAElement;
  feFuncB: SVGFEFuncBElement;
  feFuncG: SVGFEFuncGElement;
  feFuncR: SVGFEFuncRElement;
  feGaussianBlur: SVGFEGaussianBlurElement;
  feImage: SVGFEImageElement;
  feMerge: SVGFEMergeElement;
  feMergeNode: SVGFEMergeNodeElement;
  feMorphology: SVGFEMorphologyElement;
  feOffset: SVGFEOffsetElement;
  fePointLight: SVGFEPointLightElement;
  feSpecularLighting: SVGFESpecularLightingElement;
  feSpotLight: SVGFESpotLightElement;
  feTile: SVGFETileElement;
  feTurbulence: SVGFETurbulenceElement;
  filter: SVGFilterElement;
  foreignObject: SVGForeignObjectElement;
  g: SVGGElement;
  image: SVGImageElement;
  line: SVGLineElement;
  linearGradient: SVGLinearGradientElement;
  marker: SVGMarkerElement;
  mask: SVGMaskElement;
  metadata: SVGMetadataElement;
  mpath: SVGMPathElement;
  path: SVGPathElement;
  pattern: SVGPatternElement;
  polygon: SVGPolygonElement;
  polyline: SVGPolylineElement;
  radialGradient: SVGRadialGradientElement;
  rect: SVGRectElement;
  script: SVGScriptElement;
  set: SVGSetElement;
  stop: SVGStopElement;
  style: SVGStyleElement;
  svg: SVGSVGElement;
  switch: SVGSwitchElement;
  symbol: SVGSymbolElement;
  text: SVGTextElement;
  textPath: SVGTextPathElement;
  title: SVGTitleElement;
  tspan: SVGTSpanElement;
  use: SVGUseElement;
  view: SVGViewElement;
};

export type DomElementEventMap = HTMLElementEventMap & SVGElementEventMap;

export type InputElementMap = {
  color: InputColor;
  text: InputText;
  number: InputNumber;
  range: InputRange;
  checkbox: InputCheckbox;
};

/**
 * Represents valid CSS `linear-gradient` direction values.
 * Includes keyword-based directions (e.g., "to right") and angle-based values (e.g., "45deg").
 */
export type LinearGradientDirection =
  | "to top"
  | "to top right"
  | "to right top"
  | "to right"
  | "to bottom right"
  | "to right bottom"
  | "to bottom"
  | "to bottom left"
  | "to left bottom"
  | "to left"
  | "to top left"
  | "to left top"
  | `${number}deg`
  | `${number}grad`
  | `${number}rad`
  | `${number}turn`;

/**
 * Declarative type for building a Content Security Policy.
 * Each directive maps to a space-separated string of sources or values.
 */
export type ContentSecurityPolicy = {
  "default-src"?: string;
  "script-src"?: string;
  "style-src"?: string;
  "img-src"?: string;
  "font-src"?: string;
  "connect-src"?: string;
  "media-src"?: string;
  "object-src"?: string;
  "frame-src"?: string;
  "child-src"?: string;
  "worker-src"?: string;
  "manifest-src"?: string;
  "prefetch-src"?: string;
  "form-action"?: string;
  "base-uri"?: string;
  "frame-ancestors"?: string;
  "navigate-to"?: string;
  "require-trusted-types-for"?: string;
  "trusted-types"?: string;
  sandbox?: string;
  "upgrade-insecure-requests"?: string;
  "block-all-mixed-content"?: string;
  "report-uri"?: string;
  "report-to"?: string;
};

export type IFrameSandboxFlag =
  | "allow-forms"
  | "allow-modals"
  | "allow-orientation-lock"
  | "allow-pointer-lock"
  | "allow-popups"
  | "allow-popups-to-escape-sandbox"
  | "allow-presentation"
  | "allow-same-origin"
  | "allow-scripts"
  | "allow-storage-access-by-user-activation"
  | "allow-top-navigation"
  | "allow-top-navigation-by-user-activation";

export type TextAreaWrapMode = "soft" | "hard" | "off";

/**
 * All known WAI-ARIA role strings as defined by the ARIA specification.
 * Source: WAI-ARIA Roles (MDN, W3C).
 */
export type AriaRole =
  | "alert"
  | "alertdialog"
  | "application"
  | "article"
  | "banner"
  | "blockquote"
  | "button"
  | "cell"
  | "checkbox"
  | "code"
  | "columnheader"
  | "combobox"
  | "complementary"
  | "contentinfo"
  | "definition"
  | "deletion"
  | "dialog"
  | "document"
  | "emphasis"
  | "feed"
  | "figure"
  | "form"
  | "grid"
  | "gridcell"
  | "group"
  | "heading"
  | "img"
  | "insertion"
  | "link"
  | "list"
  | "listbox"
  | "listitem"
  | "log"
  | "main"
  | "marquee"
  | "math"
  | "menu"
  | "menubar"
  | "menuitem"
  | "menuitemcheckbox"
  | "menuitemradio"
  | "meter"
  | "navigation"
  | "none"
  | "note"
  | "option"
  | "paragraph"
  | "presentation"
  | "progressbar"
  | "radio"
  | "radiogroup"
  | "region"
  | "row"
  | "rowgroup"
  | "rowheader"
  | "scrollbar"
  | "search"
  | "searchbox"
  | "separator"
  | "slider"
  | "spinbutton"
  | "status"
  | "strong"
  | "subscript"
  | "superscript"
  | "switch"
  | "tab"
  | "table"
  | "tablist"
  | "tabpanel"
  | "term"
  | "textbox"
  | "time"
  | "toolbar"
  | "tooltip"
  | "tree"
  | "treegrid"
  | "treeitem";

/**
 * All known values for the `aria-haspopup` attribute.
 * Source: WAI-ARIA specification (current).
 */
export type AriaHasPopup =
  | "false"
  | "true"
  | "menu"
  | "listbox"
  | "tree"
  | "grid"
  | "dialog";

/**
 * All known values for the `aria-live` attribute.
 * Source: WAI-ARIA specification (current).
 */
export type AriaLive = "off" | "polite" | "assertive";

export type DomNamespaceURI =
  | "http://www.w3.org/1999/xhtml"
  | "http://www.w3.org/2000/svg";
