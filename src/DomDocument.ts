import { DomBody } from "./DomBody";
import { DomElement } from "./DomElement";
import { DomHead } from "./DomHead";
import type { DomElementTagNameMap } from "./types";

/**
 * Wrapper for the global `document` object with typed event listener utilities.
 * Useful for managing document-level events like visibility changes, selection, or clipboard interactions.
 */
export class DomDocument {
  constructor(document: Document = window.document) {
    this._document = document;
  }

  protected _document: Document;

  /**
   * Returns the underlying `Document` instance wrapped by this `DomDocument`.
   * Useful for direct DOM access or interoperability with native APIs.
   *
   * @return The wrapped `Document` instance.
   */
  get dom(): Document {
    return this._document;
  }

  /**
   * Returns a `DomBody` wrapper for the document's `<body>` element.
   * Enables fluent DOM composition and styling for the document body.
   *
   * @return A `DomBody` instance wrapping the document's body.
   */
  getBody(): DomBody {
    return new DomBody(this._document.body as HTMLBodyElement);
  }

  /**
   * Returns a `DomHead` wrapper for the document's `<head>` element.
   * Enables fluent DOM composition and styling for the document head.
   *
   * @return A `DomHead` instance wrapping the document's head.
   */
  getHead(): DomHead {
    return new DomHead(this._document.head);
  }

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
    this._document.addEventListener(type, handler as any, options);
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
    this._document.removeEventListener(type, handler as any, options);
    return this;
  }

  /**
   * Dispatches a DOM event on the document object.
   *
   * @param event - The corresponding event instance (e.g., `new Event("visibilitychange")`, `new ClipboardEvent("copy")`).
   * @return This instance for chaining.
   */
  dispatch(event: Event) {
    this._document.dispatchEvent(event);
    return this;
  }

  /**
   * Queries the document for a single matching element and wraps it in a `DomElement`.
   * Returns `null` if no match is found.
   *
   * This enables fluent DOM manipulation with ergonomic chaining and type safety.
   *
   * @param selector - A valid CSS selector string.
   * @return A `DomElement` wrapper for the matched element, or `null` if not found.
   */
  query<T extends keyof DomElementTagNameMap>(
    selector: string
  ): DomElement<T> | null {
    const el = this._document.querySelector(selector);
    return el
      ? new DomElement<T>(
          el.tagName.toLowerCase() as T,
          el as DomElementTagNameMap[T]
        )
      : null;
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
