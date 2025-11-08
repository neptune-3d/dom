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

export type DomElementChild = DomElement<any> | Node | string | number;

export type DomElementTagNameMap = HTMLElementTagNameMap & SvgElementTagNameMap;

type SvgElementTagNameMap = {
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
