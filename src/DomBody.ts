import { BaseDom } from "./BaseDom";
import type { DomElement } from "./DomElement";
import { queryDomElement } from "./queryDomElement";
import type { DomElementTagNameMap } from "./types";

/**
 * Wrapper for a `<body>` element with style and DOM composition utilities.
 * Accepts any `HTMLBodyElement`, including from iframes or synthetic documents.
 */
export class DomBody extends BaseDom<HTMLBodyElement> {
  /**
   * Creates a new `DomBody` wrapper bound to the provided `<body>` element.
   * Defaults to the current document's `body` if none is supplied.
   *
   * This ensures all operations performed through the wrapper are scoped
   * to the correct document context (main page, iframe, or synthetic document).
   *
   * @param body - Optional `<body>` element to wrap. Defaults to `document.body`.
   */
  constructor(body: HTMLBodyElement = document.body as HTMLBodyElement) {
    super();
    this._body = body;
  }

  protected _body: HTMLBodyElement;

  /**
   * Returns the underlying `<body>` element wrapped by this `DomBody` instance.
   * Enables direct DOM access for interoperability with native APIs or manual manipulation.
   *
   * @return The wrapped `HTMLBodyElement`.
   */
  get dom(): HTMLBodyElement {
    return this._body;
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
}

/**
 * Creates a new DomBody instance bound to `document.body`.
 * Provides fluent access to body-level styling, DOM composition, and event utilities.
 *
 * Useful for global layout scaffolding, dynamic content injection, or body-wide style control.
 *
 * @param body - Optional `<body>` element to wrap (defaults to `document.body`).
 * @return A DomBody instance wrapping the given or default `<body>`.
 */
export function $body(body?: HTMLBodyElement): DomBody {
  return new DomBody(body);
}
