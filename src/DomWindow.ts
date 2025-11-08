/**
 * Wrapper for the global `window` object with typed event listener utilities.
 * Useful for managing global events like resize, scroll, or keyboard shortcuts.
 */
export class DomWindow {
  /**
   * Adds an event listener to the window.
   * @param type - The event type (e.g., "click", "input", "mouseenter").
   * @param handler - The event handler function.
   * @param options - Optional event listener options.
   * @return This instance for chaining.
   */
  on<T extends keyof WindowEventMap>(
    type: T,
    handler: (ev: WindowEventMap[T] & { currentTarget: Window }) => void,
    options?: boolean | AddEventListenerOptions
  ) {
    window.addEventListener(type, handler as any, options);
    return this;
  }

  /**
   * Removes an event listener from the window.
   * @param type - The event type to remove.
   * @param handler - The original handler function.
   * @param options - Optional event listener options.
   * @return This DomElement instance for chaining.
   */
  off<T extends keyof WindowEventMap>(
    type: T,
    handler: (ev: WindowEventMap[T]) => void,
    options?: boolean | EventListenerOptions
  ) {
    window.removeEventListener(type, handler as any, options);
    return this;
  }

  /**
   * Dispatches a DOM event on the window object.
   *
   * @param event - The corresponding event instance (e.g., `new Event("resize")`, `new KeyboardEvent("keydown")`).
   * @return This instance for chaining.
   */
  dispatch(event: Event) {
    window.dispatchEvent(event);
    return this;
  }
}

/**
 * Creates a new DomWindow instance bound to the global `window` object.
 * Provides typed event listener utilities and fluent dispatching for built-in DOM events.
 *
 * Useful for managing global interactions like resize, scroll, keyboard shortcuts, or visibility changes.
 *
 * @return A DomWindow instance wrapping the global `window`.
 */
export function $window() {
  return new DomWindow();
}
