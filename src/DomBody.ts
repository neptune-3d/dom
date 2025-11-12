import { BaseDom } from "./BaseDom";

/**
 * Wrapper for a `<body>` element with style and DOM composition utilities.
 * Accepts any `HTMLBodyElement`, including from iframes or synthetic documents.
 */
export class DomBody extends BaseDom<HTMLBodyElement> {
  constructor(body: HTMLBodyElement) {
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
 * @return A DomBody instance wrapping `document.body`.
 */
export function $body(body?: HTMLBodyElement): DomBody {
  return new DomBody(body ?? (document.body as HTMLBodyElement));
}
