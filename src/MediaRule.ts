import { CssRule } from "./CssRule";
import { StyleSheet } from "./StyleSheet";

/**
 * Wrapper around a single `CSSMediaRule` within a stylesheet.
 *
 * Provides a fluent, type‑safe API for inspecting and manipulating `@media` blocks
 * at runtime. Designed for dynamic styling systems where media queries and their
 * nested rules need to be created, extended, or removed programmatically.
 *
 * Features:
 * - Access to the underlying `CSSMediaRule` object via `rule`.
 * - Convenience getters for index, length, and `mediaText`.
 * - Ability to insert new nested `CssRule` instances inside the media block.
 * - Removal utilities for both the media rule itself (`remove()`) and its nested rules (`removeRule()`).
 * - Integration with `StyleSheet` via `getSheet()` to navigate back to the parent stylesheet.
 *
 * Typical usage:
 * ```ts
 * const sheet = StyleSheet.getSheet(styleEl);
 * const media = sheet.mediaRule("screen and (max-width: 600px)");
 *
 * media.cssRule(".box").style({ display: "none" });
 * media.removeRule(someNestedRule);
 * ```
 *
 * Notes:
 * - If the media rule is detached from a stylesheet (`parentStyleSheet` is `null`),
 *   methods like `getSheet()` and `remove()` will return `null` or no‑op.
 * - Nested rules are managed by index; indices may shift after insertion or deletion.
 */
export class MediaRule {
  /**
   * Creates a new `MediaRule` wrapper bound to the given `CSSMediaRule`.
   *
   * The wrapper tracks the rule’s index within its parent stylesheet and
   * provides a fluent API for inspecting and manipulating the media block.
   *
   * @param index - The position of this media rule within its parent stylesheet.
   * @param rule - The native `CSSMediaRule` instance to wrap.
   */
  constructor(index: number, rule: CSSMediaRule) {
    this._index = index;
    this._rule = rule;
  }

  protected _index: number;
  protected _rule: CSSMediaRule;

  /**
   * Returns the index of this media rule within its parent stylesheet.
   * This index is used for rule lookup, insertion, and removal.
   */
  get index() {
    return this._index;
  }

  /**
   * Returns the underlying CSSMediaRule object.
   * Provides direct access to the media query and its nested CSS rules.
   */
  get rule() {
    return this._rule;
  }

  /**
   * Returns the number of CSS rules contained within this media block.
   * Useful for determining insertion index or iterating over nested rules.
   */
  get length() {
    return this._rule.cssRules.length;
  }

  /**
   * Returns the media query string associated with this rule.
   * For example: "screen and (max-width: 600px)".
   */
  get mediaText() {
    return this._rule.media.mediaText;
  }

  /**
   * Returns a `StyleSheet` wrapper around the parent stylesheet of this rule.
   * Useful for accessing rule management utilities or inserting new rules.
   */
  getSheet(): StyleSheet | null {
    const sheet = this._rule.parentStyleSheet;
    return sheet ? new StyleSheet(sheet) : null;
  }

  /**
   * Inserts a new CSSStyleRule into this media block at the end of its rule list.
   * The rule is created with an empty declaration block and wrapped in a CssRule instance for programmatic styling.
   *
   * For example, calling `cssRule(".box:hover")` will generate:
   * ```css
   * @media ... {
   *   .box:hover {}
   * }
   * ```
   *
   * @param selector - The CSS selector to target (e.g., ".box", ":hover", "div > span").
   * @return A CssRule instance representing the newly inserted rule.
   */
  cssRule(selector: string) {
    const index = this.length;
    this.rule.insertRule(`${selector}{}`, index);
    return new CssRule(index, this.rule.cssRules.item(index) as CSSStyleRule);
  }

  /**
   * Removes this rule from its parent stylesheet.
   * Delegates to the StyleSheet instance to ensure proper cleanup and cache invalidation.
   */
  remove() {
    this.getSheet()?.removeRule(this);
  }

  /**
   * Removes a nested CSSStyleRule from this media block.
   * Uses the rule's index to delete it from the internal rule list.
   *
   * @param rule - The CssRule instance to remove from this media query block.
   */
  removeRule(rule: CssRule) {
    this.rule.deleteRule(rule.index);
  }
}
