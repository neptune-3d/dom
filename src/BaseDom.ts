import { BaseStyle } from "./BaseStyle";
import type {
  Autocomplete,
  CssProperties,
  DomElementChild,
  DomElementEventMap,
} from "./types";
import { camelToKebab, getStyleValue } from "./utils";

/**
 * Base class for DOM-backed elements with style and event utilities.
 * Supports both HTML and SVG elements via generic parameter `E`.
 */
export abstract class BaseDom<
  E extends HTMLElement | SVGElement
> extends BaseStyle {
  abstract dom: E;

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
   */
  off<T extends keyof DomElementEventMap>(
    type: T,
    handler: (ev: DomElementEventMap[T]) => void,
    options?: boolean | EventListenerOptions
  ) {
    this.dom.removeEventListener(type, handler as any, options);
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
   * Removes child elements within the specified index range.
   * If no range is provided, removes all children.
   *
   * @param from - The starting index (inclusive). Defaults to 0.
   * @param to - The ending index (exclusive). Defaults to all children.
   * @returns This DomElement instance.
   */
  clear(from?: number, to?: number) {
    const children = Array.from(this.dom.children);
    const start = Math.max(0, from ?? 0);
    const end = Math.min(children.length, to ?? children.length);

    for (let i = start; i < end; i++) {
      this.dom.removeChild(children[i]);
    }

    return this;
  }

  ref(refFn: (el: this) => void) {
    refFn(this);
    return this;
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

    this.dom.style.setProperty(camelToKebab(name), getStyleValue(name, value));

    return this;
  }
}
