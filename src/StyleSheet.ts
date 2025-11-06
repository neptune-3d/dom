import { CssRule } from "./CssRule";
import { MediaRule } from "./MediaRule";

/**
 * Manages a dedicated `<style>` element and provides programmatic access to its CSS rules.
 * Supports dynamic insertion, retrieval, and deletion of both standard and media-specific rules,
 * with internal indexing for fast lookup and reuse.
 *
 * This class ensures a single shared stylesheet instance via `StyleSheet.getSheet()`,
 * and maintains selector-to-index and media-to-rule maps on the global `window` object.
 *
 * Designed for use with component-level styling systems or DOM abstractions that require
 * granular control over rule injection without relying on inline styles.
 */
export class StyleSheet {
  constructor(el: HTMLStyleElement) {
    this._dom = el;
  }

  protected _dom;

  /**
   * Returns the underlying `<style>` DOM element.
   * This element is used to inject and manage dynamic CSS rules.
   */
  get dom() {
    return this._dom;
  }

  /**
   * Returns the associated `CSSStyleSheet` object for this `<style>` element.
   * Provides access to rule-level operations like `insertRule()` and `deleteRule()`.
   * Assumes the sheet is available and attached to the document.
   */
  get sheet() {
    return this.dom.sheet!;
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
    return new CssRule(
      this,
      index,
      this.sheet.cssRules.item(index) as CSSStyleRule
    );
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
      this,
      index,
      this.sheet.cssRules.item(index) as CSSMediaRule
    );
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
   * Retrieves or creates a <style> element with the given ID and wraps it in a StyleSheet instance.
   * If no element with the specified ID exists, a new <style> tag is created, appended to <head>,
   * and assigned the ID. This allows multiple independently managed stylesheets via custom IDs.
   *
   * @param id - Optional ID of the <style> element to target. Defaults to DEFAULT_STYLE_ID.
   * @return A StyleSheet instance bound to the specified <style> element.
   */
  static getSheet(id: string = StyleSheet.DEFAULT_STYLE_ID) {
    const res = document.head.querySelector(`#${id}`);

    if (res == null) {
      const style = document.createElement("style");
      style.id = id;
      style.setAttribute("type", "text/css");
      document.head.append(style);
      return new StyleSheet(style);
    }
    //
    else {
      return new StyleSheet(res as HTMLStyleElement);
    }
  }

  /**
   * The default ID used for the primary stylesheet managed by the StyleSheet class.
   * This ensures consistent lookup and avoids collisions with other style elements in the document.
   */
  static DEFAULT_STYLE_ID = "__neptune-style__";
}
