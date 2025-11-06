import { CssRule } from "./CssRule";
import type { StyleSheet } from "./StyleSheet";

export class MediaRule {
  constructor(sheet: StyleSheet, index: number, rule: CSSMediaRule) {
    this._sheet = sheet;
    this._index = index;
    this._rule = rule;
  }

  protected _sheet: StyleSheet;
  protected _index: number;
  protected _rule: CSSMediaRule;

  /**
   * Returns the StyleSheet instance that owns this media rule.
   * Useful for accessing shared rule management and stylesheet-level operations.
   */
  get sheet() {
    return this._sheet;
  }

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
    return new CssRule(
      this.sheet,
      index,
      this.rule.cssRules.item(index) as CSSStyleRule
    );
  }

  /**
   * Removes this media rule from its parent stylesheet.
   * Delegates to the StyleSheet instance, which handles cleanup and index management.
   */
  remove() {
    this.sheet.removeRule(this);
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
