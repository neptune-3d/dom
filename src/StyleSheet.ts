import { MediaRule } from "./MediaRule";

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

  getCssRule(selector: string) {
    let index = this.getCssMap().get(selector);

    if (index == null) {
      index = this.sheet.insertRule(`${selector}{}`);
    }

    return this.sheet.cssRules.item(index) as CSSStyleRule;
  }

  deleteCssRule(selector: string) {
    const index = this.getCssMap().get(selector);

    if (index == null) return;

    this.sheet.deleteRule(index);
  }

  getMediaRule(mediaText: string) {
    let m = this.getMediaMap().get(mediaText);

    if (!m) {
      const index = this.sheet.insertRule(`@media(${mediaText}){}`);
      m = new MediaRule(this.sheet.cssRules.item(index) as CSSMediaRule);
      this.getMediaMap().set(mediaText, m);
    }

    return m;
  }

  deleteMediaRule(mediaText: string) {
    const index = this.getMediaMap().get(mediaText);

    if (index == null) return;

    this.sheet.deleteRule(index);
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

    return map;
  }

  static STYLE_ID = "__neptune-style__";
}
