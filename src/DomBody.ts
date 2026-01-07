import { BaseDom } from "./BaseDom";

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
