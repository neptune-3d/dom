import { BaseSvgElement } from "./BaseSvgElement";
import type { PathData } from "./PathData";

/**
 * Wrapper for the `<path>` SVG element, extending `BaseSvgElement<"path">` with path-specific functionality.
 *
 * Provides a fluent API for setting the `d` attribute using either raw path strings or structured `PathData` builders.
 * Inherits common styling and transform methods from `BaseSvgElement`, enabling consistent manipulation across SVG shape elements.
 *
 * Ideal for constructing complex vector shapes, curves, and outlines with ergonomic chaining.
 */
export class SvgPath extends BaseSvgElement<"path"> {
  constructor() {
    super("path");
  }

  /**
   * Sets the `d` attribute using a raw string or PathData instance.
   * @param path - Path data string or builder.
   * @return This instance for chaining.
   */
  d(path: string | PathData): this {
    const value = typeof path === "string" ? path : path.toString();
    return this.attr("d", value);
  }
}

/**
 * Creates a new SvgPath element.
 *
 * @return A new SvgPath instance.
 */
export function $path(): SvgPath {
  return new SvgPath();
}
