import { CssRule } from "./CssRule";
import { MediaRule } from "./MediaRule";
import { getStyleValue } from "./utils";

/**
 * Wrapper around a native `CSSStyleSheet` object.
 *
 * Provides a fluent, type‑safe API for inserting, removing, and managing CSS rules
 * at runtime. Designed for dynamic styling systems where rules need to be created,
 * extended, or deleted programmatically without relying on inline styles.
 *
 * Features:
 * - Direct access to the underlying `CSSStyleSheet` via `sheet`.
 * - Rule insertion helpers (`cssRule`, `mediaRule`, `mediaMinWidth`, `mediaMaxWidth`).
 * - Rule removal via `removeRule`.
 * - Integration with `CssRule` and `MediaRule` wrappers for chainable style manipulation.
 * - Static `getSheet` utility to wrap an existing `<style>` element’s stylesheet.
 *
 * Intended for use in component‑level styling or DOM abstractions that require
 * granular control over stylesheet contents.
 */
export class StyleSheet {
  /**
   * Creates a new `StyleSheet` wrapper bound to the given `CSSStyleSheet`.
   *
   * The provided stylesheet must already be available (e.g., from a `<style>` element
   * attached to a document). Once wrapped, you can insert, remove, and query rules
   * using the class’s fluent API.
   *
   * @param sheet - The native `CSSStyleSheet` instance to wrap.
   */
  constructor(sheet: CSSStyleSheet) {
    this._sheet = sheet;
  }

  protected _sheet;

  get sheet() {
    return this._sheet;
  }

  /**
   * Returns the number of CSS rules currently defined in the stylesheet.
   * Useful for indexing, iteration, or conditional rule management.
   */
  get length() {
    return this.sheet.cssRules.length;
  }

  /**
   * Inserts a new empty CSS rule into the stylesheet for the given selector.
   * Returns a `CssRule` wrapper for fluent manipulation of the inserted rule.
   *
   * The rule is appended at the end of the current stylesheet (`insertRule()` at index `length`).
   * This is useful for dynamically constructing scoped styles tied to specific selectors.
   *
   * @param selector - The CSS selector to target (e.g., ".btn", "#header", "body > div").
   * @return A `CssRule` instance representing the inserted rule.
   */
  cssRule(selector: string) {
    const index = this.length;
    this.sheet.insertRule(`${selector}{}`, index);
    return new CssRule(index, this.sheet.cssRules.item(index) as CSSStyleRule);
  }

  /**
   * Inserts a new empty `@media` rule into the stylesheet using the provided media query string.
   * Returns a `MediaRule` wrapper for fluent manipulation of the inserted media block.
   *
   * The rule is appended at the end of the current stylesheet (`insertRule()` at index `length`).
   * Useful for dynamically scoping styles to specific viewport conditions or device capabilities.
   *
   * @param mediaText - The media query string (e.g., "screen and (max-width: 600px)").
   * @return A `MediaRule` instance representing the inserted media rule.
   */
  mediaRule(mediaText: string) {
    const index = this.length;
    this.sheet.insertRule(`@media(${mediaText}){}`, index);
    return new MediaRule(
      index,
      this.sheet.cssRules.item(index) as CSSMediaRule
    );
  }

  /**
   * Inserts a new `@media (min-width: …)` rule into the stylesheet.
   * Returns a `MediaRule` wrapper for fluent manipulation of styles targeting wider viewports.
   *
   * Equivalent to: `mediaRule("min-width: 768px")`
   *
   * @param minWidth - The minimum width value (e.g., `768`, `"50em"`, `"80vw"`).
   * @return A `MediaRule` instance representing the inserted media rule.
   */
  mediaMinWidth(minWidth: number | string) {
    return this.mediaRule(`min-width: ${getStyleValue("min-width", minWidth)}`);
  }

  /**
   * Inserts a new `@media (max-width: …)` rule into the stylesheet.
   * Returns a `MediaRule` wrapper for fluent manipulation of styles targeting narrower viewports.
   *
   * Equivalent to: `mediaRule("max-width: 600px")`
   *
   * @param maxWidth - The maximum width value (e.g., `600`, `"40em"`, `"80vw"`).
   * @return A `MediaRule` instance representing the inserted media rule.
   */
  mediaMaxWidth(maxWidth: number | string) {
    return this.mediaRule(`max-width: ${getStyleValue("max-width", maxWidth)}`);
  }

  /**
   * Removes a CSS rule from the stylesheet by its index.
   * Accepts either a `CssRule` or `MediaRule` instance, which internally tracks its position.
   *
   * This is useful for dynamically cleaning up injected styles or media blocks.
   * Note: Rule indices may shift after insertion or deletion — ensure index accuracy before calling.
   *
   * @param rule - The rule instance to remove (`CssRule` or `MediaRule`).
   */
  removeRule(rule: CssRule | MediaRule) {
    this.sheet.deleteRule(rule.index);
  }

  /**
   * Wraps the given `<style>` element in a `StyleSheet` instance.
   * The element must already be attached to a document so that its
   * `sheet` property is available.
   *
   * @param el - The `<style>` element to wrap.
   * @return A `StyleSheet` instance bound to the element’s `CSSStyleSheet`.
   */
  static getSheet(el: HTMLStyleElement): StyleSheet {
    if (!el.sheet) {
      throw new Error(
        "StyleSheet: The provided <style> element has no associated CSSStyleSheet."
      );
    }
    return new StyleSheet(el.sheet as CSSStyleSheet);
  }
}
