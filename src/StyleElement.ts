import { DomElement } from "./DomElement";
import { StyleSheet } from "./StyleSheet";

/**
 * Wrapper for an `HtmlStyleElement`.
 */
export class StyleElement extends DomElement<"style"> {
  /**
   * Creates a new `StyleElement` wrapper.
   *
   * @param el - Optional existing `HTMLStyleElement` to wrap.
   */
  constructor(el?: HTMLStyleElement) {
    super("style", el);
    this.dom.setAttribute("type", "text/css");
  }

  /**
   * Returns a `StyleSheet` wrapper around this `<style>` element’s associated `CSSStyleSheet`.
   * Useful for inserting, removing, or querying CSS rules programmatically.
   *
   * ⚠️ The `<style>` element must be attached to a document for its `sheet` property to be available.
   *
   * @returns A `StyleSheet` instance wrapping the element’s `CSSStyleSheet`, or `null` if unavailable.
   */
  getSheet(): StyleSheet | null {
    const sheet = this.dom.sheet;
    return sheet ? new StyleSheet(sheet) : null;
  }
}

/**
 * Factory for creating a `StyleElement` instance.
 *
 * @param el Optional existing `HTMLStyleElement` to wrap.
 * @returns A new `StyleElement` instance.
 */
export function $style(el?: HTMLStyleElement): StyleElement {
  return new StyleElement(el);
}
