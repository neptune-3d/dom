import { BaseStyle } from "./BaseStyle";
import { StyleSheet } from "./StyleSheet";
import type { Autocomplete, CssProperties } from "./types";
import { camelToKebab, getStyleValue } from "./utils";

/**
 * Wrapper around a single `CSSStyleRule` within a stylesheet.
 *
 * Provides a fluent, type‑safe API for inspecting and manipulating CSS rules
 * at runtime. Extends `BaseStyle` so you can apply style properties directly
 * to the rule’s declaration block, with automatic normalization and unit
 * handling.
 *
 * Features:
 * - Access to the owning `CSSStyleSheet` via `getSheet()`.
 * - Convenience getters for selector text and direct rule inspection.
 * - Rule management utilities such as `remove()` for cleanup.
 * - Selector extension helpers (`extend`, `hover`, `focus`, `focusWithin`,
 *   `active`, `disabled`) for creating new rules based on pseudo‑classes or
 *   combinators.
 * - Chainable style manipulation via inherited `BaseStyle` methods.
 */
export class CssRule extends BaseStyle {
  /**
   * Creates a new `CssRule` wrapper bound to the given `CSSStyleRule`.
   *
   * The wrapper tracks the rule’s index within its parent stylesheet and
   * provides a fluent API for inspecting and manipulating the selector and
   * its style declarations.
   *
   * @param index - The position of this rule within its parent stylesheet.
   * @param rule - The native `CSSStyleRule` instance to wrap.
   */
  constructor(index: number, rule: CSSStyleRule) {
    super();
    this._index = index;
    this._rule = rule;
  }

  protected _index: number;
  protected _rule: CSSStyleRule;

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
   * Returns a `StyleSheet` wrapper around the parent stylesheet of this rule.
   * Useful for accessing rule management utilities or inserting new rules.
   */
  getSheet(): StyleSheet | null {
    const sheet = this._rule.parentStyleSheet;
    return sheet ? new StyleSheet(sheet) : null;
  }

  /**
   * Removes this rule from its parent stylesheet.
   * Delegates to the StyleSheet instance to ensure proper cleanup and cache invalidation.
   */
  remove() {
    this.getSheet()?.removeRule(this);
  }

  /**
   * Creates a new `CssRule` by extending this rule’s selector.
   * Appends the given selector fragment to the current selector.
   * Useful for pseudo‑classes (e.g., `:hover`), combinators (e.g., ` > span`),
   * or attribute filters (e.g., `[data-active]`).
   *
   * If this rule is not attached to a stylesheet (`parentStyleSheet` is `null`),
   * an error is thrown to indicate that extension is not possible.
   *
   * @param extension - The selector fragment to append (e.g., `:hover`, ` > span`, `[data-active]`).
   * @return A new `CssRule` instance targeting the extended selector.
   * @throws Error if the rule has no parent stylesheet.
   */
  extend(extension: string): CssRule {
    const sheet = this.getSheet();
    if (!sheet) {
      throw new Error(
        `CssRule: Cannot extend selector "${this.selectorText}" — rule is not attached to a stylesheet.`
      );
    }
    return sheet.cssRule(`${this.selectorText}${extension}`);
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
