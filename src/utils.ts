import { SVG_TAGS, TAG_ALIAS, UNITLESS_CSS_PROPS } from "./constants";
import type {
  Autocomplete,
  CssProperties,
  DomElementTagNameMap,
} from "./types";

/**
 * Converts a camelCase string into kebab-case.
 *
 * Commonly used for CSS property names when setting styles via setAttribute,
 * since CSS expects kebab-case (e.g., "backgroundColor" → "background-color").
 *
 * @param prop - The camelCase string to convert.
 * @return The kebab-case version of the input string.
 */
export function camelToKebab(prop: string): string {
  return prop.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

/**
 * Normalizes a CSS property value into a valid string.
 *
 * - If the value is a number and the property is unitless (e.g., `lineHeight`),
 *   it is returned as-is.
 * - If the value is a number and the property requires units, "px" is appended.
 * - If the value is already a string, it is returned unchanged.
 *
 * @param name - The CSS property name (typed against CssProperties).
 * @param value - The value to normalize (string or number).
 * @return A string suitable for use in CSS style declarations.
 */
export function getStyleValue(
  name: Autocomplete<keyof CssProperties>,
  value: string | number
): string {
  if (typeof value === "number") {
    const isUnitless = !!UNITLESS_CSS_PROPS[name];
    return isUnitless ? String(value) : `${value}px`;
  }
  return value;
}

/**
 * Ensures a CSS value is expressed in pixels if numeric.
 *
 * - If the value is a number, "px" is appended.
 * - If the value is already a string, it is returned unchanged.
 *
 * Useful for properties that always expect pixel units (e.g., `width`, `height`).
 *
 * @param value - The numeric or string value to normalize.
 * @return A string with "px" appended if numeric, or the original string.
 */
export function getPxStyleValue(value: string | number): string {
  return typeof value === "number" ? `${value}px` : value;
}

/**
 * Normalizes a tag name using TAG_ALIAS.
 *
 * Ensures that internal aliases (e.g., "svgA") are mapped to their canonical
 * tag names before element creation or comparison.
 *
 * @param tag - The tag name or alias.
 * @return The canonical tag name string.
 */
export function normalizeTag<Tag extends keyof DomElementTagNameMap>(
  tag: Tag
): string {
  const alias = (TAG_ALIAS as any)[tag];
  return (alias ?? tag) as string;
}

/**
 * Checks whether a given tag name corresponds to an SVG element.
 *
 * Used to decide whether to create the element in the SVG namespace.
 *
 * @param tag - The tag name to check.
 * @return True if the tag is an SVG element, false otherwise.
 */
export function isSvgTag(tag: string): boolean {
  return SVG_TAGS.includes(tag);
}

/**
 * Creates a native DOM element in the specified document context.
 *
 * - For SVG tags, uses `createElementNS` with the SVG namespace.
 * - For HTML tags, uses `createElement`.
 *
 * This ensures elements are created in the correct document (main, iframe, or synthetic).
 *
 * @param doc - The Document in which to create the element.
 * @param tag - The tag name of the element to create.
 * @return The created native element, typed according to DomElementTagNameMap.
 */
export function createElement<Tag extends keyof DomElementTagNameMap>(
  doc: Document,
  tag: Tag
): DomElementTagNameMap[Tag] {
  const normalized = normalizeTag(tag);
  const svg = isSvgTag(normalized);

  return (
    svg
      ? doc.createElementNS("http://www.w3.org/2000/svg", normalized)
      : doc.createElement(normalized)
  ) as DomElementTagNameMap[Tag];
}
