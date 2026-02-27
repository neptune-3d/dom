import { BaseSvgElement } from "./BaseSvgElement";

/**
 * Wrapper class for the `SVGGElement` object.
 */
export class SvgGroup extends BaseSvgElement<"g"> {
  constructor() {
    super("g");
  }
}

/**
 * Factory helper function for creating an instance of the `SvgGroup` class.
 *
 * @returns A new `SvgGroup` instance.
 */
export function $group(): SvgGroup {
  return new SvgGroup();
}
