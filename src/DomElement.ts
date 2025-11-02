import type { Property } from "csstype";
import { SVG_TAGS, TAG_ALIAS, type TagAlias } from "./constants";
import { StyleSheet } from "./StyleSheet";
import type {
  Autocomplete,
  CssProperties,
  DomElementChild,
  DomElementEventMap,
  DomElementTagNameMap,
} from "./types";
import { camelToKebab, uniqueId } from "./utils";

/**
 * A unified wrapper for HTML and SVG elements that provides a fluent, type-safe API
 * for DOM manipulation, styling, and event handling.
 *
 * Supports both `HTMLElementTagNameMap` and `SVGElementTagNameMap` via the generic `Tag`,
 * and automatically handles namespace creation for SVG elements.
 *
 * Provides ergonomic methods for setting styles, attributes, classes, and event listeners,
 * while abstracting away platform-specific quirks (e.g., `className` vs `setAttribute("class")`).
 *
 * @template Tag - The tag name of the element, inferred from `DomElementTagNameMap`.
 */
export class DomElement<
  Tag extends keyof DomElementTagNameMap = keyof DomElementTagNameMap
> {
  /**
   * Creates a new DomElement instance for the specified tag.
   * Automatically detects whether the tag is an SVG element and uses the appropriate namespace.
   * Optionally wraps an existing DOM element instead of creating a new one.
   *
   * @param tag - The tag name of the element (e.g., "div", "circle", "svg").
   * @param el - An optional existing DOM element to wrap. If omitted, a new element is created.
   */
  constructor(tag: Tag, el?: DomElementTagNameMap[Tag]) {
    const alias = (TAG_ALIAS as any)[tag];

    this._tag = (alias ?? tag) as Tag extends keyof TagAlias
      ? TagAlias[Tag]
      : Tag;

    this._isSvg = SVG_TAGS.includes(this._tag);

    this._dom =
      el ??
      ((this._isSvg
        ? document.createElementNS("http://www.w3.org/2000/svg", this._tag)
        : document.createElement(this._tag)) as DomElementTagNameMap[Tag]);

    this._sheet = StyleSheet.getSheet();
  }

  protected _tag;
  protected _isSvg;
  protected _dom;
  protected _sheet;
  protected _cssClassName: string | undefined;
  protected _userClassName: string | undefined;

  /**
   * Gets the tag name of the element (e.g., "div", "svg", "circle").
   */
  get tag() {
    return this._tag;
  }

  /**
   * Indicates whether the element is an SVG element.
   * Returns `true` for tags like "svg", "circle", "path", etc.
   */
  get isSvg() {
    return this._isSvg;
  }

  /**
   * Gets the underlying DOM element instance.
   * This will be either an `HTMLElement` or `SVGElement` depending on the tag.
   */
  get dom() {
    return this._dom;
  }

  get cssClassName() {
    if (!this._cssClassName) {
      this._cssClassName = uniqueId();
    }

    return this._cssClassName;
  }

  getText() {
    return this._dom.textContent;
  }

  /**
   * Sets or clears the text content of the element.
   * Converts any value to a string before assignment.
   * Passing `undefined` or `null` removes the text by setting it to an empty string.
   *
   * @param value - The text content to set, or `undefined`/`null` to clear it.
   * @return This DomElement instance for chaining.
   */
  text(value: any) {
    this._dom.textContent = value == null ? "" : String(value);
    return this;
  }

  /**
   * Appends one or more child nodes to the element.
   * Accepts DomElement instances, regular DOM Nodes, strings, or numbers.
   *
   * - Strings and numbers are coerced to text nodes.
   * - DomElement instances are unwrapped to their native DOM nodes.
   * - DOM Nodes are appended directly.
   *
   * @param nodes - One or more child elements or text values to append.
   * @return This DomElement instance for chaining.
   */
  add(...nodes: DomElementChild[]) {
    this._dom.append(...nodes.map((n) => this.resolveNode(n)));
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
  insertAtIndex(index: number, ...nodes: DomElementChild[]) {
    const children = Array.from(this.dom.children);
    let currentIndex = Math.max(0, Math.min(index, children.length));

    for (const node of nodes) {
      const referenceNode = children[currentIndex] ?? null;
      this.dom.insertBefore(this.resolveNode(node), referenceNode);
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
  setChildren(...nodes: DomElementChild[]) {
    return this.clear().add(...nodes);
  }

  /**
   * Replaces child elements starting from the specified index with the provided nodes.
   * All children before the index are preserved.
   *
   * @param index - The zero-based index at which replacement begins.
   * @param nodes - One or more DomElement instances to insert.
   * @return This DomElement instance.
   */
  setChildrenFromIndex(index: number, ...nodes: DomElementChild[]) {
    const children = Array.from(this._dom.children);
    const len = children.length;
    const clampedIndex = Math.max(0, Math.min(index, len));

    // Remove all children from index onward
    for (let i = clampedIndex; i < len; i++) {
      this._dom.removeChild(children[i]);
    }

    // Insert new nodes at the clamped index
    const referenceNode = this._dom.children[clampedIndex] ?? null;
    for (const node of nodes) {
      this._dom.insertBefore(this.resolveNode(node), referenceNode);
    }

    return this;
  }

  /**
   * Removes the element from the DOM tree.
   * Equivalent to calling `element.remove()` on the native DOM node.
   *
   * This does not dispose internal state or event listeners — use `dispose()` if cleanup is needed.
   *
   * @return This DomElement instance for chaining.
   */
  remove() {
    this.dom.remove();
  }

  /**
   * Removes child elements within the specified index range.
   * If no range is provided, removes all children.
   *
   * @param from - The starting index (inclusive). Defaults to 0.
   * @param to - The ending index (exclusive). Defaults to all children.
   * @returns This DomElement instance.
   */
  clear(from?: number, to?: number) {
    const children = Array.from(this._dom.children);
    const start = Math.max(0, from ?? 0);
    const end = Math.min(children.length, to ?? children.length);

    for (let i = start; i < end; i++) {
      this._dom.removeChild(children[i]);
    }

    return this;
  }

  /**
   * Adds an event listener to the element.
   * Supports both HTML and SVG elements.
   * @param type - The event type (e.g., "click", "input", "mouseenter").
   * @param handler - The event handler function.
   * @param options - Optional event listener options.
   * @return This DomElement instance for chaining.
   */
  on<T extends keyof DomElementEventMap>(
    type: T,
    handler: (
      ev: DomElementEventMap[T] & { currentTarget: DomElementTagNameMap[Tag] }
    ) => void,
    options?: boolean | AddEventListenerOptions
  ) {
    this._dom.addEventListener(type, handler as any, options);
    return this;
  }

  /**
   * Removes an event listener from the element.
   * Supports both HTML and SVG elements.
   * @param type - The event type to remove.
   * @param handler - The original handler function.
   * @param options - Optional event listener options.
   */
  off<T extends keyof DomElementEventMap>(
    type: T,
    handler: (ev: DomElementEventMap[T]) => void,
    options?: boolean | EventListenerOptions
  ) {
    this._dom.removeEventListener(type, handler as any, options);
  }

  /**
   * Retrieves the value of a single attribute.
   * @param name - The attribute name to read (e.g. "aria-label", "role").
   * @return The attribute value as a string, or null if not present.
   */
  getAttr(name: string): string | null {
    return this.dom.getAttribute(name);
  }

  /**
   * Sets a single attribute on the element.
   * @param name - The attribute name (e.g. "aria-label", "role", "disabled").
   * @param value - The attribute value. If undefined, the attribute is removed.
   * @return This DomElement instance for chaining.
   */
  attr(name: string, value: string | number | boolean | undefined) {
    if (value === undefined) {
      this.dom.removeAttribute(name);
    }
    //
    else {
      this.dom.setAttribute(name, String(value));
    }
    return this;
  }

  /**
   * Sets multiple attributes on the element.
   * @param attributes - An object mapping attribute names to values.
   *                     Attributes with undefined values are removed.
   * @return This DomElement instance for chaining.
   */
  attrs(attributes: Record<string, string | number | boolean | undefined>) {
    for (const [key, value] of Object.entries(attributes)) {
      this.attr(key, value);
    }
    return this;
  }

  /**
   * Retrieves the value of a single property.
   * @param name - The property name to read (e.g. "value", "checked", "disabled").
   * @return The property value, or undefined if not present.
   */
  getProp(name: string): any {
    return (this.dom as any)[name];
  }

  /**
   * Sets a single property on the element.
   * @param name - The property name (e.g. "checked", "value", "disabled").
   * @param value - The property value. If undefined, the property is deleted.
   * @return This DomElement instance for chaining.
   */
  prop(name: string, value: any) {
    (this.dom as any)[name] = value;
    return this;
  }

  /**
   * Sets multiple properties on the element.
   * @param props - An object mapping property names to values.
   *                     Properties with undefined values are deleted.
   * @return This DomElement instance for chaining.
   */
  props(props: Record<string, any>) {
    for (const [key, value] of Object.entries(props)) {
      this.prop(key, value);
    }
    return this;
  }

  /**
   * Applies a batch of CSS style properties to the element.
   * Delegates each property to `setStyleProp`, which handles value normalization and kebab-case conversion.
   *
   * - Properties with `undefined` values are removed from the inline style.
   * - Numeric values are passed through the style sheet for unit resolution.
   * - Supports chainable usage for fluent DOM composition.
   *
   * @param props - A partial map of CSS properties and their values.
   * @returns This DomElement instance for chaining.
   */
  style(props: CssProperties) {
    for (const name of Object.keys(props)) {
      this.setStyleProp(name, (props as any)[name]);
    }
    return this;
  }

  /**
   * Sets or removes the `id` of the element.
   * Passing `undefined` clears the ID by setting it to an empty string.
   *
   * @param value - The element's ID, or `undefined` to remove it.
   * @return This DomElement instance for chaining.
   */
  id(value: string | undefined) {
    this._dom.id = value ?? "";
    return this;
  }

  /**
   * Sets or removes the user-defined class name and applies it alongside the internal CSS class.
   * Uses `setAttribute("class", ...)` for both HTML and SVG elements.
   *
   * Passing `undefined` removes the user-defined class name entirely.
   *
   * @param value - The user-defined class name, or `undefined` to remove it.
   * @return This DomElement instance for chaining.
   */
  className(value: string | undefined) {
    this._userClassName = value ?? "";

    const fullClass = this._cssClassName
      ? `${this._userClassName} ${this.cssClassName}`.trim()
      : this._userClassName;

    this.dom.setAttribute("class", fullClass);

    return this;
  }

  /**
   * Sets or removes the `htmlFor` property on a <label> element.
   * This links the label to a form control by its ID.
   *
   * Passing `undefined` removes the association.
   * Has no effect if the element is not a <label>.
   *
   * @param value - The ID of the target form control, or `undefined` to remove it.
   * @return This DomElement instance for chaining.
   */
  htmlFor(value: string | undefined) {
    if (this.tag === "label") {
      (this.dom as HTMLLabelElement).htmlFor = value ?? "";
    }
    return this;
  }

  /**
   * Sets or removes the `title` attribute on the element.
   * Applies to both HTML and SVG elements. Passing `undefined` removes the attribute.
   *
   * @param value - The tooltip text to show on hover, or `undefined` to remove it.
   * @return This DomElement instance for chaining.
   */
  title(value: string | undefined) {
    if (value === undefined) {
      this.dom.removeAttribute("title");
    }
    //
    else {
      this.dom.setAttribute("title", value);
    }

    return this;
  }

  /**
   * Sets or removes the `disabled` attribute on the element.
   * Applicable to form controls like <button>, <input>, <select>, etc.
   *
   * @param value - If true, sets the `disabled` attribute; if false, removes it.
   * @return This DomElement instance for chaining.
   */
  disabled(value: boolean) {
    if (value) {
      this.dom.setAttribute("disabled", "");
    }
    //
    else {
      this.dom.removeAttribute("disabled");
    }

    return this;
  }

  /**
   * Sets the `disabled` attribute to disable the element.
   * Applicable to form controls like <button>, <input>, <select>, etc.
   * @return This DomElement instance for chaining.
   */
  disable() {
    return this.disabled(true);
  }

  /**
   * Removes the `disabled` attribute to enable the element.
   * @return This DomElement instance for chaining.
   */
  enable() {
    return this.disabled(false);
  }

  /**
   * Sets or clears the `padding` style of the element.
   * Accepts any valid CSS padding shorthand (e.g., "10px", "1em 2em").
   * Passing `undefined` removes the padding style.
   *
   * @param value - The padding value to apply, or `undefined` to remove it.
   * @return This DomElement instance for chaining.
   */
  p(value: Property.Padding | undefined) {
    return this.setStyleProp("padding", value);
  }

  /**
   * Sets or clears the `padding-top` style of the element.
   * Accepts any valid CSS value (e.g., "10px", "1em").
   * Passing `undefined` removes the top padding.
   *
   * @param value - The top padding value to apply, or `undefined` to remove it.
   * @return This DomElement instance for chaining.
   */
  pt(value: Property.PaddingTop | undefined) {
    return this.setStyleProp("paddingTop", value);
  }

  /**
   * Sets or clears the `padding-right` style of the element.
   * Accepts any valid CSS value (e.g., "10px", "1em").
   * Passing `undefined` removes the right padding.
   *
   * @param value - The right padding value to apply, or `undefined` to remove it.
   * @return This DomElement instance for chaining.
   */
  pr(value: Property.PaddingRight | undefined) {
    return this.setStyleProp("paddingRight", value);
  }

  /**
   * Sets or clears the `padding-bottom` style of the element.
   * Accepts any valid CSS value (e.g., "10px", "1em").
   * Passing `undefined` removes the bottom padding.
   *
   * @param value - The bottom padding value to apply, or `undefined` to remove it.
   * @return This DomElement instance for chaining.
   */
  pb(value: Property.PaddingBottom | undefined) {
    return this.setStyleProp("paddingBottom", value);
  }

  /**
   * Sets or clears the `padding-left` style of the element.
   * Accepts any valid CSS value (e.g., "10px", "1em").
   * Passing `undefined` removes the left padding.
   *
   * @param value - The left padding value to apply, or `undefined` to remove it.
   * @return This DomElement instance for chaining.
   */
  pl(value: Property.PaddingLeft | undefined) {
    return this.setStyleProp("paddingLeft", value);
  }

  /**
   * Sets or clears horizontal padding (`padding-left` and `padding-right`) simultaneously.
   * Accepts any valid CSS value (e.g., "10px", "1em").
   * Passing `undefined` removes both left and right padding.
   *
   * @param value - The horizontal padding value to apply, or `undefined` to remove it.
   * @return This DomElement instance for chaining.
   */
  px(value: Property.PaddingLeft | undefined) {
    return this.pl(value).pr(value);
  }

  /**
   * Sets or clears vertical padding (`padding-top` and `padding-bottom`) simultaneously.
   * Accepts any valid CSS value (e.g., "10px", "1em").
   * Passing `undefined` removes both top and bottom padding.
   *
   * @param value - The vertical padding value to apply, or `undefined` to remove it.
   * @return This DomElement instance for chaining.
   */
  py(value: Property.PaddingTop | undefined) {
    return this.pt(value).pb(value);
  }

  /**
   * Sets or clears the `margin` style of the element.
   * Accepts any valid CSS margin shorthand (e.g., "10px", "1em 2em").
   * Passing `undefined` removes the margin style.
   *
   * @param value - The margin value to apply, or `undefined` to remove it.
   * @return This DomElement instance for chaining.
   */
  m(value: Property.Margin | undefined) {
    return this.setStyleProp("margin", value);
  }

  /**
   * Sets or clears the `margin-top` style of the element.
   * Accepts any valid CSS value (e.g., "10px", "auto").
   * Passing `undefined` removes the top margin.
   *
   * @param value - The top margin value to apply, or `undefined` to remove it.
   * @return This DomElement instance for chaining.
   */
  mt(value: Property.MarginTop | undefined) {
    return this.setStyleProp("marginTop", value);
  }

  /**
   * Sets or clears the `margin-right` style of the element.
   * Accepts any valid CSS value (e.g., "10px", "auto").
   * Passing `undefined` removes the right margin.
   *
   * @param value - The right margin value to apply, or `undefined` to remove it.
   * @return This DomElement instance for chaining.
   */
  mr(value: Property.MarginRight | undefined) {
    return this.setStyleProp("marginRight", value);
  }

  /**
   * Sets or clears the `margin-bottom` style of the element.
   * Accepts any valid CSS value (e.g., "10px", "auto").
   * Passing `undefined` removes the bottom margin.
   *
   * @param value - The bottom margin value to apply, or `undefined` to remove it.
   * @return This DomElement instance for chaining.
   */
  mb(value: Property.MarginBottom | undefined) {
    return this.setStyleProp("marginBottom", value);
  }

  /**
   * Sets or clears the `margin-left` style of the element.
   * Accepts any valid CSS value (e.g., "10px", "auto").
   * Passing `undefined` removes the left margin.
   *
   * @param value - The left margin value to apply, or `undefined` to remove it.
   * @return This DomElement instance for chaining.
   */
  ml(value: Property.MarginLeft | undefined) {
    return this.setStyleProp("marginLeft", value);
  }

  /**
   * Sets the overall border radius.
   * @param value - The CSS border-radius value (e.g., "8px", "50%").
   * @return This DomElement instance for chaining.
   */
  radius(value: Property.BorderRadius | undefined) {
    return this.setStyleProp("borderRadius", value);
  }

  /**
   * Sets the top-left corner border radius.
   * @param value - The CSS border-top-left-radius value.
   * @return This DomElement instance for chaining.
   */
  radiusTopLeft(value: Property.BorderTopLeftRadius | undefined) {
    return this.setStyleProp("borderTopLeftRadius", value);
  }

  /**
   * Sets the top-right corner border radius.
   * @param value - The CSS border-top-right-radius value.
   * @return This DomElement instance for chaining.
   */
  radiusTopRight(value: Property.BorderTopRightRadius | undefined) {
    return this.setStyleProp("borderTopRightRadius", value);
  }

  /**
   * Sets the bottom-left corner border radius.
   * @param value - The CSS border-bottom-left-radius value.
   * @return This DomElement instance for chaining.
   */
  radiusBottomLeft(value: Property.BorderBottomLeftRadius | undefined) {
    return this.setStyleProp("borderBottomLeftRadius", value);
  }

  /**
   * Sets the bottom-right corner border radius.
   * @param value - The CSS border-bottom-right-radius value.
   * @return This DomElement instance for chaining.
   */
  radiusBottomRight(value: Property.BorderBottomRightRadius | undefined) {
    return this.setStyleProp("borderBottomRightRadius", value);
  }

  /**
   * Sets the border radius for both top corners.
   * @param value - The CSS border-radius value to apply to top-left and top-right corners.
   * @return This DomElement instance for chaining.
   */
  radiusTop(value: Property.BorderTopLeftRadius | undefined) {
    return this.radiusTopLeft(value).radiusTopRight(value);
  }

  /**
   * Sets the border radius for both bottom corners.
   * @param value - The CSS border-radius value to apply to bottom-left and bottom-right corners.
   * @return This DomElement instance for chaining.
   */
  radiusBottom(value: Property.BorderBottomLeftRadius | undefined) {
    return this.radiusBottomLeft(value).radiusBottomRight(value);
  }

  /**
   * Sets the border radius for both left corners.
   * @param value - The CSS border-radius value to apply to top-left and bottom-left corners.
   * @return This DomElement instance for chaining.
   */
  radiusLeft(value: Property.BorderTopLeftRadius | undefined) {
    return this.radiusTopLeft(value).radiusBottomLeft(value);
  }

  /**
   * Sets the border radius for both right corners.
   * @param value - The CSS border-radius value to apply to top-right and bottom-right corners.
   * @return This DomElement instance for chaining.
   */
  radiusRight(value: Property.BorderTopRightRadius | undefined) {
    return this.radiusTopRight(value).radiusBottomRight(value);
  }

  /**
   * Sets the border radius for both left and right sides (horizontal corners).
   * Applies to top-left, top-right, bottom-left, and bottom-right corners on the X axis.
   * @param value - The CSS border-radius value to apply horizontally.
   * @return This DomElement instance for chaining.
   */
  radiusX(value: Property.BorderRadius | undefined) {
    return this.radiusLeft(value).radiusRight(value);
  }

  /**
   * Sets the border radius for both top and bottom sides (vertical corners).
   * Applies to top-left, top-right, bottom-left, and bottom-right corners on the Y axis.
   * @param value - The CSS border-radius value to apply vertically.
   * @return This DomElement instance for chaining.
   */
  radiusY(value: Property.BorderRadius | undefined) {
    return this.radiusTop(value).radiusBottom(value);
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

  /**
   * Sets or clears the `width` style of the element.
   * Accepts CSS width values (e.g., "100px", "50%") or numeric pixel values.
   * Passing `undefined` removes the width style.
   *
   * @param value - The width value to apply, or `undefined` to remove it.
   * @return This DomElement instance for chaining.
   */
  w(value: Property.Width | number | undefined) {
    return this.setStyleProp("width", value);
  }

  /**
   * Sets or clears the `height` style of the element.
   * Accepts CSS height values (e.g., "100px", "auto") or numeric pixel values.
   * Passing `undefined` removes the height style.
   *
   * @param value - The height value to apply, or `undefined` to remove it.
   * @return This DomElement instance for chaining.
   */
  h(value: Property.Height | number | undefined) {
    return this.setStyleProp("height", value);
  }

  /**
   * Sets the full border style.
   * @param value - The CSS border value (e.g., "1px solid #ccc").
   * @return This DomElement instance for chaining.
   */
  b(value: Property.Border | undefined) {
    return this.setStyleProp("border", value);
  }

  /**
   * Sets the top border style.
   * @param value - The CSS border-top value.
   * @return This DomElement instance for chaining.
   */
  bt(value: Property.BorderTop | undefined) {
    return this.setStyleProp("borderTop", value);
  }

  /**
   * Sets the right border style.
   * @param value - The CSS border-right value.
   * @return This DomElement instance for chaining.
   */
  br(value: Property.BorderRight | undefined) {
    return this.setStyleProp("borderRight", value);
  }

  /**
   * Sets the bottom border style.
   * @param value - The CSS border-bottom value.
   * @return This DomElement instance for chaining.
   */
  bb(value: Property.BorderBottom | undefined) {
    return this.setStyleProp("borderBottom", value);
  }

  /**
   * Sets the left border style.
   * @param value - The CSS border-left value.
   * @return This DomElement instance for chaining.
   */
  bl(value: Property.BorderLeft | undefined) {
    return this.setStyleProp("borderLeft", value);
  }

  /**
   * Sets the left and right border styles.
   * @param value - The CSS border value to apply to both left and right sides.
   * @return This DomElement instance for chaining.
   */
  bx(value: Property.BorderLeft | Property.BorderRight | undefined) {
    this.setStyleProp("borderLeft", value);
    this.setStyleProp("borderRight", value);
    return this;
  }

  /**
   * Sets the top and bottom border styles.
   * @param value - The CSS border value to apply to both top and bottom sides.
   * @return This DomElement instance for chaining.
   */
  by(value: Property.BorderTop | Property.BorderBottom | undefined) {
    this.setStyleProp("borderTop", value);
    this.setStyleProp("borderBottom", value);
    return this;
  }

  /**
   * Sets the top and left border styles.
   * @param value - The CSS border value to apply to both top and left sides.
   * @return This DomElement instance for chaining.
   */
  btl(value: Property.BorderTop | Property.BorderLeft | undefined) {
    this.setStyleProp("borderTop", value);
    this.setStyleProp("borderLeft", value);
    return this;
  }

  /**
   * Sets the top and right border styles.
   * @param value - The CSS border value to apply to both top and right sides.
   * @return This DomElement instance for chaining.
   */
  btr(value: Property.BorderTop | Property.BorderRight | undefined) {
    this.setStyleProp("borderTop", value);
    this.setStyleProp("borderRight", value);
    return this;
  }

  /**
   * Sets the bottom and left border styles.
   * @param value - The CSS border value to apply to both bottom and left sides.
   * @return This DomElement instance for chaining.
   */
  bbl(value: Property.BorderBottom | Property.BorderLeft | undefined) {
    this.setStyleProp("borderBottom", value);
    this.setStyleProp("borderLeft", value);
    return this;
  }

  /**
   * Sets the bottom and right border styles.
   * @param value - The CSS border value to apply to both bottom and right sides.
   * @return This DomElement instance for chaining.
   */
  bbr(value: Property.BorderBottom | Property.BorderRight | undefined) {
    this.setStyleProp("borderBottom", value);
    this.setStyleProp("borderRight", value);
    return this;
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

  /**
   * Sets the CSS `position` property.
   * @param value - The positioning mode (e.g., "absolute", "relative", "fixed").
   * @return This DomElement instance for chaining.
   */
  pos(value: Property.Position | undefined) {
    return this.setStyleProp("position", value);
  }

  /**
   * Sets the CSS `top` offset.
   * @param value - The top offset value (e.g., "10px", "50%").
   * @return This DomElement instance for chaining.
   */
  posTop(value: Property.Top | undefined) {
    return this.setStyleProp("top", value);
  }

  /**
   * Sets the CSS `bottom` offset.
   * @param value - The bottom offset value (e.g., "0", "2rem").
   * @return This DomElement instance for chaining.
   */
  posBottom(value: Property.Bottom | undefined) {
    return this.setStyleProp("bottom", value);
  }

  /**
   * Sets the CSS `left` offset.
   * @param value - The left offset value (e.g., "5px", "auto").
   * @return This DomElement instance for chaining.
   */
  posLeft(value: Property.Left | undefined) {
    return this.setStyleProp("left", value);
  }

  /**
   * Sets the CSS `right` offset.
   * @param value - The right offset value (e.g., "1em", "0").
   * @return This DomElement instance for chaining.
   */
  posRight(value: Property.Right | undefined) {
    return this.setStyleProp("right", value);
  }

  cursor(value: Property.Cursor | undefined) {
    return this.setStyleProp("cursor", value);
  }

  alignItems(value: Property.AlignItems | undefined) {
    return this.setStyleProp("alignItems", value);
  }

  justifyContent(value: Property.JustifyContent | undefined) {
    return this.setStyleProp("justifyContent", value);
  }

  gap(value: Property.Gap | undefined) {
    return this.setStyleProp("gap", value);
  }

  flexDirection(value: Property.FlexDirection | undefined) {
    return this.setStyleProp("flexDirection", value);
  }

  templateColumns(value: Property.GridTemplateColumns | undefined) {
    return this.setStyleProp("gridTemplateColumns", value);
  }

  templateRows(value: Property.GridTemplateRows | undefined) {
    return this.setStyleProp("gridTemplateRows", value);
  }

  appearance(value: Property.Appearance | undefined) {
    return this.setStyleProp("appearance", value);
  }

  /**
   * Sets the CSS `user-select` property to control text selection behavior.
   * @param value - The user-select value (e.g., "none", "text", "auto", "contain", "all").
   * @return This DomElement instance for chaining.
   */
  userSelect(value: Property.UserSelect | undefined) {
    return this.setStyleProp("userSelect", value);
  }

  /**
   * Sets the vertical alignment of the element.
   * Common values include "middle", "top", "bottom", "baseline", or pixel/em units.
   *
   * @param value - The CSS vertical-align value (e.g., "middle", "top", "10px").
   * @return This DomElement instance for chaining.
   */
  verticalAlign(value: Property.VerticalAlign | undefined) {
    return this.setStyleProp("verticalAlign", value);
  }

  /**
   * Applies CSS styles to truncate overflowing text with an ellipsis.
   * Ensures the text stays on a single line and hides overflow.
   *
   * Equivalent to:
   * ```css
   * overflow: hidden;
   * white-space: nowrap;
   * text-overflow: ellipsis;
   * ```
   *
   * @return This DomElement instance for chaining.
   */
  overflowEllipsis() {
    return this.style({
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    });
  }

  ref(refFn: (el: this) => void) {
    refFn(this);
    return this;
  }

  /**
   * Applies scoped CSS styles to the element using a class-based selector.
   * Ensures the element has a unique internal class name, then targets it with the given selector.
   *
   * For example, calling `css(":hover", { color: "red" })` will generate:
   * ```css
   * .<internalClassName>:hover { color: red; }
   * ```
   *
   * This enables dynamic styling of pseudo-classes, child selectors, or media queries without inline styles.
   *
   * @param selector - A CSS selector suffix (e.g., ":hover", " > span") scoped to the internal class.
   * @param props - A map of CSS properties to apply to the generated rule.
   * @return This DomElement instance for chaining.
   */
  css(selector: string, props: CssProperties) {
    this.setCssClassName();

    const rule = this._sheet.getCssRule(`.${this.cssClassName}${selector}`);

    this._sheet.setRuleCss(rule, props);

    return this;
  }

  /**
   * Applies scoped CSS styles directly to the root selector of the element.
   * Equivalent to styling `.className` without any pseudo-classes or combinators.
   *
   * @param props - A map of CSS properties to apply to the root selector.
   * @return This DomElement instance for chaining.
   */
  rootCss(props: CssProperties) {
    return this.css("", props);
  }

  /**
   * Applies scoped CSS styles to the `:hover` state of the element.
   * Useful for styling hover interactions without inline styles.
   *
   * @param props - A map of CSS properties to apply when the element is hovered.
   * @return This DomElement instance for chaining.
   */
  hoverCss(props: CssProperties) {
    return this.css(":hover", props);
  }

  /**
   * Applies scoped CSS styles to the `:active` state of the element.
   * Useful for styling active interactions (e.g., mouse down).
   *
   * @param props - A map of CSS properties to apply when the element is active.
   * @return This DomElement instance for chaining.
   */
  activeCss(props: CssProperties) {
    return this.css(":active", props);
  }

  /**
   * Applies scoped CSS styles to the `:focus` state of the element.
   * Useful for styling keyboard or programmatic focus.
   *
   * @param props - A map of CSS properties to apply when the element is focused.
   * @return This DomElement instance for chaining.
   */
  focusCss(props: CssProperties) {
    return this.css(":focus", props);
  }

  /**
   * Applies scoped CSS styles to the `:focus-within` state of the element.
   * Useful for styling when any child element has focus.
   *
   * @param props - A map of CSS properties to apply when the element or its descendants are focused.
   * @return This DomElement instance for chaining.
   */
  focusWithinCss(props: CssProperties) {
    return this.css(":focus-within", props);
  }

  /**
   * Applies scoped CSS styles to the element within a media query block.
   * Ensures the element has a unique internal class name, then targets it with the given selector inside the specified media query.
   *
   * For example, calling `mediaCss("screen and (max-width: 600px)", ":hover", { color: "red" })` will generate:
   * ```css
   * \@media screen and (max-width: 600px) {
   *   .<internalClassName>:hover { color: red; }
   * }
   * ```
   *
   * This enables responsive styling and conditional behavior based on viewport or device characteristics.
   *
   * @param mediaText - The media query string (e.g., "screen and (max-width: 600px)").
   * @param selector - A CSS selector suffix (e.g., ":hover", " > span") scoped to the internal class.
   * @param props - A map of CSS properties to apply within the media rule.
   * @return This DomElement instance for chaining.
   */
  mediaCss(mediaText: string, selector: string, props: CssProperties) {
    this.setCssClassName();

    const mRule = this._sheet.getMediaRule(mediaText);

    const rule = mRule.getCssRule(`.${this.cssClassName}${selector}`);

    this._sheet.setRuleCss(rule, props);

    return this;
  }

  /**
   * Applies scoped CSS styles to the root selector of the element within a media query block.
   * Useful for conditionally styling the element based on viewport or device characteristics.
   *
   * @param mediaText - The media query string (e.g., "screen and (max-width: 600px)").
   * @param props - A map of CSS properties to apply within the media rule.
   * @return This DomElement instance for chaining.
   */
  mediaRootCss(mediaText: string, props: CssProperties) {
    return this.mediaCss(mediaText, "", props);
  }

  /**
   * Applies scoped CSS styles to the root selector of the element when the viewport width
   * meets or exceeds the specified minimum.
   *
   * Automatically converts numeric values to pixel-based CSS width values.
   *
   * @param minWidth - The minimum width threshold (e.g., 600 or "40em").
   * @param props - A map of CSS properties to apply when the condition is met.
   * @return This DomElement instance for chaining.
   */
  minWidthCss(minWidth: number | string, props: CssProperties) {
    return this.mediaCss(
      `min-width:${this._sheet.getStyleValue("width", minWidth)}`,
      "",
      props
    );
  }

  /**
   * Applies scoped CSS styles to the root selector of the element when the viewport width
   * is less than or equal to the specified maximum.
   *
   * Automatically converts numeric values to pixel-based CSS width values.
   *
   * @param maxWidth - The maximum width threshold (e.g., 600 or "40em").
   * @param props - A map of CSS properties to apply when the condition is met.
   * @return This DomElement instance for chaining.
   */
  maxWidthCss(maxWidth: number | string, props: CssProperties) {
    return this.mediaCss(
      `max-width:${this._sheet.getStyleValue("width", maxWidth)}`,
      "",
      props
    );
  }

  protected resolveNode(child: DomElementChild): Node {
    if (typeof child === "string" || typeof child === "number") {
      return document.createTextNode(String(child));
    }
    if ("dom" in child) {
      return child.dom;
    }
    return child;
  }

  protected setStyleProp(
    name: Autocomplete<keyof CssProperties>,
    value: string | number | undefined
  ) {
    if (value === undefined) {
      this.dom.style.removeProperty(camelToKebab(name));
      return this;
    }

    this.dom.style.setProperty(
      camelToKebab(name),
      this._sheet.getStyleValue(name, value)
    );
    return this;
  }

  protected setCssClassName() {
    const fullClass = this._userClassName
      ? `${this._userClassName} ${this.cssClassName}`
      : this.cssClassName;

    if (this.isSvg) {
      this.dom.setAttribute("class", fullClass);
    }
    //
    else {
      (this.dom as HTMLElement).className = fullClass;
    }

    return this;
  }
}
/**
 * Creates a new DomElement instance for the given tag name.
 * @param tag - The HTML tag name (e.g., "div", "button", "input").
 * @return A DomElement wrapping a newly created element of the specified tag.
 */
export function $<T extends keyof DomElementTagNameMap>(tag: T) {
  return new DomElement(tag);
}

/**
 * Queries the DOM for a matching element and wraps it in a DomElement.
 * @param selector - A CSS selector string to locate the element.
 * @return A DomElement wrapping the matched element.
 * @throws If no element matches the selector, this will throw due to non-null assertion.
 */
export function $query<T extends keyof DomElementTagNameMap>(selector: string) {
  const el = document.querySelector(selector)!;
  return new DomElement(
    el.tagName.toLowerCase() as T,
    el as DomElementTagNameMap[T]
  );
}
