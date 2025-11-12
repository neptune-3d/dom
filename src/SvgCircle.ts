import { BaseSvgElement } from "./BaseSvgElement";

/**
 * Wrapper for the `<circle>` SVG element, extending `BaseSvgElement<"circle">` with circle-specific functionality.
 *
 * Provides a fluent API for setting circle geometry via `cx`, `cy`, and `r` attributes.
 * Inherits common styling and transform methods from `BaseSvgElement`, enabling consistent manipulation across SVG shape elements.
 *
 * Ideal for constructing circular shapes, markers, and radial primitives with ergonomic chaining.
 */
export class SvgCircle extends BaseSvgElement<"circle"> {
  constructor() {
    super("circle");
  }

  /**
   * Sets the `cx` (center x) coordinate.
   * @param cx - Horizontal center position.
   * @return This instance for chaining.
   */
  cx(cx: number): this {
    return this.attr("cx", cx.toString());
  }

  /**
   * Sets the `cy` (center y) coordinate.
   * @param cy - Vertical center position.
   * @return This instance for chaining.
   */
  cy(cy: number): this {
    return this.attr("cy", cy.toString());
  }

  /**
   * Sets the `r` (radius) of the circle.
   * @param r - Radius in user units.
   * @return This instance for chaining.
   */
  r(r: number): this {
    return this.attr("r", r.toString());
  }
}

/**
 * Creates a new SvgCircle element.
 *
 * @return A new SvgCircle instance.
 */
export function $circle(): SvgCircle {
  return new SvgCircle();
}
