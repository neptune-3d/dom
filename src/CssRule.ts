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
