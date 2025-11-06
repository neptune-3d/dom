import { BaseDom } from "./BaseDom";

/**
 * Wrapper for document.body with style and DOM composition utilities.
 * Enables fluent styling and child node management.
 */
export class DomBody extends BaseDom<HTMLBodyElement> {
  get dom() {
    return document.body as HTMLBodyElement;
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
export function $body() {
  return new DomBody();
}
