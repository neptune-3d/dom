import type { Property } from "csstype";
import { UNITLESS_CSS_PROPS, VENDOR_CSS_PROPS } from "./constants";
import { StyleSheet } from "./StyleSheet";
import type { Autocomplete, CssProperties } from "./types";
import { camelToKebab, uniqueId } from "./utils";

export class DomElement<
  Tag extends keyof HTMLElementTagNameMap = keyof HTMLElementTagNameMap
> {
  constructor(tag: Tag, el?: HTMLElementTagNameMap[Tag]) {
    this._tag = tag;
    this._dom = el ?? document.createElement(tag);
    this.sheet = StyleSheet.getSheet();
  }

  protected _tag;
  protected _dom;
  protected sheet;
  protected _cssClassName: string | undefined;
  protected _userClassName: string | undefined;

  get tag() {
    return this._tag;
  }

  get dom() {
    return this._dom;
  }

  get cssClassName() {
    if (!this._cssClassName) {
      this._cssClassName = uniqueId(this.tag);
    }

    return this._cssClassName;
  }

  getText() {
    return this._dom.textContent;
  }

  text(txt: any) {
    this._dom.textContent = String(txt);
    return this;
  }

  add(...nodes: DomElement<any>[]) {
    this._dom.append(...nodes.map((n) => n._dom));
    return this;
  }

  /**
   * Inserts one or more DOM elements into a parent at the specified index.
   * Each node is inserted sequentially starting from the given index.
   *
   * @param index - The zero-based index at which to start inserting.
   * @param nodes - One or more DomElements to insert.
   */
  insertAtIndex(index: number, ...nodes: DomElement<any>[]): void {
    const children = Array.from(this.dom.children);
    let currentIndex = Math.max(0, Math.min(index, children.length));

    for (const node of nodes) {
      const referenceNode = children[currentIndex] ?? null;
      this.dom.insertBefore(node.dom, referenceNode);
      currentIndex++;
    }
  }

  remove() {
    this.dom.remove();
  }

  on<T extends keyof HTMLElementEventMap>(
    type: T,
    handler: (
      ev: HTMLElementEventMap[T] & { currentTarget: HTMLElementTagNameMap[Tag] }
    ) => void,
    options?: boolean | AddEventListenerOptions
  ) {
    this._dom.addEventListener(type, handler as any, options);
    return this;
  }

  off<T extends keyof HTMLElementEventMap>(
    type: T,
    handler: (ev: HTMLElementEventMap[T]) => void,
    options?: boolean | EventListenerOptions
  ) {
    return this._dom.removeEventListener(type, handler as any, options);
  }

  attr(obj: Record<string, any>) {
    for (const name in obj) {
      this._dom.setAttribute(name, obj[name]);
    }
    return this;
  }

  props(obj: Record<string, any>) {
    for (const name in obj) {
      const value = obj[name];
      (this._dom as any)[name] = value;
    }
    return this;
  }

  prop(name: string, value: any) {
    (this._dom as any)[name] = value;
    return this;
  }

  getProp(name: string) {
    return (this._dom as any)[name];
  }

  style(obj: CssProperties) {
    for (const name in obj) {
      (this._dom as any).style[name] = this.getStyleValue(
        name,
        (obj as any)[name]
      );
    }
    return this;
  }

  id(value: string) {
    this._dom.id = value;
    return this;
  }

  className(value: string) {
    this._userClassName = value;

    this._dom.className = this._cssClassName
      ? `${value} ${this.cssClassName}`
      : value;
    return this;
  }

  htmlFor(value: string) {
    if (this._tag === "label") (this._dom as HTMLLabelElement).htmlFor = value;
    return this;
  }

  p(value: Property.Padding) {
    this._dom.style.padding = this.getStyleValue("padding", value);
    return this;
  }

  pt(value: Property.PaddingTop) {
    this._dom.style.paddingTop = this.getStyleValue("paddingTop", value);
    return this;
  }

  pr(value: Property.PaddingRight) {
    this._dom.style.paddingRight = this.getStyleValue("paddingRight", value);
    return this;
  }

  pb(value: Property.PaddingBottom) {
    this._dom.style.paddingBottom = this.getStyleValue("paddingBottom", value);
    return this;
  }

  pl(value: Property.PaddingLeft) {
    this._dom.style.paddingLeft = this.getStyleValue("paddingLeft", value);
    return this;
  }

  px(value: Property.PaddingLeft) {
    return this.pl(value).pr(value);
  }

  py(value: Property.PaddingTop) {
    return this.pt(value).pb(value);
  }

  m(value: Property.Margin) {
    this._dom.style.margin = this.getStyleValue("margin", value);
    return this;
  }

  mt(value: Property.MarginTop) {
    this._dom.style.marginTop = this.getStyleValue("paddingTop", value);
    return this;
  }

  mr(value: Property.MarginRight) {
    this._dom.style.marginRight = this.getStyleValue("marginRight", value);
    return this;
  }

  mb(value: Property.MarginBottom) {
    this._dom.style.marginBottom = this.getStyleValue("marginBottom", value);
    return this;
  }

  ml(value: Property.MarginLeft) {
    this._dom.style.marginLeft = this.getStyleValue("marginLeft", value);
    return this;
  }

  br(value: Property.BorderRadius) {
    this._dom.style.borderRadius = this.getStyleValue("borderRadius", value);
    return this;
  }

  brTop(value: Property.BorderTopLeftRadius) {
    this._dom.style.borderTopLeftRadius = this.getStyleValue(
      "borderTopLeftRadius",
      value
    );
    this._dom.style.borderTopRightRadius = this.getStyleValue(
      "borderTopRightRadius",
      value
    );
    return this;
  }

  display(value: Property.Display | undefined) {
    if (value === undefined) {
      this.dom.style.removeProperty("display");
      return this;
    }

    this.dom.style.display = value;
    return this;
  }

  flexShrink(value: Property.FlexShrink) {
    this.dom.style.flexShrink = this.getStyleValue("flexShrink", value);
    return this;
  }

  flex(value: Property.Flex) {
    this.dom.style.flex = this.getStyleValue("flex", value);
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

  h(value: Property.Height | number) {
    this.dom.style.height = this.getStyleValue("height", value);
    return this;
  }

  w(value: Property.Width | number) {
    this.dom.style.width = this.getStyleValue("width", value);
    return this;
  }

  b(value: Property.Border) {
    this.dom.style.border = this.getStyleValue("border", value);
    return this;
  }

  overflow(value: Property.Overflow) {
    this.dom.style.overflow = value;
    return this;
  }

  overflowY(value: Property.OverflowY) {
    this.dom.style.overflowY = value;
    return this;
  }

  overflowX(value: Property.OverflowX) {
    this.dom.style.overflowX = value;
    return this;
  }

  fontSize(value: Property.FontSize) {
    this.dom.style.fontSize = this.getStyleValue("fontSize", value);
    return this;
  }

  fontWeight(value: Property.FontWeight) {
    this.dom.style.fontWeight = this.getStyleValue("fontWeight", value);
    return this;
  }

  fontFamily(value: Property.FontFamily) {
    this.dom.style.fontFamily = this.getStyleValue("fontFamily", value);
    return this;
  }

  fontStyle(value: Property.FontStyle) {
    this.dom.style.fontStyle = this.getStyleValue("fontStyle", value);
    return this;
  }

  textAlign(value: Property.TextAlign) {
    this.dom.style.textAlign = value;
    return this;
  }

  textDecoration(value: Property.TextDecoration) {
    this.dom.style.textDecoration = this.getStyleValue("textDecoration", value);
    return this;
  }

  pos(value: Property.Position) {
    this.dom.style.position = value;
    return this;
  }

  posTop(value: Property.Top) {
    this.dom.style.top = this.getStyleValue("top", value);
    return this;
  }

  posBottom(value: Property.Bottom) {
    this.dom.style.bottom = this.getStyleValue("bottom", value);
    return this;
  }

  posLeft(value: Property.Left) {
    this.dom.style.left = this.getStyleValue("left", value);
    return this;
  }

  posRight(value: Property.Right) {
    this.dom.style.right = this.getStyleValue("right", value);
    return this;
  }

  cursor(value: Property.Cursor) {
    this._dom.style.cursor = value;
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

  protected setCssClassName() {
    this.dom.className = this._userClassName
      ? `${this._userClassName} ${this.cssClassName}`
      : this.cssClassName;

    return this;
  }

  protected setRuleCss(rule: CSSStyleRule, props: CssProperties) {
    for (const name in props) {
      const isVendor = !!VENDOR_CSS_PROPS[name];
      const _name = camelToKebab(name);

      rule.style.setProperty(
        isVendor ? `-${_name}` : _name,
        this.getStyleValue(name, (props as any)[name])
      );
    }
  }

  css(selector: string, props: CssProperties) {
    this.setCssClassName();

    const rule = this.sheet.getCssRule(`.${this.cssClassName}${selector}`);

    this.setRuleCss(rule, props);

    return this;
  }

  mediaCss(mediaText: string, selector: string, props: CssProperties) {
    this.setCssClassName();

    const mRule = this.sheet.getMediaRule(mediaText);

    const rule = mRule.getCssRule(`.${this.cssClassName}${selector}`);

    this.setRuleCss(rule, props);

    return this;
  }

  mediaRootCss(mediaText: string, props: CssProperties) {
    return this.mediaCss(mediaText, "", props);
  }

  minWidthCss(minWidth: number | string, props: CssProperties) {
    return this.mediaCss(
      `min-width:${this.getStyleValue("width", minWidth)}`,
      "",
      props
    );
  }

  maxWidthCss(maxWidth: number | string, props: CssProperties) {
    return this.mediaCss(
      `max-width:${this.getStyleValue("width", maxWidth)}`,
      "",
      props
    );
  }

  clear() {
    this._dom.innerHTML = "";
  }

  protected getStyleValue(
    name: Autocomplete<keyof CssProperties>,
    value: string | number
  ): string {
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
