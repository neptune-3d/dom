import { DomElement } from "./DomElement";

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
   * Returns the associated `CSSStyleSheet` object via the `sheet` field.
   *
   * The `<style>` element must be attached to a document for its `sheet` property to be available.
   *
   * @returns A `CSSStyleSheet` object or null if unavailable.
   */
  getSheet(): CSSStyleSheet | null {
    return this.dom.sheet;
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
