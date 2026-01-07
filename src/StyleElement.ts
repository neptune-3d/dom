import { DomElement } from "./DomElement";
import { StyleSheet } from "./StyleSheet";

/**
 * Fluent wrapper for the `<style>` element, extending `DomElement<"style">` with stylesheet-specific APIs.
 * Inherits styling and DOM manipulation capabilities from `BaseStyle → BaseDom → DomElement`.
 *
 * Provides ergonomic methods for accessing and manipulating the element’s associated `CSSStyleSheet`,
 * enabling dynamic rule insertion, removal, and media query management.
 * Designed for declarative composition, chaining, and integration with component-level styling systems.
 *
 * Example:
 * ```ts
 * $style()
 *   .appendTo(document.head)
 *   .getSheet()
 *   .cssRule(".btn")
 *   .hover()
 *   .style({ backgroundColor: "blue" });
 * ```
 */
export class StyleElement extends DomElement<"style"> {
  /**
   * Creates a new `StyleElement` wrapper.
   *
   * If an existing `<style>` element is provided, it will be wrapped.
   * Otherwise, a new `<style>` element is created and initialized with `type="text/css"`.
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
   * @return A `StyleSheet` instance wrapping the element’s `CSSStyleSheet`, or `null` if unavailable.
   */
  getSheet(): StyleSheet | null {
    const sheet = this.dom.sheet;
    return sheet ? new StyleSheet(sheet) : null;
  }
}

/**
 * Creates a new `StyleElement` instance with a wrapped `<style>` element.
 * This provides access to the fluent style API, including rule insertion,
 * media query management, and dynamic stylesheet manipulation.
 *
 * If you want to wrap an existing `<style>` element, pass it as an argument.
 * Otherwise, a new `<style>` element will be created and initialized with `type="text/css"`.
 *
 * Example:
 * ```ts
 * // Create a new <style> element
 * $style()
 *   .appendTo(document.head)
 *   .getSheet()
 *   ?.cssRule(".btn")
 *   .hover()
 *   .style({ backgroundColor: "blue" });
 *
 * // Wrap an existing <style> element
 * const existing = document.querySelector("style#my-style") as HTMLStyleElement;
 * $style(existing).getSheet()?.cssRule(".box").style({ margin: "1em" });
 * ```
 *
 * @param el - Optional existing `HTMLStyleElement` to wrap.
 * @return A new `StyleElement` instance.
 */
export function $style(el?: HTMLStyleElement): StyleElement {
  return new StyleElement(el);
}
