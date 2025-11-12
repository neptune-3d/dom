import { BaseSvgElement } from "./BaseSvgElement";

/**
 * Wrapper for the `<rect>` SVG element, extending `BaseSvgElement<"rect">` with rect-specific functionality.
 *
 * Provides a fluent API for setting rectangle geometry via `x`, `y`, `width`, `height`, and optional corner radii.
 * Inherits common styling and transform methods from `BaseSvgElement`, enabling consistent manipulation across SVG shape elements.
 *
 * Ideal for constructing positioned rectangles, UI blocks, and layout primitives with ergonomic chaining.
 */
export class SvgRect extends BaseSvgElement<"rect"> {
  constructor() {
    super("rect");
  }

  /**
   * Sets the `x` position of the rectangle.
   * @param x - Horizontal coordinate.
   * @return This instance for chaining.
   */
  x(x: number): this {
    return this.attr("x", x.toString());
  }

  /**
   * Sets the `y` position of the rectangle.
   * @param y - Vertical coordinate.
   * @return This instance for chaining.
   */
  y(y: number): this {
    return this.attr("y", y.toString());
  }

  /**
   * Sets the `width` of the rectangle.
   * @param w - Width in user units.
   * @return This instance for chaining.
   */
  width(w: number): this {
    return this.attr("width", w.toString());
  }

  /**
   * Sets the `height` of the rectangle.
   * @param h - Height in user units.
   * @return This instance for chaining.
   */
  height(h: number): this {
    return this.attr("height", h.toString());
  }

  /**
   * Sets the horizontal corner radius (`rx`).
   * @param rx - Horizontal radius.
   * @return This instance for chaining.
   */
  rx(rx: number): this {
    return this.attr("rx", rx.toString());
  }

  /**
   * Sets the vertical corner radius (`ry`).
   * @param ry - Vertical radius.
   * @return This instance for chaining.
   */
  ry(ry: number): this {
    return this.attr("ry", ry.toString());
  }
}

/**
 * Creates a new SvgRect element.
 *
 * @return A new SvgRect instance.
 */
export function $rect(): SvgRect {
  return new SvgRect();
}
