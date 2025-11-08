/**
 * Wrapper for the global `document` object with typed event listener utilities.
 * Useful for managing document-level events like visibility changes, selection, or clipboard interactions.
 */
export class DomDocument {
  /**
   * Adds an event listener to the document.
   * @param type - The event type (e.g., "visibilitychange", "copy", "selectionchange").
   * @param handler - The event handler function.
   * @param options - Optional event listener options.
   * @return This instance for chaining.
   */
  on<T extends keyof DocumentEventMap>(
    type: T,
    handler: (ev: DocumentEventMap[T] & { currentTarget: Document }) => void,
    options?: boolean | AddEventListenerOptions
  ) {
    document.addEventListener(type, handler as any, options);
    return this;
  }

  /**
   * Removes an event listener from the document.
   * @param type - The event type to remove.
   * @param handler - The original handler function.
   * @param options - Optional event listener options.
   * @return This instance for chaining.
   */
  off<T extends keyof DocumentEventMap>(
    type: T,
    handler: (ev: DocumentEventMap[T]) => void,
    options?: boolean | EventListenerOptions
  ) {
    document.removeEventListener(type, handler as any, options);
    return this;
  }

  /**
   * Dispatches a DOM event on the document object.
   *
   * @param event - The corresponding event instance (e.g., `new Event("visibilitychange")`, `new ClipboardEvent("copy")`).
   * @return This instance for chaining.
   */
  dispatch(event: Event) {
    document.dispatchEvent(event);
    return this;
  }
}

/**
 * Creates a new DomDocument instance bound to the global `document` object.
 * Provides typed event listener utilities and fluent dispatching for document-level DOM events.
 *
 * Useful for managing visibility state, clipboard interactions, selection changes, or custom document-wide signaling.
 *
 * @return A DomDocument instance wrapping the global `document`.
 */
export function $document() {
  return new DomDocument();
}
