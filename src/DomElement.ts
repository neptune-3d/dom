import { BaseDom } from "./BaseDom";
import { SVG_TAGS, TAG_ALIAS, type TagAlias } from "./constants";
import type { DomElementTagNameMap } from "./types";

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
> extends BaseDom<DomElementTagNameMap[Tag]> {
  /**
   * Creates a new DomElement instance for the specified tag.
   * Automatically detects whether the tag is an SVG element and uses the appropriate namespace.
   * Optionally wraps an existing DOM element instead of creating a new one.
   *
   * @param tag - The tag name of the element (e.g., "div", "circle", "svg").
   * @param el - An optional existing DOM element to wrap. If omitted, a new element is created.
   */
  constructor(tag: Tag, el?: DomElementTagNameMap[Tag]) {
    super();

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
  }

  protected _tag;
  protected _isSvg;
  protected _dom;

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

  /**
   * Gets the textContent property of the DOM element.
   */
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
   * Sets or removes the `popover` attribute on the element.
   * Applies to HTML elements that support the popover API (e.g., `<div popover>`).
   * Passing `undefined` removes the attribute.
   *
   * Common values include:
   * - `"auto"` → Automatically shows/hides based on user interaction.
   * - `"manual"` → Requires explicit show/hide via JavaScript.
   *
   * @param value - The popover mode (`"auto"` or `"manual"`), or `undefined` to remove it.
   * @return This DomElement instance for chaining.
   */
  popover(value: "auto" | "manual" | undefined) {
    if (value === undefined) {
      this.dom.removeAttribute("popover");
    }
    //
    else {
      this.dom.setAttribute("popover", value);
    }

    return this;
  }

  /**
   * Shows the popover on this element.
   * Requires the element to have a `popover="manual"` attribute and be in the DOM.
   *
   * @return This DomElement instance for chaining.
   */
  showPopover() {
    (this.dom as any).showPopover();
    return this;
  }

  /**
   * Hides the popover on this element.
   * Requires the element to have a `popover="manual"` attribute and be in the DOM.
   *
   * @return This DomElement instance for chaining.
   */
  hidePopover() {
    (this.dom as any).hidePopover();
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
