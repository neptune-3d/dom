import { BaseDom } from "./BaseDom";
import type { DomElementTagNameMap } from "./types";
import { createElement, isSvgTag, normalizeTag } from "./utils";

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

    this._tag = normalizeTag(tag) as Tag;
    this._isSvg = isSvgTag(this._tag);

    this._dom = el ?? createElement(document, tag);
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
  title(value: string | undefined): this {
    return this.attr("title", value);
  }

  /**
   * Sets or removes the `disabled` attribute on the element.
   * Applicable to form controls like `<button>`, `<input>`, `<select>`, etc.
   * Passing `true` sets the attribute; `false` removes it.
   *
   * @param value - Whether the element should be disabled.
   * @return This DomElement instance for chaining.
   */
  disabled(value: boolean): this {
    return this.attr("disabled", value);
  }

  /**
   * Focuses this DOM element, if it supports focus.
   * For non-focusable elements (like SVG or body), ensure `tabindex` is set if needed.
   *
   * @return This instance for chaining.
   */
  focus(): this {
    this.dom.focus();
    return this;
  }

  /**
   * Removes focus from this DOM element, if it supports blur.
   * For non-focusable elements, this is a no-op.
   *
   * @return This instance for chaining.
   */
  blur(): this {
    this.dom.blur();
    return this;
  }

  /**
   * Programmatically clicks this DOM element, if it supports click.
   * Useful for triggering buttons, links, or custom handlers.
   *
   * @return This instance for chaining.
   */
  click(): this {
    if (!this.isSvg) {
      (this.dom as HTMLElement).click();
    }
    return this;
  }

  /**
   * Sets or removes the `popover` attribute on the element.
   * Applies to HTML elements that support the Popover API (e.g., `<div popover>`).
   * Passing `undefined` removes the attribute.
   *
   * Supported values:
   * - `"auto"` → Automatically shows/hides based on user interaction.
   * - `"manual"` → Requires explicit show/hide via JavaScript.
   * - `"hint"` → Lightweight tooltip-style popover (shown on hover/focus).
   *
   * @param value - The popover mode (`"auto"`, `"manual"`, or `"hint"`), or `undefined` to remove it.
   * @return This DomElement instance for chaining.
   */
  popover(value: "auto" | "manual" | "hint" | undefined): this {
    return this.attr("popover", value);
  }

  /**
   * Sets or removes the `popovertarget` attribute on the element.
   * This links the element to a popover by ID, allowing it to trigger or control that popover.
   * Passing `undefined` removes the attribute.
   *
   * @param value - The ID of the target popover element, or `undefined` to remove the attribute.
   * @return This DomElement instance for chaining.
   */
  popoverTarget(value: string | undefined): this {
    return this.attr("popovertarget", value);
  }

  /**
   * Sets or removes the `popovertargetaction` attribute on the element.
   * This defines the action to perform on the target popover when the element is activated.
   * Pass `undefined` to remove the attribute.
   *
   * Valid values:
   * - `"show"` → Opens the target popover.
   * - `"hide"` → Closes the target popover.
   * - `"toggle"` → Toggles the target popover.
   *
   * @param value - The action to apply, or `undefined` to remove the attribute.
   * @return This DomElement instance for chaining.
   */
  popoverTargetAction(value: "show" | "hide" | "toggle" | undefined): this {
    return this.attr("popovertargetaction", value);
  }

  /**
   * Shows the popover on this element.
   * Requires the element to have a `popover="manual"` attribute and be in the DOM.
   *
   * Optionally accepts a `source` HTMLElement that acts as the invoker,
   * improving accessibility and enabling anchor positioning.
   *
   * @param source - An optional HTMLElement to act as the popover's invoker.
   * @return This DomElement instance for chaining.
   */
  showPopover(source?: HTMLElement): this {
    (this.dom as any).showPopover({ source });
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

  /**
   * Toggles the popover visibility on this element.
   * Requires the element to have a `popover="manual"` attribute and be in the DOM.
   *
   * @param force - If true, forces the popover to show; if false, forces it to hide; if undefined, toggles.
   * @param source - An optional HTMLElement that acts as the invoker, improving accessibility and anchor positioning.
   * @return This DomElement instance for chaining.
   */
  togglePopover(force?: boolean, source?: HTMLElement): this {
    (this.dom as any).togglePopover({ force, source });
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
 * Queries the DOM for a matching element and wraps it in a `DomElement`.
 * Returns `null` if no element matches the selector.
 *
 * This enables fluent manipulation using your custom DOM API.
 *
 * @param selector - A CSS selector string to locate the element.
 * @return A `DomElement` wrapping the matched element, or `null` if not found.
 */
export function $query<T extends keyof DomElementTagNameMap>(
  selector: string
): DomElement<T> | null {
  const el = document.querySelector(selector);
  return el
    ? new DomElement<T>(
        el.tagName.toLowerCase() as T,
        el as DomElementTagNameMap[T]
      )
    : null;
}
