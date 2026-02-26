import { CssRule } from "./CssRule";
import { MediaRule } from "./MediaRule";
import { getStyleValue } from "./utils";

/**
 * Wrapper around a native `CSSStyleSheet` object.
 *
 * Contains getters and helper methods for manipulating CSS rules.
 */
export class StyleSheet {
  /**
   * Creates a new `StyleSheet` wrapper bound to the given `CSSStyleSheet`.
   *
   * @param sheet The native `CSSStyleSheet` instance to wrap.
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
   */
  get length() {
    return this.sheet.cssRules.length;
  }

  /**
   * Inserts a new empty CSS rule into the stylesheet for the given selector.
   * Returns a `CssRule` wrapper for fluent manipulation of the inserted rule.
   *
   * The rule is appended at the end of the current stylesheet (`insertRule()` at index `length`).
   *
   * @param selector The CSS selector to target (e.g., ".btn", "#header", "body > div").
   * @returns A `CssRule` instance representing the inserted rule.
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
   *
   * @param mediaText - The media query string (e.g., "screen and (max-width: 600px)").
   * @returns A `MediaRule` instance representing the inserted media rule.
   */
  mediaRule(mediaText: string) {
    const index = this.length;
    this.sheet.insertRule(`@media(${mediaText}){}`, index);
    return new MediaRule(
      index,
      this.sheet.cssRules.item(index) as CSSMediaRule,
    );
  }

  /**
   * Inserts a new `@media (min-width: …)` rule into the stylesheet.
   * Returns a `MediaRule` wrapper for fluent manipulation of styles targeting wider viewports.
   *
   * Equivalent to: `mediaRule("min-width: 768px")`
   *
   * @param minWidth - The minimum width value (e.g., `768`, `"50em"`, `"80vw"`).
   * @returns A `MediaRule` instance representing the inserted media rule.
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
   * @returns A `MediaRule` instance representing the inserted media rule.
   */
  mediaMaxWidth(maxWidth: number | string) {
    return this.mediaRule(`max-width: ${getStyleValue("max-width", maxWidth)}`);
  }
  /**
   * Removes a CSS rule from the stylesheet by its index.
   * Accepts either a `CssRule` or `MediaRule` instance, which internally tracks its position.
   *
   * Note: Rule indices may shift after insertion or deletion — ensure index accuracy before calling.
   *
   * @param rule - The rule instance to remove (`CssRule` or `MediaRule`).
   * @returns this instance for chaining.
   */
  removeRule(rule: CssRule | MediaRule): this {
    this.sheet.deleteRule(rule.index);
    return this;
  }

  /**
   * Removes all CSS rules from the stylesheet.
   *
   * @returns this instance for chaining.
   */
  clear(): this {
    while (this.length > 0) {
      this.sheet.deleteRule(0);
    }
    return this;
  }
}

/**
 * Factory to create a new `StyleSheet` object.
 *
 * @param sheet - The native `CSSStyleSheet` instance to wrap.
 * @returns A StyleSheet instance.
 */
export function $sheet(sheet: CSSStyleSheet): StyleSheet {
  return new StyleSheet(sheet);
}
