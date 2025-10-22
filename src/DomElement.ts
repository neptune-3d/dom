import type { Property } from "csstype";
import { UNITLESS_CSS_PROPS, VENDOR_CSS_PROPS } from "./constants";
import { StyleSheet } from "./StyleSheet";
import type { CssProperties } from "./types";
import { camelToKebab, uniqueId } from "./utils";

export class DomElement<
  Tag extends keyof HTMLElementTagNameMap = keyof HTMLElementTagNameMap
> {
  constructor(tag: Tag, el?: HTMLElementTagNameMap[Tag]) {
    this.tag = tag;
    this.dom = el ?? document.createElement(tag);
    this.sheet = StyleSheet.getSheet();
    this.cssClassName = uniqueId(tag);
    this.cssMap = new Map<string, { index: number; selector: string }>();

    this.className(this.cssClassName);
  }

  tag;
  dom;
  protected sheet;
  protected cssClassName;
  protected cssMap;

  getText() {
    return this.dom.textContent;
  }

  text(txt: any) {
    this.dom.textContent = String(txt);
    return this;
  }

  add(...nodes: DomElement<any>[]) {
    this.dom.append(...nodes.map((n) => n.dom));
    return this;
  }

  on<T extends keyof HTMLElementEventMap>(
    type: T,
    handler: (
      ev: HTMLElementEventMap[T] & { currentTarget: HTMLElementTagNameMap[Tag] }
    ) => void,
    options?: boolean | AddEventListenerOptions
  ) {
    this.dom.addEventListener(type, handler as any, options);
    return this;
  }

  off<T extends keyof HTMLElementEventMap>(
    type: T,
    handler: (ev: HTMLElementEventMap[T]) => void,
    options?: boolean | EventListenerOptions
  ) {
    return this.dom.removeEventListener(type, handler as any, options);
  }

  attr(obj: Record<string, any>) {
    for (const name in obj) {
      this.dom.setAttribute(name, obj[name]);
    }
    return this;
  }

  props(obj: Record<string, any>) {
    for (const name in obj) {
      const value = obj[name];
      (this.dom as any)[name] = value;
    }
    return this;
  }

  prop(name: string, value: any) {
    (this.dom as any)[name] = value;
    return this;
  }

  getProp(name: string) {
    return (this.dom as any)[name];
  }

  style(obj: CssProperties) {
    for (const name in obj) {
      (this.dom as any).style[name] = this.getStyleValue(
        name,
        (obj as any)[name]
      );
    }
    return this;
  }

  id(value: string) {
    this.dom.id = value;
    return this;
  }

  className(value: string) {
    this.dom.className = value;
    return this;
  }

  htmlFor(value: string) {
    if (this.tag === "label") (this.dom as HTMLLabelElement).htmlFor = value;
    return this;
  }

  p(value: Property.Padding) {
    this.dom.style.padding = this.getStyleValue("padding", value);
    return this;
  }

  pt(value: Property.PaddingTop) {
    this.dom.style.paddingTop = this.getStyleValue("paddingTop", value);
    return this;
  }

  pr(value: Property.PaddingRight) {
    this.dom.style.paddingRight = this.getStyleValue("paddingRight", value);
    return this;
  }

  pb(value: Property.PaddingBottom) {
    this.dom.style.paddingBottom = this.getStyleValue("paddingBottom", value);
    return this;
  }

  pl(value: Property.PaddingLeft) {
    this.dom.style.paddingLeft = this.getStyleValue("paddingLeft", value);
    return this;
  }

  m(value: Property.Margin) {
    this.dom.style.margin = this.getStyleValue("margin", value);
    return this;
  }

  mt(value: Property.MarginTop) {
    this.dom.style.marginTop = this.getStyleValue("paddingTop", value);
    return this;
  }

  mr(value: Property.MarginRight) {
    this.dom.style.marginRight = this.getStyleValue("marginRight", value);
    return this;
  }

  mb(value: Property.MarginBottom) {
    this.dom.style.marginBottom = this.getStyleValue("marginBottom", value);
    return this;
  }

  ml(value: Property.MarginLeft) {
    this.dom.style.marginLeft = this.getStyleValue("marginLeft", value);
    return this;
  }

  display(value: Property.Display) {
    this.dom.style.display = value;
    return this;
  }

  bgColor(value: Property.BackgroundColor) {
    this.dom.style.backgroundColor = value;
    return this;
  }

  color(value: Property.Color) {
    this.dom.style.color = value;
    return this;
  }

  ref(refFn: (el: this) => void) {
    refFn(this);
    return this;
  }

  rootCss(props: CssProperties) {
    return this.css("", props);
  }

  hoverCss(props: CssProperties) {
    return this.css(":hover", props);
  }

  activeCss(props: CssProperties) {
    return this.css(":active", props);
  }

  focusCss(props: CssProperties) {
    return this.css(":focus", props);
  }

  css(selector: string, props: CssProperties) {
    let s = this.cssMap.get(selector);

    if (!s) {
      const index = this.sheet.insert(
        this.sheet.length,
        `.${this.cssClassName}${selector}{}`
      );
      s = { index, selector };
      this.cssMap.set(selector, s);
    }

    const rule = this.sheet.sheet.cssRules.item(s.index) as CSSStyleRule;
    for (const name in props) {
      const isVendor = !!VENDOR_CSS_PROPS[name];
      const _name = camelToKebab(name);

      rule.style.setProperty(
        isVendor ? `-${_name}` : _name,
        this.getStyleValue(name, (props as any)[name])
      );
    }

    return this;
  }

  protected getStyleValue(name: string, value: string | number): string {
    if (typeof value === "number") {
      const isUnitless = !!UNITLESS_CSS_PROPS[name];

      return isUnitless ? String(value) : `${value}px`;
    }
    return value;
  }
}

export function $<T extends keyof HTMLElementTagNameMap>(tag: T) {
  return new DomElement(tag);
}

export function $select<T extends keyof HTMLElementTagNameMap>(
  selector: string
) {
  const el = document.querySelector(selector)!;
  return new DomElement(
    el.tagName.toLowerCase() as T,
    el as HTMLElementTagNameMap[T]
  );
}

export function $wrap<T extends keyof HTMLElementTagNameMap = "div">(
  tag: T,
  ...nodes: DomElement[]
) {
  const container = $(tag);
  return container.add(...nodes);
}
