import { DomElement } from "./DomElement";
import type { SvgElementTagNameMap } from "./types";

/**
 * Base class for SVG shape elements, providing fluent setters for common SVG attributes.
 *
 * Extends `DomElement<T>` with ergonomic methods for styling (`fill`, `stroke`, `opacity`)
 * and geometric transforms (`translate`, `rotate`, `scale`), ensuring consistency across
 * all SVG element wrappers (e.g. `<path>`, `<rect>`, `<circle>`, etc.).
 *
 * Intended to be subclassed by specific SVG element wrappers like `SvgPath`, `SvgRect`, etc.
 *
 * @typeParam T - The SVG tag name (e.g. "path", "rect", "circle") this element represents.
 */
export class BaseSvgElement<
  T extends keyof SvgElementTagNameMap
> extends DomElement<T> {
  /**
   * Sets the `fill` attribute on the SVG element.
   * Controls the paint used to fill the interior of shapes.
   * Accepts values like color strings (`"red"`, `"#000"`, `"currentColor"`), gradients, or CSS variables.
   * Passing `undefined` removes the attribute.
   *
   * @param value - The fill value to apply as an SVG attribute, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  fill(value: string | undefined): this {
    return this.attr("fill", value);
  }

  /**
   * Sets the `fill-rule` property.
   * Determines how the interior of a shape is determined when paths intersect.
   *
   * @param rule - One of "nonzero" or "evenodd".
   * @return This instance for chaining.
   */
  fillRule(rule: "nonzero" | "evenodd"): this {
    return this.attr("fill-rule", rule);
  }

  /**
   * Sets the `fill-opacity` attribute on the SVG element.
   * Controls the transparency of the fill independently from the overall element opacity.
   * Accepts values from `0` (fully transparent) to `1` (fully opaque), or CSS variables.
   * Useful for layering visual effects or emphasizing fill contrast without affecting stroke or children.
   * Passing `undefined` removes the attribute.
   *
   * @param value - The fill opacity value to apply as an SVG attribute, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  fillOpacity(value: string | number | undefined): this {
    return this.attr("fill-opacity", value);
  }

  /**
   * Sets the `stroke` attribute on the SVG element.
   * Controls the color used to outline shapes.
   * Accepts values like color strings (`"black"`, `"none"`, `"currentColor"`), gradients, or CSS variables.
   * Passing `undefined` removes the attribute.
   *
   * @param value - The stroke value to apply as an SVG attribute, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  stroke(value: string | undefined): this {
    return this.attr("stroke", value);
  }

  /**
   * Sets the `stroke-width` attribute on the SVG element.
   * Controls the thickness of the stroke used to outline shapes.
   * Accepts values like `"1"`, `"0.5"`, `"2px"`, or CSS variables.
   * Passing `undefined` removes the attribute.
   *
   * @param value - The stroke-width value to apply as an SVG attribute, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  strokeWidth(value: string | number | undefined): this {
    return this.attr("stroke-width", value);
  }

  /**
   * Sets the `stroke-linejoin` style.
   * Controls how two connected segments in a stroke join.
   *
   * @param value - One of "miter", "round", or "bevel".
   * @return This instance for chaining.
   */
  strokeLinejoin(value: "miter" | "round" | "bevel"): this {
    return this.attr("stroke-linejoin", value);
  }

  /**
   * Sets the `stroke-linecap` style.
   * Controls how the end of an open stroke is rendered.
   *
   * @param value - One of "butt", "round", or "square".
   * @return This instance for chaining.
   */
  strokeLinecap(value: "butt" | "round" | "square"): this {
    return this.attr("stroke-linecap", value);
  }

  /**
   * Sets the `stroke-miterlimit` value.
   * Controls the maximum allowed ratio of miter length to stroke width for miter joins.
   *
   * @param value - Miter limit (typically ≥ 1).
   * @return This instance for chaining.
   */
  strokeMiterlimit(value: number): this {
    return this.attr("stroke-miterlimit", value.toString());
  }

  /**
   * Sets the `stroke-opacity` attribute on the SVG element.
   * Controls the transparency of the stroke independently from the overall element opacity.
   * Accepts values from `0` (fully transparent) to `1` (fully opaque), or CSS variables.
   * Passing `undefined` removes the attribute.
   *
   * @param value - The stroke opacity value to apply as an SVG attribute, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  strokeOpacity(value: string | number | undefined): this {
    return this.attr("stroke-opacity", value);
  }

  /**
   * Sets the `stroke-dasharray` attribute on the SVG element.
   * Defines the pattern of dashes and gaps used to render the stroke.
   * Accepts a space- or comma-separated list of lengths (e.g. `"5 2"` or `"5,2"`), numeric values, or CSS variables.
   * Passing `undefined` removes the attribute.
   *
   * @param value - The dash pattern to apply as an SVG attribute, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  strokeDasharray(value: string | number | undefined): this {
    return this.attr("stroke-dasharray", value);
  }

  /**
   * Sets the `stroke-dashoffset` attribute on the SVG element.
   * Specifies how far into the dash pattern the stroke should start.
   * Useful for animating dashed strokes or offsetting patterns.
   * Accepts numeric values, length strings (e.g. `"4px"`), or CSS variables.
   * Passing `undefined` removes the attribute.
   *
   * @param value - The dash offset to apply as an SVG attribute, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  strokeDashoffset(value: string | number | undefined): this {
    return this.attr("stroke-dashoffset", value);
  }

  /**
   * Sets the `opacity` attribute on the SVG element.
   * Controls the overall transparency of the element.
   * Accepts values from `0` (fully transparent) to `1` (fully opaque), or CSS variables.
   * Passing `undefined` removes the attribute.
   *
   * @param value - The opacity value to apply as an SVG attribute, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  opacity(value: string | number | undefined): this {
    return this.attr("opacity", value);
  }

  /**
   * Sets the `transform` attribute on the SVG element.
   * Controls geometric transformations like translation, rotation, scaling, and skewing.
   * Accepts values like `"translate(10, 20)"`, `"rotate(45)"`, `"scale(2)"`, or composed transforms.
   * Passing `undefined` removes the attribute.
   *
   * @param value - The transform string to apply as an SVG attribute, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  transform(value: string | undefined): this {
    return this.attr("transform", value);
  }

  /**
   * Applies a `translate(x, y)` transform to the element.
   * Sets the `transform` attribute, replacing any existing value.
   *
   * @param x - Horizontal translation in user units.
   * @param y - Vertical translation in user units.
   * @return This instance for chaining.
   */
  translate(x: number, y: number): this {
    return this.attr("transform", `translate(${x} ${y})`);
  }

  /**
   * Applies a horizontal `translate(x, 0)` transform to the element.
   * Sets the `transform` attribute, replacing any existing value.
   *
   * @param x - Horizontal translation in user units.
   * @return This instance for chaining.
   */
  translateX(x: number): this {
    return this.attr("transform", `translate(${x} 0)`);
  }

  /**
   * Applies a vertical `translate(0, y)` transform to the element.
   * Sets the `transform` attribute, replacing any existing value.
   *
   * @param y - Vertical translation in user units.
   * @return This instance for chaining.
   */
  translateY(y: number): this {
    return this.attr("transform", `translate(0 ${y})`);
  }

  /**
   * Applies a `rotate(angle)` or `rotate(angle, cx, cy)` transform to the element.
   * Sets the `transform` attribute, replacing any existing value.
   *
   * @param angle - Rotation angle in degrees.
   * @param cx - Optional x coordinate of the rotation center.
   * @param cy - Optional y coordinate of the rotation center.
   * @return This instance for chaining.
   */
  rotate(angle: number, cx?: number, cy?: number): this {
    const value =
      cx !== undefined && cy !== undefined
        ? `rotate(${angle} ${cx} ${cy})`
        : `rotate(${angle})`;
    return this.attr("transform", value);
  }

  /**
   * Applies a uniform `scale(s)` transform to the element.
   * Sets the `transform` attribute, replacing any existing value.
   *
   * @param s - Uniform scale factor for both x and y axes.
   * @return This instance for chaining.
   */
  scale(s: number): this {
    return this.attr("transform", `scale(${s})`);
  }

  /**
   * Applies a horizontal `scale(sx, 1)` transform to the element.
   * Sets the `transform` attribute, replacing any existing value.
   *
   * @param sx - Horizontal scale factor.
   * @return This instance for chaining.
   */
  scaleX(sx: number): this {
    return this.attr("transform", `scale(${sx} 1)`);
  }

  /**
   * Applies a vertical `scale(1, sy)` transform to the element.
   * Sets the `transform` attribute, replacing any existing value.
   *
   * @param sy - Vertical scale factor.
   * @return This instance for chaining.
   */
  scaleY(sy: number): this {
    return this.attr("transform", `scale(1 ${sy})`);
  }

  /**
   * Applies a horizontal skew transform to the SVG element.
   * Sets the `transform` attribute to `skewX(angle)`, replacing any existing transform.
   * Skewing distorts the element along the X-axis by the specified angle.
   *
   * @param angle - Skew angle in degrees. Positive values skew right, negative values skew left.
   * @return This instance for chaining.
   */
  skewX(angle: number): this {
    return this.attr("transform", `skewX(${angle})`);
  }

  /**
   * Applies a vertical skew transform to the SVG element.
   * Sets the `transform` attribute to `skewY(angle)`, replacing any existing transform.
   * Skewing distorts the element along the Y-axis by the specified angle.
   *
   * @param angle - Skew angle in degrees. Positive values skew downward, negative values skew upward.
   * @return This instance for chaining.
   */
  skewY(angle: number): this {
    return this.attr("transform", `skewY(${angle})`);
  }

  /**
   * Sets the `vector-effect` attribute on the SVG element.
   * Controls how stroke rendering behaves under geometric transformations.
   * Commonly used to preserve stroke width when scaling with `transform`.
   *
   * @param value - One of:
   *   - `"none"`: Stroke scales with the element.
   *   - `"non-scaling-stroke"`: Stroke width remains constant regardless of scale.
   * @return This instance for chaining.
   */
  vectorEffect(value: "none" | "non-scaling-stroke"): this {
    return this.attr("vector-effect", value);
  }
}
