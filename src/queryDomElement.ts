import { DomElement } from "./DomElement";
import type { DomElementTagNameMap } from "./types";

/**
 * Queries a root element’s subtree for a single matching descendant and wraps it in a `DomElement`.
 * Returns `null` if no match is found.
 *
 * This is a reusable helper for fluent DOM composition and manipulation.
 *
 * @param root - The root element to query within.
 * @param selector - A valid CSS selector string.
 * @return A `DomElement` wrapper for the matched element, or `null` if not found.
 */
export function queryDomElement<T extends keyof DomElementTagNameMap>(
  root: Element | Document,
  selector: string
): DomElement<T> | null {
  const el = root.querySelector(selector);
  return el
    ? new DomElement<T>(
        el.tagName.toLowerCase() as T,
        el as DomElementTagNameMap[T]
      )
    : null;
}
