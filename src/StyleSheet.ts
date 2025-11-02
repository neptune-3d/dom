import { UNITLESS_CSS_PROPS, VENDOR_CSS_PROPS } from "./constants";
import { MediaRule } from "./MediaRule";
import type { Autocomplete, CssProperties } from "./types";
import { camelToKebab } from "./utils";

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

  get dom() {
    return this._dom;
  }

  get sheet() {
    return this.dom.sheet!;
  }

  get length() {
    return this.sheet.cssRules.length;
  }

  /**
   * Inserts or updates a global CSS rule for a given selector.
   * @param selector - A global class selector (e.g., ".list-item").
   * @param props - The CSS properties to apply.
   */
  globalCss(selector: string, props: CssProperties) {
    const rule = this.getCssRule(selector);
    this.setRuleCss(rule, props);
  }

  /**
   * Inserts or updates a global CSS rule inside a media query.
   * @param mediaText - The media query condition (e.g., "max-width: 600px").
   * @param selector - The global class selector.
   * @param props - The CSS properties to apply.
   */
  globalMediaCss(mediaText: string, selector: string, props: CssProperties) {
    const media = this.getMediaRule(mediaText);
    const rule = media.getCssRule(selector);
    this.setRuleCss(rule, props);
  }

  /**
   * Retrieves or creates a CSSStyleRule for the given selector.
   * If the rule doesn't exist, it is inserted at the end of the stylesheet and cached.
   *
   * This ensures stable indexing and avoids rule override issues caused by shifting positions.
   * The returned rule can be used to modify style declarations programmatically.
   *
   * @param selector - The CSS selector string (e.g., ".button", "#header", "div > span").
   * @return The corresponding CSSStyleRule instance.
   */
  getCssRule(selector: string) {
    const map = this.getCssMap();
    let index = map.get(selector);

    if (index == null) {
      index = this.sheet.cssRules.length;
      this.sheet.insertRule(`${selector}{}`, index);
      map.set(selector, index);
    }

    return this.sheet.cssRules.item(index) as CSSStyleRule;
  }

  deleteCssRule(selector: string) {
    const map = this.getCssMap();
    const index = map.get(selector);

    if (index == null) return;

    this.sheet.deleteRule(index);
    map.delete(selector);
  }

  /**
   * Retrieves or creates a CSSMediaRule for the given media query.
   * If the rule doesn't exist, it is inserted at the end of the stylesheet and cached.
   *
   * This ensures consistent indexing and avoids rule override issues caused by shifting positions.
   *
   * @param mediaText - The media query string (e.g., "screen and (max-width: 600px)").
   * @return A MediaRule wrapper containing the index and CSSMediaRule reference.
   */
  getMediaRule(mediaText: string) {
    const map = this.getMediaMap();
    let m = map.get(mediaText);

    if (!m) {
      const index = this.sheet.cssRules.length;
      this.sheet.insertRule(`@media(${mediaText}){}`, index);
      m = new MediaRule(index, this.sheet.cssRules.item(index) as CSSMediaRule);
      map.set(mediaText, m);
    }

    return m;
  }

  deleteMediaRule(mediaText: string) {
    const map = this.getMediaMap();
    const rule = map.get(mediaText);

    if (rule == null) return;

    this.sheet.deleteRule(rule.index);
    map.delete(mediaText);
  }

  setRuleCss(rule: CSSStyleRule, props: CssProperties) {
    for (const name in props) {
      const isVendor = !!VENDOR_CSS_PROPS[name];
      const _name = camelToKebab(name);

      rule.style.setProperty(
        isVendor ? `-${_name}` : _name,
        this.getStyleValue(name, (props as any)[name])
      );
    }
  }

  getStyleValue(
    name: Autocomplete<keyof CssProperties>,
    value: string | number
  ): string {
    if (typeof value === "number") {
      const isUnitless = !!UNITLESS_CSS_PROPS[name];

      return isUnitless ? String(value) : `${value}px`;
    }

    return value;
  }

  protected getCssMap(): Map<string, number> {
    let map = cssMapCache.get(this.sheet);
    if (!map) {
      map = new Map();
      cssMapCache.set(this.sheet, map);
    }
    return map;
  }

  protected getMediaMap(): Map<string, MediaRule> {
    let map = mediaMapCache.get(this.sheet);
    if (!map) {
      map = new Map();
      mediaMapCache.set(this.sheet, map);
    }
    return map;
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

const cssMapCache = new WeakMap<CSSStyleSheet, Map<string, number>>();
const mediaMapCache = new WeakMap<CSSStyleSheet, Map<string, MediaRule>>();
