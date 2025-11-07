import { BaseStyle } from "./BaseStyle";
import type { StyleSheet } from "./StyleSheet";
import type { Autocomplete, CssProperties } from "./types";
import { camelToKebab, getStyleValue } from "./utils";

export class CssRule extends BaseStyle {
  constructor(sheet: StyleSheet, index: number, rule: CSSStyleRule) {
    super();
    this._sheet = sheet;
    this._index = index;
    this._rule = rule;
  }

  protected _sheet: StyleSheet;
  protected _index: number;
  protected _rule: CSSStyleRule;

  /**
   * Returns the StyleSheet instance that owns this rule.
   * Useful for accessing rule management utilities or shared configuration.
   */
  get sheet() {
    return this._sheet;
  }

  /**
   * Returns the index of this rule within its parent stylesheet.
   * This index is stable and used for rule lookup and removal.
   */
  get index() {
    return this._index;
  }

  /**
   * Returns the underlying CSSStyleRule object.
   * Provides direct access to selector text and style declarations.
   */
  get rule() {
    return this._rule;
  }

  /**
   * Returns the selector text of the underlying CSSStyleRule.
   * For example: ".box:hover", "div > span", or ".my-class[data-active]".
   */
  get selectorText(): string {
    return this._rule.selectorText;
  }

  /**
   * Removes this rule from its parent stylesheet.
   * Delegates to the StyleSheet instance to ensure proper cleanup and cache invalidation.
   */
  remove() {
    this._sheet.removeRule(this);
  }

  /**
   * Creates a new `CssRule` by extending this rule’s selector.
   * Appends the given selector fragment to the current selector.
   * Useful for pseudo-classes (e.g., `:hover`), combinators (e.g., ` > span`), or attribute filters (e.g., `[data-active]`).
   *
   * @param extension - The selector fragment to append (e.g., `:hover`, ` > span`, `[data-active]`).
   * @return A new `CssRule` instance targeting the extended selector.
   */
  extend(extension: string): CssRule {
    return this.sheet.cssRule(`${this.selectorText}${extension}`);
  }

  /**
   * Creates a `:hover` rule for this selector.
   * @return A new CssRule instance for the `:hover` state.
   */
  hover(): CssRule {
    return this.extend(":hover");
  }

  /**
   * Creates a `:focus` rule for this selector.
   * @return A new CssRule instance for the `:focus` state.
   */
  focus(): CssRule {
    return this.extend(":focus");
  }

  /**
   * Creates a `:focus-within` rule for this selector.
   * Useful for styling parent containers when any child element receives focus.
   *
   * @return A new CssRule instance for the `:focus-within` state.
   */
  focusWithin(): CssRule {
    return this.extend(":focus-within");
  }

  /**
   * Creates an `:active` rule for this selector.
   * @return A new CssRule instance for the `:active` state.
   */
  active(): CssRule {
    return this.extend(":active");
  }

  /**
   * Creates a `:disabled` rule for this selector.
   * Useful for styling form controls or buttons in a disabled state.
   *
   * @return A new CssRule instance for the `:disabled` state.
   */
  disabled(): CssRule {
    return this.extend(":disabled");
  }

  /**
   * Applies a style property to the underlying CSS rule.
   * Removes the property if `undefined` is passed.
   *
   * @param name - The camelCase CSS property name.
   * @param value - The value to apply, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  protected setStyleProp(
    name: Autocomplete<keyof CssProperties>,
    value: string | number | undefined
  ): this {
    if (value === undefined) {
      this.rule.style.removeProperty(camelToKebab(name));
      return this;
    }

    this.rule.style.setProperty(camelToKebab(name), getStyleValue(name, value));

    return this;
  }
}
