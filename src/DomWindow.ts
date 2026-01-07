import { DomDocument } from "./DomDocument";

/**
 * Wrapper for a `Window` object with typed event listener utilities.
 * Useful for managing global events like resize, scroll, or keyboard shortcuts.
 */
export class DomWindow {
  /**
   * Creates a new `DomWindow` wrapper bound to the specified `Window`.
   * Defaults to the global `window` object if none is provided.
   *
   * This allows you to scope window-level operations to a particular context,
   * such as the main browsing window, an iframe, or a synthetic window created
   * for testing. The wrapper provides typed utilities for managing global events
   * like resize, scroll, or keyboard shortcuts.
   *
   * @param win - Optional `Window` instance to wrap. Defaults to the global `window`.
   */
  constructor(win: Window = window) {
    this._window = win;
  }

  protected _window: Window;

  protected _computedStyles = new WeakMap<Element, CSSStyleDeclaration>();

  /**
   * Returns the wrapped `Window` instance.
   */
  get dom(): Window {
    return this._window;
  }

  /**
   * Returns the associated `DomDocument` for this window.
   */
  getDocument(): DomDocument {
    return new DomDocument(this._window.document);
  }

  /**
   * Returns the computed styles for a given element.
   *
   * - Wraps `window.getComputedStyle()` but uses the correct `Window` associated
   *   with this `DomWindow` instance.
   * - Useful for reading resolved values of inherited, cascaded, or shorthand CSS properties.
   * - By default, caches the result to avoid repeated style recalculation.
   * - Pass `force = true` to recompute and update the cache.
   *
   * @param el - The element whose styles should be computed.
   * @param force - Whether to force recomputation (default: false).
   * @return The computed style object for the element.
   */
  getComputedStyle(el: Element, force: boolean = false): CSSStyleDeclaration {
    let style = this._computedStyles.get(el);

    if (force || !style) {
      style = this._window.getComputedStyle(el);
      this._computedStyles.set(el, style);
    }

    return style;
  }

  /**
   * Adds an event listener to the window.
   * @param type - The event type (e.g., "resize", "scroll", "keydown").
   * @param handler - The event handler function.
   * @param options - Optional event listener options.
   * @return This instance for chaining.
   */
  on<T extends keyof WindowEventMap>(
    type: T,
    handler: (ev: WindowEventMap[T] & { currentTarget: Window }) => void,
    options?: boolean | AddEventListenerOptions
  ): this {
    this._window.addEventListener(type, handler as any, options);
    return this;
  }

  /**
   * Removes an event listener from the window.
   * @param type - The event type to remove.
   * @param handler - The original handler function.
   * @param options - Optional event listener options.
   * @return This instance for chaining.
   */
  off<T extends keyof WindowEventMap>(
    type: T,
    handler: (ev: WindowEventMap[T]) => void,
    options?: boolean | EventListenerOptions
  ): this {
    this._window.removeEventListener(type, handler as any, options);
    return this;
  }

  /**
   * Dispatches a DOM event on the window object.
   *
   * @param event - The corresponding event instance (e.g., `new Event("resize")`).
   * @return This instance for chaining.
   */
  dispatch(event: Event): this {
    this._window.dispatchEvent(event);
    return this;
  }

  /**
   * Sends a message to the wrapped `Window` using `postMessage`.
   * Useful for communicating with same-origin or cross-origin windows that are listening for messages.
   *
   * ⚠️ Ensure the target window is ready to receive messages.
   * ⚠️ For cross-origin messaging, the receiver must explicitly validate origins.
   *
   * @param data - The message payload to send (any serializable object).
   * @param targetOrigin - The expected origin of the receiver (e.g. "https://example.com" or "*").
   * @return This instance for chaining.
   */
  postMessage(data: any, targetOrigin: string): this {
    this._window.postMessage(data, targetOrigin);
    return this;
  }
}

/**
 * Creates a `DomWindow` instance bound to the specified `Window` object.
 * Defaults to the global `window`, but can wrap any window (e.g., iframe's `contentWindow`).
 *
 * Useful for managing global interactions like resize, scroll, keyboard shortcuts, or visibility changes.
 *
 * @param win - Optional `Window` instance to wrap (defaults to global `window`).
 * @return A `DomWindow` instance wrapping the given window.
 */
export function $window(win?: Window): DomWindow {
  return new DomWindow(win);
}
