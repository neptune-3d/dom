import { DomElement } from "./DomElement";
import { queryDomElement } from "./queryDomElement";
import type { DomElementTagNameMap, DomNamespaceURI } from "./types";
import { createElement, getDocumentWindow } from "./utils";

/**
 * Wrapper for the global `document` object with typed event listener utilities.
 * Useful for managing document-level events like visibility changes, selection, or clipboard interactions.
 */
export class DomDocument {
  /**
   * Creates a new `DomDocument` wrapper bound to the specified `Document`.
   * Defaults to the global `window.document` if none is provided.
   *
   * This allows you to scope DOM operations to a particular document context,
   * such as the main page, an iframe, or a synthetic document created for testing.
   *
   * @param doc - Optional `Document` instance to wrap. Defaults to `window.document`.
   */
  constructor(doc: Document = window.document) {
    this._document = doc;
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
   * Returns the associated native `Window` for this document.
   *
   * - Resolves the correct `Window` from the document's `defaultView`.
   * - If the document is detached and has no `defaultView`, falls back to the global `window`.
   *
   * @return The native `Window` object.
   */
  getWindow(): Window {
    return getDocumentWindow(this.dom);
  }

  /**
   * Returns the associated native `<body>` element for this document.
   *
   * - Resolves via `document.body`.
   * - May be `null` if the document has no body (e.g., XML documents).
   *
   * @return The native `HTMLBodyElement` or `null`.
   */
  getBody(): HTMLBodyElement | null {
    return this._document.body as HTMLBodyElement;
  }

  /**
   * Returns the associated native `<head>` element for this document.
   *
   * - Resolves via `document.head`.
   * - May be `null` if the document has no head.
   *
   * @return The native `HTMLHeadElement` or `null`.
   */
  getHead(): HTMLHeadElement | null {
    return this._document.head;
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
   * Creates a text node in the context of this document.
   *
   * - Accepts strings, numbers, booleans, or any value with a predictable string representation.
   * - Ensures the node belongs to the same document as other elements you append to.
   *
   * @param value - The value to stringify into text.
   * @return A native Text node belonging to this document.
   */
  createTextNode(value: string | number | boolean | null | undefined): Text {
    return this._document.createTextNode(value == null ? "" : String(value));
  }

  /**
   * Creates an element in the context of this document.
   *
   * - Accepts a valid HTML tag name.
   * - Ensures the element belongs to the same document as other nodes you append to.
   * - Returns the native HTMLElement for direct DOM manipulation.
   *
   * @param tagName - The tag name of the element to create (e.g., "div", "span").
   * @return A native HTMLElement belonging to this document.
   */
  createElement<T extends keyof HTMLElementTagNameMap>(
    tagName: T
  ): HTMLElementTagNameMap[T] {
    return this._document.createElement(tagName);
  }

  /**
   * Creates an element in the context of this document with a specific namespace.
   *
   * - Use for HTML or SVG elements.
   * - Ensures the element belongs to the same document as other nodes you append to.
   * - Returns the native element typed according to the namespace.
   */
  createElementNS<T extends keyof SVGElementTagNameMap>(
    namespaceURI: "http://www.w3.org/2000/svg",
    qualifiedName: T
  ): SVGElementTagNameMap[T];

  createElementNS<T extends keyof HTMLElementTagNameMap>(
    namespaceURI: "http://www.w3.org/1999/xhtml",
    qualifiedName: T
  ): HTMLElementTagNameMap[T];

  createElementNS(
    namespaceURI: DomNamespaceURI,
    qualifiedName: string
  ): Element {
    return this._document.createElementNS(namespaceURI, qualifiedName);
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
    return queryDomElement(this.dom, selector);
  }

  /**
   * Creates a wrapped `DomElement` in the context of this document.
   *
   * - Accepts a valid HTML or SVG tag name.
   * - Ensures the element is created in this DomDocument's associated Document,
   *   so it belongs to the same context as other nodes you append to (main page,
   *   iframe, or synthetic document).
   * - Uses the appropriate namespace for SVG elements automatically.
   * - Returns a `DomElement` wrapper for fluent DOM manipulation.
   *
   * @param tag - The tag name of the element to create (e.g., "div", "span", "svg", "circle").
   * @return A `DomElement` instance wrapping the created element.
   */
  createDomElement<T extends keyof DomElementTagNameMap>(
    tag: T
  ): DomElement<T> {
    const el = createElement(this._document, tag);
    return new DomElement<T>(tag, el);
  }
}

/**
 * Creates a new DomDocument instance.
 * By default wraps the global `document`, but you can pass a custom Document
 * (e.g. from an iframe or JSDOM) for testing or specialized contexts.
 *
 * @param doc - Optional Document to wrap. Defaults to global `window.document`.
 * @return A DomDocument instance wrapping the given Document.
 */
export function $document(doc?: Document): DomDocument {
  return new DomDocument(doc ?? window.document);
}
