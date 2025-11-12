import { BaseSvgElement } from "./BaseSvgElement";

/**
 * Wrapper for the `<svg>` root element, extending `BaseSvgElement<"svg">` with viewport and layout configuration.
 *
 * Provides a fluent API for setting width, height, viewBox, and namespace attributes.
 * Inherits common styling and transform methods from `BaseSvgElement`, enabling consistent manipulation across the entire SVG tree.
 *
 * Ideal for constructing standalone SVG documents or embedding scalable vector graphics in UI components.
 */
export class SvgElement extends BaseSvgElement<"svg"> {
  constructor() {
    super("svg");
  }

  /**
   * Sets the `width` of the SVG viewport.
   * @param w - Width in pixels or units.
   * @return This instance for chaining.
   */
  width(w: number | string): this {
    return this.attr("width", w.toString());
  }

  /**
   * Sets the `height` of the SVG viewport.
   * @param h - Height in pixels or units.
   * @return This instance for chaining.
   */
  height(h: number | string): this {
    return this.attr("height", h.toString());
  }

  /**
   * Sets the `viewBox` attribute for scalable layout.
   * @param x - Minimum x coordinate.
   * @param y - Minimum y coordinate.
   * @param w - ViewBox width.
   * @param h - ViewBox height.
   * @return This instance for chaining.
   */
  viewBox(x: number, y: number, w: number, h: number): this {
    return this.attr("viewBox", `${x} ${y} ${w} ${h}`);
  }
}

/**
 * Creates a new SvgElement root.
 *
 * @return A new SvgElement instance.
 */
export function $svg(): SvgElement {
  return new SvgElement();
}
