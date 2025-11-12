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
   * Sets the `fill` color.
   * @param color - Fill color (e.g. "red", "#ff0000", "none").
   * @return This instance for chaining.
   */
  svgFill(color: string): this {
    return this.attr("fill", color);
  }

  /**
   * Sets the `stroke` color.
   * @param color - Stroke color (e.g. "black", "#000", "none").
   * @return This instance for chaining.
   */
  svgStroke(color: string): this {
    return this.attr("stroke", color);
  }

  /**
   * Sets the `stroke-width` value.
   * @param width - Stroke width in pixels or units.
   * @return This instance for chaining.
   */
  svgStrokeWidth(width: number | string): this {
    return this.attr("stroke-width", width.toString());
  }

  /**
   * Sets the `opacity` value.
   * @param value - Opacity from 0 to 1.
   * @return This instance for chaining.
   */
  svgOpacity(value: number): this {
    return this.attr("opacity", value.toString());
  }

  /**
   * Sets the `transform` attribute with a raw SVG transform string.
   * Accepts any valid transform function: translate, rotate, scale, skewX, skewY, matrix.
   *
   * @param value - SVG transform string (e.g. "translate(10, 20) rotate(45)").
   * @return This instance for chaining.
   */
  svgTransform(value: string): this {
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
  svgTranslate(x: number, y: number): this {
    return this.attr("transform", `translate(${x} ${y})`);
  }

  /**
   * Applies a horizontal `translate(x, 0)` transform to the element.
   * Sets the `transform` attribute, replacing any existing value.
   *
   * @param x - Horizontal translation in user units.
   * @return This instance for chaining.
   */
  svgTranslateX(x: number): this {
    return this.attr("transform", `translate(${x} 0)`);
  }

  /**
   * Applies a vertical `translate(0, y)` transform to the element.
   * Sets the `transform` attribute, replacing any existing value.
   *
   * @param y - Vertical translation in user units.
   * @return This instance for chaining.
   */
  svgTranslateY(y: number): this {
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
  svgRotate(angle: number, cx?: number, cy?: number): this {
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
  svgScale(s: number): this {
    return this.attr("transform", `scale(${s})`);
  }

  /**
   * Applies a horizontal `scale(sx, 1)` transform to the element.
   * Sets the `transform` attribute, replacing any existing value.
   *
   * @param sx - Horizontal scale factor.
   * @return This instance for chaining.
   */
  svgScaleX(sx: number): this {
    return this.attr("transform", `scale(${sx} 1)`);
  }

  /**
   * Applies a vertical `scale(1, sy)` transform to the element.
   * Sets the `transform` attribute, replacing any existing value.
   *
   * @param sy - Vertical scale factor.
   * @return This instance for chaining.
   */
  svgScaleY(sy: number): this {
    return this.attr("transform", `scale(1 ${sy})`);
  }
}
