import { BaseStyle } from "./BaseStyle";
import { DomElement } from "./DomElement";
import type {
  Autocomplete,
  CssProperties,
  DomElementChild,
  DomElementEventMap,
  DomElementTagNameMap,
} from "./types";
import { camelToKebab, getStyleValue } from "./utils";

const _isBaseDom = Symbol("BaseDomIdentity");

/**
 * Base class for DOM-backed elements with style and event utilities.
 * Supports both HTML and SVG elements via generic parameter `E`.
 */
export abstract class BaseDom<
  E extends HTMLElement | SVGElement
> extends BaseStyle {
  protected readonly [_isBaseDom] = true;

  abstract dom: E;

  /**
   * Returns the `clientWidth` of the element.
   * For HTML elements, this is the inner width excluding borders and scrollbars.
   * For SVG elements, this may return `0` unless the element has layout box dimensions.
   */
  getClientWidth(): number {
    return (this.dom as any).clientWidth ?? 0;
  }

  /**
   * Returns the `clientHeight` of the element.
   * For HTML elements, this is the inner height excluding borders and scrollbars.
   * For SVG elements, this may return `0` unless the element has layout box dimensions.
   */
  getClientHeight(): number {
    return (this.dom as any).clientHeight ?? 0;
  }

  /**
   * Returns the bounding box of the element using `getBoundingClientRect()`.
   * Works reliably for both HTML and SVG elements.
   *
   * @return A DOMRect object with `width`, `height`, `top`, `left`, etc.
   */
  getRect(): DOMRect {
    return this.dom.getBoundingClientRect();
  }

  /**
   * Returns the computed styles of this element.
   * Useful for reading resolved values of inherited, cascaded, or shorthand CSS properties.
   *
   * Wraps `window.getComputedStyle()` and returns a `CSSStyleDeclaration` for inspection.
   *
   * @return The computed style object for this element.
   */
  getComputedStyle(): CSSStyleDeclaration {
    return window.getComputedStyle(this.dom);
  }

  /**
   * Returns the child element at the specified index.
   * Uses `children`, which excludes text, comment, and other non-element nodes.
   * Returns `null` if the index is out of bounds.
   *
   * @param index - The zero-based index of the child element.
   * @return The child `Element` at the given index, or `null` if not found.
   */
  getChildAt(index: number): Element | null {
    return this.dom.children.item(index);
  }

  /**
   * Returns the child node at the specified index.
   * Uses `childNodes`, which includes elements, text nodes, comments, and other node types.
   * Returns `null` if the index is out of bounds.
   *
   * @param index - The zero-based index of the child node.
   * @return The child `Node` at the given index, or `null` if not found.
   */
  getNodeAt(index: number): Node | null {
    return this.dom.childNodes.item(index);
  }

  /**
   * Returns a static array of all child elements.
   * Excludes text nodes, comments, and other non-element nodes.
   * Useful for DOM traversal, filtering, or batch operations.
   *
   * @return An array of child `Element` nodes.
   */
  getChildren(): Element[] {
    return Array.from(this.dom.children);
  }

  /**
   * Returns a static array of all child nodes.
   * Includes elements, text nodes, comments, and other node types.
   * Useful for low-level DOM inspection or mixed-content manipulation.
   *
   * @return An array of child `Node` instances.
   */
  getNodes(): Node[] {
    return Array.from(this.dom.childNodes);
  }

  /**
   * Gets the textContent property of the DOM element.
   */
  getText() {
    return this.dom.textContent;
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
   * Retrieves the value of a single property.
   * @param name - The property name to read (e.g. "value", "checked", "disabled").
   * @return The property value, or undefined if not present.
   */
  getProp(name: string): any {
    return (this.dom as any)[name];
  }

  /**
   * Checks whether the element has the specified CSS class.
   * Useful for conditional logic, toggling, or state inspection.
   *
   * @param name - The class name to check.
   * @return `true` if the class is present, otherwise `false`.
   */
  hasClass(name: string): boolean {
    return this.dom.classList.contains(name);
  }

  /**
   * Sets the `textContent` of the element using any value.
   * If the value is `null` or `undefined`, clears the content.
   * Otherwise, converts the value to a string and assigns it.
   * Useful for rendering dynamic values safely, including numbers, booleans, or objects.
   *
   * @param value - The value to assign as plain text, or `null`/`undefined` to clear.
   * @return This instance for chaining.
   */
  text(value: any): this {
    this.dom.textContent = value != null ? String(value) : "";
    return this;
  }

  /**
   * Sets the `innerHTML` of the element.
   * Replaces all existing child nodes with the provided HTML string.
   * Useful for injecting markup, templated content, or resetting the DOM structure.
   *
   * @param content - The HTML string to assign as the element's inner content.
   * @return This instance for chaining.
   */
  html(content: string): this {
    this.dom.innerHTML = content;
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
    this.dom.id = value ?? "";
    return this;
  }

  /**
   * Sets a single attribute on the element.
   * For boolean attributes (e.g. "disabled", "checked"), presence alone determines truthiness.
   * If `value` is `true`, the attribute is added with no value.
   * If `value` is `false` or `undefined`, the attribute is removed.
   *
   * @param name - The attribute name (e.g. "aria-label", "role", "disabled").
   * @param value - The attribute value. If `undefined` or `false`, the attribute is removed.
   * @return This DomElement instance for chaining.
   */
  attr(name: string, value: string | number | boolean | undefined): this {
    if (value === undefined || value === false) {
      this.dom.removeAttribute(name);
    } else if (value === true) {
      this.dom.setAttribute(name, "");
    } else {
      this.dom.setAttribute(name, String(value));
    }
    return this;
  }

  /**
   * Sets multiple attributes on the element.
   * Delegates to `.attr()` for each key-value pair to ensure consistent handling.
   *
   * @param map - A record of attribute names and values.
   * @return This instance for chaining.
   */
  attrs(map: Record<string, string | number | boolean | undefined>): this {
    for (const [name, value] of Object.entries(map)) {
      this.attr(name, value);
    }
    return this;
  }

  /**
   * Toggles the presence of a boolean attribute on the element.
   * Uses the native `toggleAttribute` method for clarity and correctness.
   * If `force` is `true`, ensures the attribute is present.
   * If `force` is `false`, ensures the attribute is removed.
   * If `force` is omitted, toggles the current state.
   *
   * @param name - The attribute name (e.g. "disabled", "checked", "readonly").
   * @param force - Optional boolean to force add (`true`) or remove (`false`) the attribute.
   * @return This instance for chaining.
   */
  toggleAttr(name: string, force?: boolean): this {
    this.dom.toggleAttribute(name, force);
    return this;
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
   * Sets or removes the user-defined class name and applies it alongside the internal CSS class.
   * Uses `setAttribute("class", ...)` for both HTML and SVG elements.
   *
   * Passing `undefined` removes the user-defined class name entirely.
   *
   * @param value - The user-defined class name, or `undefined` to remove it.
   * @return This DomElement instance for chaining.
   */
  className(value: string | undefined) {
    if (value == null) {
      this.dom.removeAttribute("class");
    }
    //
    else {
      this.dom.setAttribute("class", value);
    }

    return this;
  }

  /**
   * Sets the `tabindex` attribute on the element.
   * Controls whether the element can receive keyboard focus and its order in the tab sequence.
   * Pass `undefined` to remove the attribute.
   *
   * @param value - The tabindex value to apply, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  tabIndex(value: number | undefined): this {
    return this.attr("tabindex", value);
  }

  /**
   * Toggles a CSS class on the element.
   * Adds the class if it’s not present, removes it if it is.
   * Uses `classList.toggle()` for safe DOM-backed mutation.
   *
   * @param className - The class name to toggle.
   * @param force - Optional boolean to force add (`true`) or remove (`false`) the class.
   * @return This instance for chaining.
   */
  toggleClass(className: string, force?: boolean): this {
    this.dom.classList.toggle(className, force);
    return this;
  }

  /**
   * Adds an event listener to the element.
   * @param type - The event type (e.g., "click", "input", "mouseenter").
   * @param handler - The event handler function.
   * @param options - Optional event listener options.
   * @return This DomElement instance for chaining.
   */
  on<T extends keyof DomElementEventMap>(
    type: T,
    handler: (ev: DomElementEventMap[T] & { currentTarget: E }) => void,
    options?: boolean | AddEventListenerOptions
  ) {
    this.dom.addEventListener(type, handler as any, options);
    return this;
  }

  /**
   * Removes an event listener from the element.
   * @param type - The event type to remove.
   * @param handler - The original handler function.
   * @param options - Optional event listener options.
   * @return This DomElement instance for chaining.
   */
  off<T extends keyof DomElementEventMap>(
    type: T,
    handler: (ev: DomElementEventMap[T]) => void,
    options?: boolean | EventListenerOptions
  ) {
    this.dom.removeEventListener(type, handler as any, options);
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
    this.dom.append(...nodes.map((n) => this.resolveNode(n)));
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
    const children = Array.from(this.dom.children);
    const len = children.length;
    const clampedIndex = Math.max(0, Math.min(index, len));

    // Remove all children from index onward
    for (let i = clampedIndex; i < len; i++) {
      this.dom.removeChild(children[i]);
    }

    // Insert new nodes at the clamped index
    const referenceNode = this.dom.children[clampedIndex] ?? null;
    for (const node of nodes) {
      this.dom.insertBefore(this.resolveNode(node), referenceNode);
    }

    return this;
  }

  /**
   * Removes all child nodes from the element by doing `dom.textContent = ""`.
   *
   * @return This instance for chaining.
   */
  clear(): this {
    this.dom.textContent = "";
    return this;
  }

  /**
   * Removes child elements within the specified index range.
   * Behaves like `Array.prototype.slice(from, to)` — `from` is inclusive, `to` is exclusive.
   * If `from` is omitted, defaults to 0. If `to` is omitted, removes to the end.
   *
   * @param from - The starting index (inclusive). Defaults to 0.
   * @param to - The ending index (exclusive). Defaults to all remaining children.
   * @return This instance for chaining.
   */
  clearRange(from?: number, to?: number): this {
    const children = Array.from(this.dom.children);
    const start = Math.max(0, from ?? 0);
    const end = Math.min(children.length, to ?? children.length);

    for (let i = start; i < end; i++) {
      this.dom.removeChild(children[i]);
    }

    return this;
  }

  /**
   * Checks whether this element contains the given target node.
   * Accepts either a raw DOM node or another `BaseDom` instance.
   *
   * Useful for containment checks, event delegation, or visibility logic.
   *
   * @param target - A DOM node or `BaseDom` instance to test.
   * @return `true` if this element contains the target, otherwise `false`.
   */
  contains(target: Node | BaseDom<any>): boolean {
    const node = target instanceof BaseDom ? target.dom : target;
    return this.dom.contains(node);
  }

  /**
   * Queries this element's subtree for a single matching descendant and wraps it in a `DomElement`.
   * Returns `null` if no match is found.
   *
   * This enables fluent DOM composition and manipulation within scoped components.
   *
   * @param selector - A valid CSS selector string.
   * @return A `DomElement` wrapper for the matched element, or `null` if not found.
   */
  query<T extends keyof DomElementTagNameMap>(
    selector: string
  ): DomElement<T> | null {
    const el = this.dom.querySelector(selector);
    return el
      ? new DomElement<T>(
          el.tagName.toLowerCase() as T,
          el as DomElementTagNameMap[T]
        )
      : null;
  }

  ref(refFn: (el: this) => void) {
    refFn(this);
    return this;
  }

  protected resolveNode(child: DomElementChild): Node {
    if (typeof child === "string" || typeof child === "number") {
      return document.createTextNode(String(child));
    }
    if (BaseDom.isBaseDom(child)) {
      return child.dom;
    }
    return child as Node;
  }

  protected setStyleProp(
    name: Autocomplete<keyof CssProperties>,
    value: string | number | undefined
  ) {
    if (value === undefined) {
      this.dom.style.removeProperty(camelToKebab(name));
      return this;
    }

    this.dom.style.setProperty(camelToKebab(name), getStyleValue(name, value));

    return this;
  }

  /**
   * Checks whether a value is a `BaseDom` instance.
   * Uses a symbol-based identity marker and avoids the `in` operator.
   *
   * @param value - The value to check.
   * @return `true` if the value is a `BaseDom` instance, otherwise `false`.
   */
  static isBaseDom(value: unknown): value is BaseDom<HTMLElement | SVGElement> {
    if (typeof value !== "object" || value === null) return false;

    const symbols = Object.getOwnPropertySymbols(value);
    return symbols.includes(_isBaseDom);
  }
}
