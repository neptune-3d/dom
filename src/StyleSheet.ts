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

  getCssRule(selector: string) {
    const map = this.getCssMap();
    let index = map.get(selector);

    if (index == null) {
      index = this.sheet.insertRule(`${selector}{}`);
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

  getMediaRule(mediaText: string) {
    const map = this.getMediaMap();
    let m = map.get(mediaText);

    if (!m) {
      const index = this.sheet.insertRule(`@media(${mediaText}){}`);
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

  static getSheet() {
    const res = document.head.querySelector(`#${StyleSheet.STYLE_ID}`);

    if (res == null) {
      const style = document.createElement("style");
      style.id = StyleSheet.STYLE_ID;
      style.setAttribute("type", "text/css");
      document.head.append(style);
      return new StyleSheet(style);
    }
    //
    else {
      return new StyleSheet(res as HTMLStyleElement);
    }
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

  protected getCssMap() {
    let map = (window as any).__neptuneCssMap__;

    if (!map) {
      map = new Map();
      (window as any).__neptuneCssMap__ = map;
    }

    return map as Map<string, number>;
  }

  protected getMediaMap() {
    let map = (window as any).__neptuneMediaMap__;

    if (!map) {
      map = new Map();
      (window as any).__neptuneMediaMap__ = map;
    }

    return map as Map<string, MediaRule>;
  }

  static STYLE_ID = "__neptune-style__";
}
