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
    this._sheet = StyleSheet.getSheet();
  }

  protected _tag;
  protected _dom;
  protected _sheet;
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
   * Inserts one or more DomElements into a parent at the specified index.
   * Each node is inserted sequentially starting from the given index.
   *
   * @param index - The zero-based index at which to start inserting.
   * @param nodes - One or more DomElements to insert.
   * @return This DomElement instance.
   */
  insertAtIndex(index: number, ...nodes: DomElement<any>[]) {
    const children = Array.from(this.dom.children);
    let currentIndex = Math.max(0, Math.min(index, children.length));

    for (const node of nodes) {
      const referenceNode = children[currentIndex] ?? null;
      this.dom.insertBefore(node.dom, referenceNode);
      currentIndex++;
    }

    return this;
  }

  /**
   * Replaces all existing child elements of this DOM node with the provided ones.
   * Internally clears the current children and appends the new nodes in order.
   *
   * @param nodes - One or more DomElement instances to set as children.
   * @return This DomElement instance.
   */
  setChildren(...nodes: DomElement<any>[]) {
    return this.clear().add(...nodes);
  }

  remove() {
    this.dom.remove();
  }

  clear() {
    this._dom.innerHTML = "";
    return this;
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

  protected setStyleProp(
    name: Autocomplete<keyof CssProperties>,
    value: string | number | undefined
  ) {
    if (value === undefined) {
      this.dom.style.removeProperty(name);
      return this;
    }

    this.dom.style.setProperty(
      camelToKebab(name),
      this.getStyleValue(name, value)
    );
    return this;
  }

  p(value: Property.Padding | undefined) {
    return this.setStyleProp("padding", value);
  }

  pt(value: Property.PaddingTop | undefined) {
    return this.setStyleProp("paddingTop", value);
  }

  pr(value: Property.PaddingRight | undefined) {
    return this.setStyleProp("paddingRight", value);
  }

  pb(value: Property.PaddingBottom | undefined) {
    return this.setStyleProp("paddingBottom", value);
  }

  pl(value: Property.PaddingLeft | undefined) {
    return this.setStyleProp("paddingLeft", value);
  }

  px(value: Property.PaddingLeft | undefined) {
    return this.pl(value).pr(value);
  }

  py(value: Property.PaddingTop | undefined) {
    return this.pt(value).pb(value);
  }

  m(value: Property.Margin | undefined) {
    return this.setStyleProp("margin", value);
  }

  mt(value: Property.MarginTop | undefined) {
    return this.setStyleProp("marginTop", value);
  }

  mr(value: Property.MarginRight | undefined) {
    return this.setStyleProp("marginRight", value);
  }

  mb(value: Property.MarginBottom | undefined) {
    return this.setStyleProp("marginBottom", value);
  }

  ml(value: Property.MarginLeft | undefined) {
    return this.setStyleProp("marginLeft", value);
  }

  radius(value: Property.BorderRadius | undefined) {
    return this.setStyleProp("borderRadius", value);
  }

  radiusTopLeft(value: Property.BorderTopLeftRadius | undefined) {
    return this.setStyleProp("borderTopLeftRadius", value);
  }

  radiusTopRight(value: Property.BorderTopRightRadius | undefined) {
    return this.setStyleProp("borderTopRightRadius", value);
  }

  radiusTop(value: Property.BorderTopLeftRadius | undefined) {
    return this.radiusTopLeft(value).radiusTopRight(value);
  }

  display(value: Property.Display | undefined) {
    return this.setStyleProp("display", value);
  }

  flexShrink(value: Property.FlexShrink | undefined) {
    return this.setStyleProp("flexShrink", value);
  }

  flex(value: Property.Flex | undefined) {
    return this.setStyleProp("flex", value);
  }

  bgColor(value: Property.BackgroundColor | undefined) {
    return this.setStyleProp("backgroundColor", value);
  }

  color(value: Property.Color | undefined) {
    return this.setStyleProp("color", value);
  }

  h(value: Property.Height | number | undefined) {
    return this.setStyleProp("height", value);
  }

  w(value: Property.Width | number | undefined) {
    return this.setStyleProp("width", value);
  }

  b(value: Property.Border) {
    return this.setStyleProp("border", value);
  }

  br(value: Property.BorderRight | undefined) {
    return this.setStyleProp("borderRight", value);
  }

  overflow(value: Property.Overflow | undefined) {
    return this.setStyleProp("overflow", value);
  }

  overflowY(value: Property.OverflowY | undefined) {
    return this.setStyleProp("overflowY", value);
  }

  overflowX(value: Property.OverflowX | undefined) {
    return this.setStyleProp("overflowX", value);
  }

  fontSize(value: Property.FontSize | undefined) {
    return this.setStyleProp("fontSize", value);
  }

  fontWeight(value: Property.FontWeight | undefined) {
    return this.setStyleProp("fontWeight", value);
  }

  fontFamily(value: Property.FontFamily | undefined) {
    return this.setStyleProp("fontFamily", value);
  }

  fontStyle(value: Property.FontStyle | undefined) {
    return this.setStyleProp("fontStyle", value);
  }

  textAlign(value: Property.TextAlign | undefined) {
    return this.setStyleProp("textAlign", value);
  }

  textDecoration(value: Property.TextDecoration | undefined) {
    return this.setStyleProp("textDecoration", value);
  }

  pos(value: Property.Position | undefined) {
    return this.setStyleProp("position", value);
  }

  posTop(value: Property.Top | undefined) {
    return this.setStyleProp("top", value);
  }

  posBottom(value: Property.Bottom | undefined) {
    return this.setStyleProp("bottom", value);
  }

  posLeft(value: Property.Left | undefined) {
    return this.setStyleProp("left", value);
  }

  posRight(value: Property.Right | undefined) {
    return this.setStyleProp("right", value);
  }

  cursor(value: Property.Cursor | undefined) {
    return this.setStyleProp("cursor", value);
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

    const rule = this._sheet.getCssRule(`.${this.cssClassName}${selector}`);

    this.setRuleCss(rule, props);

    return this;
  }

  mediaCss(mediaText: string, selector: string, props: CssProperties) {
    this.setCssClassName();

    const mRule = this._sheet.getMediaRule(mediaText);

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
