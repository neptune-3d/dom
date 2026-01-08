import { BaseStyle } from "./BaseStyle";
import type {
  AriaHasPopup,
  AriaLive,
  AriaRole,
  Autocomplete,
  CssProperties,
  DomElementChild,
  DomElementEventMap,
  DomReferenceNode,
} from "./types";
import {
  camelToKebab,
  getDocumentWindow,
  getElementDocument,
  getStyleValue,
} from "./utils";

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

  protected _rect: DOMRect | null = null;

  protected _clientWidth: number | null = null;

  protected _clientHeight: number | null = null;

  /**
   * Returns the associated native `Window` for this element.
   *
   * - Resolves via the element’s `ownerDocument.defaultView`.
   * - Falls back to the global `window` if detached.
   *
   * @return The native `Window` object.
   */
  getWindow(): Window {
    return getDocumentWindow(this.getDocument());
  }

  /**
   * Returns the associated native `Document` for this element.
   *
   * - Resolves via the element’s `ownerDocument`.
   * - Falls back to the global `document` if detached.
   *
   * @return The native `Document` object.
   */
  getDocument(): Document {
    return getElementDocument(this.dom);
  }

  /**
   * Returns the `clientWidth` of the element.
   * For HTML elements, this is the inner width excluding borders and scrollbars.
   * For SVG elements, this may return `0` unless the element has layout box dimensions.
   *
   * - By default, returns a cached value to avoid repeated layout recalculation.
   * - Pass `force = true` to recompute and update the cache.
   *
   * @param force - Whether to force recomputation (default: false).
   * @return The clientWidth of the element.
   */
  getClientWidth(force: boolean = false): number {
    if (force || this._clientWidth === null) {
      this._clientWidth = this.dom.clientWidth ?? 0;
    }
    return this._clientWidth;
  }

  /**
   * Returns the `clientHeight` of the element.
   * For HTML elements, this is the inner height excluding borders and scrollbars.
   * For SVG elements, this may return `0` unless the element has layout box dimensions.
   *
   * - By default, returns a cached value to avoid repeated layout recalculation.
   * - Pass `force = true` to recompute and update the cache.
   *
   * @param force - Whether to force recomputation (default: false).
   * @return The clientHeight of the element.
   */
  getClientHeight(force: boolean = false): number {
    if (force || this._clientHeight === null) {
      this._clientHeight = this.dom.clientHeight ?? 0;
    }
    return this._clientHeight;
  }

  /**
   * Returns the bounding box of the element using `getBoundingClientRect()`.
   * Works reliably for both HTML and SVG elements.
   *
   * - By default, returns a cached value to avoid layout thrashing.
   * - Pass `force = true` to recompute and update the cache.
   *
   * @param force - Whether to force recomputation (default: false).
   * @return A DOMRect object with `width`, `height`, `top`, `left`, etc.
   */
  getRect(force: boolean = false): DOMRect {
    if (force || this._rect === null) {
      this._rect = this.dom.getBoundingClientRect();
    }
    return this._rect;
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
   * Returns the first child element of this DOM node.
   * Uses `firstElementChild`, which excludes text, comment, and other non-element nodes.
   * Returns `null` if there are no child elements.
   *
   * @return The first child `Element`, or `null` if none exist.
   */
  getFirstChildElement(): Element | null {
    return this.dom.firstElementChild;
  }

  /**
   * Returns the first child node of this DOM node.
   * Uses `firstChild`, which may be an element, text node, comment, etc.
   * Returns `null` if there are no child nodes.
   *
   * @return The first child `Node`, or `null` if none exist.
   */
  getFirstChildNode(): Node | null {
    return this.dom.firstChild;
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
   * Returns the `id` of the element.
   *
   * - Uses the DOM `id` property, which reflects the `id` attribute.
   * - Always returns a string (empty string if no id is set).
   * - Prefer this over `getAttr("id")` unless you need to distinguish
   *   between a missing attribute (`null`) and an empty string.
   *
   * @return The element's id as a string (possibly empty).
   */
  getId(): string {
    return this.dom.id;
  }

  /**
   * Returns the `dataset` of the element.
   *
   * - Provides access to all `data-*` attributes as a `DOMStringMap`.
   * - Keys are the attribute names without the `data-` prefix.
   * - Values are always strings (or `undefined` if not present).
   * - Useful for reading custom data attributes in a type-safe way.
   *
   * @return The element's dataset object.
   */
  getDataset(): DOMStringMap {
    return this.dom.dataset;
  }

  /**
   * Retrieves a single `data-*` attribute from the element's dataset.
   *
   * - Accepts the camelCase form of the attribute name (e.g. "userId" for `data-user-id`).
   * - Returns the string value if present, or `undefined` if not set.
   * - Useful for direct access without manually indexing into `.dataset`.
   *
   * @param key - The camelCase name of the data attribute.
   * @return The attribute value as a string, or `undefined` if not present.
   */
  getDataAttr(key: string): string | undefined {
    return this.dom.dataset[key];
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
   * Returns true if this element is currently focused.
   * Works for documents, shadow roots, and gracefully
   * handles elements not connected to the DOM.
   */
  isFocused(): boolean {
    const root = this.dom.getRootNode();
    if (!root || !("activeElement" in root)) {
      return false;
    }
    return root.activeElement === this.dom;
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
   * Sets or clears a single `data-*` attribute on the element.
   *
   * - Accepts the camelCase form of the attribute name (e.g. "userId" for `data-user-id`).
   * - Passing `undefined` or `false` removes the attribute.
   * - Passing `true` sets the attribute with no value (presence only).
   * - Passing a string or number sets the attribute to that value.
   * - Chainable for fluent DOM composition.
   *
   * @param key - The camelCase name of the data attribute.
   * @param value - The value to assign, or a boolean for presence toggle.
   * @returns This instance for chaining.
   */
  dataAttr(key: string, value: string | number | boolean | undefined): this {
    const dataset = (this.dom as HTMLElement).dataset;

    if (value === undefined || value === false) {
      delete dataset[key];
    }
    //
    else if (value === true) {
      dataset[key] = "";
    }
    //
    else {
      dataset[key] = String(value);
    }

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
    }
    //
    else if (value === true) {
      this.dom.setAttribute(name, "");
    }
    //
    else {
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
   * Sets or clears the `role` attribute on the element.
   *
   * - Common values: `"button"`, `"dialog"`, `"navigation"`, `"presentation"`, etc.
   * - Passing `undefined` removes the attribute.
   * - Chainable for fluent DOM composition.
   *
   * @param value - The role value to apply, or `undefined` to remove it.
   * @returns This instance for chaining.
   */
  role(value: Autocomplete<AriaRole> | undefined): this {
    return this.attr("role", value);
  }

  /**
   * Sets or clears the `aria-label` attribute on the element.
   *
   * - Used to provide an accessible name for elements.
   * - Passing `undefined` removes the attribute.
   * - Chainable for fluent DOM composition.
   *
   * @param value - The aria-label value to apply, or `undefined` to remove it.
   * @returns This instance for chaining.
   */
  ariaLabel(value: string | undefined): this {
    return this.attr("aria-label", value);
  }

  /**
   * Sets or clears the `aria-labelledby` attribute on the element.
   *
   * - Used to indicate the element(s) that label this element.
   * - Accepts one or more element IDs (space-separated).
   * - Passing `undefined` removes the attribute.
   * - Chainable for fluent DOM composition.
   *
   * @param value - The ID or space-separated list of IDs of labeling elements,
   *                or `undefined` to remove the attribute.
   * @returns This instance for chaining.
   */
  ariaLabelledBy(value: string | undefined): this {
    return this.attr("aria-labelledby", value);
  }

  /**
   * Sets or clears the `aria-hidden` attribute on the element.
   *
   * - Used to indicate whether the element should be exposed to assistive technologies.
   * - Passing `true` sets `aria-hidden="true"`.
   * - Passing `false` sets `aria-hidden="false"`.
   * - Passing `undefined` removes the attribute.
   * - Chainable for fluent DOM composition.
   *
   * @param value - `true` to hide from assistive tech, `false` to expose, or `undefined` to remove.
   * @returns This instance for chaining.
   */
  ariaHidden(value: boolean | undefined): this {
    return this.booleanishAttr("aria-hidden", value);
  }

  /**
   * Sets or clears the `aria-selected` attribute on the element.
   *
   * - Used to indicate the current selection state of an item in a list, tablist, tree, etc.
   * - Passing `true` sets `aria-selected="true"`.
   * - Passing `false` sets `aria-selected="false"`.
   * - Passing `undefined` removes the attribute.
   * - Chainable for fluent DOM composition.
   *
   * @param value - `true` to mark as selected, `false` to mark as not selected, or `undefined` to remove.
   * @returns This instance for chaining.
   */
  ariaSelected(value: boolean | undefined): this {
    return this.booleanishAttr("aria-selected", value);
  }

  /**
   * Sets or clears the `aria-multiselectable` attribute on the element.
   *
   * - Used to indicate whether multiple items can be selected in a listbox, tree, or grid.
   * - Passing `true` sets `aria-multiselectable="true"`.
   * - Passing `false` sets `aria-multiselectable="false"`.
   * - Passing `undefined` removes the attribute.
   * - Chainable for fluent DOM composition.
   *
   * @param value - `true` to allow multiple selection, `false` to restrict to single selection, or `undefined` to remove.
   * @returns This instance for chaining.
   */
  ariaMultiselectable(value: boolean | undefined): this {
    return this.booleanishAttr("aria-multiselectable", value);
  }

  /**
   * Sets or clears the `aria-setsize` attribute on the element.
   *
   * - Used to define the number of items in a set (e.g. list, tree, grid).
   * - Passing `undefined` removes the attribute.
   * - Chainable for fluent DOM composition.
   *
   * @param value - The set size value to apply, or `undefined` to remove it.
   * @returns This instance for chaining.
   */
  ariaSetSize(value: number | undefined): this {
    return this.attr("aria-setsize", value);
  }

  /**
   * Sets or clears the `aria-posinset` attribute on the element.
   *
   * - Used to define the position of an item within a set (e.g. list, tree, grid).
   * - Passing `undefined` removes the attribute.
   * - Chainable for fluent DOM composition.
   *
   * @param value - The position value to apply, or `undefined` to remove it.
   * @returns This instance for chaining.
   */
  ariaPosInSet(value: number | undefined): this {
    return this.attr("aria-posinset", value);
  }

  /**
   * Sets or clears the `aria-expanded` attribute on the element.
   *
   * - Used to indicate whether a collapsible element (like a disclosure widget) is expanded or collapsed.
   * - Passing `true` sets `aria-expanded="true"`.
   * - Passing `false` sets `aria-expanded="false"`.
   * - Passing `undefined` removes the attribute.
   * - Chainable for fluent DOM composition.
   *
   * @param value - `true` to mark as expanded, `false` to mark as collapsed, or `undefined` to remove.
   * @returns This instance for chaining.
   */
  ariaExpanded(value: boolean | undefined): this {
    return this.booleanishAttr("aria-expanded", value);
  }

  /**
   * Sets or clears the `aria-controls` attribute on the element.
   *
   * - Used to indicate the element(s) whose contents or presence are controlled by this element.
   * - Accepts one or more element IDs (space-separated).
   * - Passing `undefined` removes the attribute.
   * - Chainable for fluent DOM composition.
   *
   * @param value - The ID or space-separated list of IDs of controlled elements,
   *                or `undefined` to remove the attribute.
   * @returns This instance for chaining.
   */
  ariaControls(value: string | undefined): this {
    return this.attr("aria-controls", value);
  }

  /**
   * Sets or clears the `aria-live` attribute on the element.
   *
   * - Used to indicate how updates to the element should be announced by assistive technologies.
   * - Known values: `"off"`, `"polite"`, `"assertive"`.
   * - Passing `undefined` removes the attribute.
   * - Chainable for fluent DOM composition.
   *
   * @param value - The aria-live value to apply, or `undefined` to remove it.
   * @returns This instance for chaining.
   */
  ariaLive(value: Autocomplete<AriaLive> | undefined): this {
    return this.attr("aria-live", value);
  }

  /**
   * Sets or clears the `aria-haspopup` attribute on the element.
   *
   * - Indicates the availability and type of interactive popup element.
   * - Known values: `"false"`, `"true"`, `"menu"`, `"listbox"`, `"tree"`, `"grid"`, `"dialog"`.
   * - Passing `undefined` removes the attribute.
   * - Chainable for fluent DOM composition.
   *
   * @param value - The aria-haspopup value to apply, or `undefined` to remove it.
   * @returns This instance for chaining.
   */
  ariaHasPopup(value: Autocomplete<AriaHasPopup> | undefined): this {
    return this.attr("aria-haspopup", value);
  }

  /**
   * Sets or clears the `aria-valuemin` attribute on the element.
   *
   * - Used to define the minimum allowed value for a range widget (slider, spinbutton, progressbar).
   * - Passing a number or string sets `aria-valuemin` to that value.
   * - Passing `undefined` removes the attribute.
   * - Chainable for fluent DOM composition.
   *
   * @param value - The minimum value to apply, or `undefined` to remove it.
   * @returns This instance for chaining.
   */
  ariaValueMin(value: string | number | undefined): this {
    return this.attr("aria-valuemin", value);
  }

  /**
   * Sets or clears the `aria-valuemax` attribute on the element.
   *
   * - Used to define the maximum allowed value for a range widget (slider, spinbutton, progressbar).
   * - Passing a number or string sets `aria-valuemax` to that value.
   * - Passing `undefined` removes the attribute.
   * - Chainable for fluent DOM composition.
   *
   * @param value - The maximum value to apply, or `undefined` to remove it.
   * @returns This instance for chaining.
   */
  ariaValueMax(value: string | number | undefined): this {
    return this.attr("aria-valuemax", value);
  }

  /**
   * Sets or clears the `aria-valuenow` attribute on the element.
   *
   * - Used to define the current value of a range widget (slider, spinbutton, progressbar).
   * - Passing a number or string sets `aria-valuenow` to that value.
   * - Passing `undefined` removes the attribute.
   * - Chainable for fluent DOM composition.
   *
   * @param value - The current value to apply, or `undefined` to remove it.
   * @returns This instance for chaining.
   */
  ariaValueNow(value: string | number | undefined): this {
    return this.attr("aria-valuenow", value);
  }

  /**
   * Sets or clears the `aria-valuetext` attribute on the element.
   *
   * - Used to provide a human-readable text alternative for the current value of a range widget.
   * - Passing a string sets `aria-valuetext` to that value.
   * - Passing `undefined` removes the attribute.
   * - Chainable for fluent DOM composition.
   *
   * @param value - The text value to apply, or `undefined` to remove it.
   * @returns This instance for chaining.
   */
  ariaValueText(value: string | undefined): this {
    return this.attr("aria-valuetext", value);
  }

  /**
   * Sets or clears the `aria-activedescendant` attribute on the element.
   *
   * - Used to indicate the currently active child element within a composite widget.
   * - Accepts the `id` of the active descendant element.
   * - Passing `undefined` removes the attribute.
   * - Chainable for fluent DOM composition.
   *
   * @param value - The ID of the active descendant element, or `undefined` to remove it.
   * @returns This instance for chaining.
   */
  ariaActiveDescendant(value: string | undefined): this {
    return this.attr("aria-activedescendant", value);
  }

  /**
   * Sets or clears the `aria-orientation` attribute on the element.
   *
   * - Used to indicate the orientation of a widget (e.g., slider, scrollbar, tablist).
   * - Valid values: `"horizontal"`, `"vertical"`.
   * - Passing `undefined` removes the attribute.
   * - Chainable for fluent DOM composition.
   *
   * @param value - The orientation to apply, or `undefined` to remove it.
   * @returns This instance for chaining.
   */
  ariaOrientation(value: "horizontal" | "vertical" | undefined): this {
    return this.attr("aria-orientation", value);
  }

  /**
   * Sets or clears the `aria-describedby` attribute on the element.
   *
   * - Used to indicate the element(s) that provide descriptive information for this element.
   * - Accepts one or more element IDs (space-separated).
   * - Passing `undefined` removes the attribute.
   * - Chainable for fluent DOM composition.
   *
   * @param value - The ID or space-separated list of IDs of descriptive elements,
   *                or `undefined` to remove the attribute.
   * @returns This instance for chaining.
   */
  ariaDescribedBy(value: string | undefined): this {
    return this.attr("aria-describedby", value);
  }

  /**
   * Sets or clears the `draggable` attribute on the element.
   *
   * - Used to indicate whether the element is draggable.
   * - Valid values: `"true"`, `"false"`, `"auto"`.
   * - Passing `undefined` removes the attribute.
   * - Chainable for fluent DOM composition.
   *
   * @param value - The draggable value to apply, or `undefined` to remove it.
   * @returns This instance for chaining.
   */
  draggable(value: "true" | "false" | "auto" | undefined): this {
    return this.attr("draggable", value);
  }

  /**
   * Sets or clears the `hidden` attribute on the element.
   *
   * - Used to hide the element from rendering in the document.
   * - Passing `true` sets `hidden`.
   * - Passing `false` or `undefined` removes the attribute.
   * - Chainable for fluent DOM composition.
   *
   * @param value - `true` to hide the element, `false`/`undefined` to show it.
   * @returns This instance for chaining.
   */
  hidden(value: boolean | undefined): this {
    return this.attr("hidden", value);
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
   * Inserts a child node before a given reference node.
   *
   * - `newNode` can be any DomElementChild (string, number, boolean, null, undefined, Node, DomElement).
   * - `referenceNode` must be either:
   *   - an existing Node,
   *   - a DomElement wrapper (unwrapped via `.dom`),
   *   - or null (append at the end).
   *
   * @param newNode - The child element or text value to insert.
   * @param referenceNode - The existing child node before which the new node will be inserted,
   *                        or null to append at the end.
   * @return This DomElement instance for chaining.
   */
  insertBefore(
    newNode: DomElementChild,
    referenceNode: DomReferenceNode
  ): this {
    const resolvedNew = this.resolveNode(newNode);

    let resolvedRef: Node | null = null;

    if (referenceNode) {
      resolvedRef = BaseDom.isBaseDom(referenceNode)
        ? referenceNode.dom
        : referenceNode;
    }

    this.dom.insertBefore(resolvedNew, resolvedRef);

    return this;
  }

  /**
   * Inserts a child node after a given reference node.
   *
   * - `newNode` can be any DomElementChild (string, number, boolean, null, undefined, Node, DomElement).
   * - `referenceNode` must be either:
   *   - an existing Node,
   *   - a DomElement wrapper (unwrapped via `.dom`),
   *   - or null (append at the end).
   *
   * @param newNode - The child element or text value to insert.
   * @param referenceNode - The existing child node after which the new node will be inserted.
   *                        If null, the new node is appended at the end.
   * @return This DomElement instance for chaining.
   */
  insertAfter(newNode: DomElementChild, referenceNode: DomReferenceNode): this {
    const resolvedNew = this.resolveNode(newNode);

    let resolvedRef: Node | null = null;
    if (referenceNode) {
      resolvedRef = BaseDom.isBaseDom(referenceNode)
        ? referenceNode.dom
        : referenceNode;
    }

    if (resolvedRef && resolvedRef.parentNode === this.dom) {
      this.dom.insertBefore(resolvedNew, resolvedRef.nextSibling);
    }
    //
    else {
      // If referenceNode is null or not a child, append at the end
      this.dom.appendChild(resolvedNew);
    }

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

  protected resolveNode(child: DomElementChild): Node {
    if (
      typeof child === "string" ||
      typeof child === "number" ||
      typeof child === "boolean" ||
      child == null
    ) {
      return this.getDocument().createTextNode(
        child == null ? "" : String(child)
      );
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

  protected booleanishAttr(name: string, value: boolean | undefined): this {
    return this.attr(
      name,
      value === undefined ? undefined : value ? "true" : "false"
    );
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
