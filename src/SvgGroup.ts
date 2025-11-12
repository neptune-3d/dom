import { BaseSvgElement } from "./BaseSvgElement";

/**
 * Wrapper for the `<g>` SVG element, extending `BaseSvgElement<"g">` with group-specific functionality.
 *
 * Provides a fluent API for grouping multiple SVG elements under a shared transform or style context.
 * Inherits common styling and transform methods from `BaseSvgElement`, enabling consistent manipulation across grouped shapes.
 *
 * Ideal for structuring reusable components, applying collective transforms, or organizing layered SVG content.
 */
export class SvgGroup extends BaseSvgElement<"g"> {
  constructor() {
    super("g");
  }
}

/**
 * Creates a new SvgGroup element.
 *
 * @return A new SvgGroup instance.
 */
export function $group(): SvgGroup {
  return new SvgGroup();
}
