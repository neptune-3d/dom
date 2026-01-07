import { BaseDom } from "./BaseDom";
import type { ContentSecurityPolicy } from "./types";

/**
 * Wrapper for a `<head>` element with style and DOM composition utilities.
 * Accepts any `HTMLHeadElement`, including from iframes or synthetic documents.
 */
export class DomHead extends BaseDom<HTMLHeadElement> {
  /**
   * Creates a new `DomHead` wrapper bound to the provided `<head>` element.
   * Defaults to the current document's `<head>` if none is supplied.
   *
   * This ensures all operations performed through the wrapper are scoped
   * to the correct document context (main page, iframe, or synthetic document).
   *
   * @param head - Optional `<head>` element to wrap. Defaults to `document.head`.
   */
  constructor(head: HTMLHeadElement = document.head) {
    super();
    this._head = head;
  }

  protected _head: HTMLHeadElement;

  /**
   * Returns the underlying `<head>` element wrapped by this `DomHead` instance.
   * Enables direct DOM access for interoperability with native APIs or manual manipulation.
   *
   * @return The wrapped `HTMLHeadElement`.
   */
  get dom(): HTMLHeadElement {
    return this._head;
  }

  /**
   * Sets or updates the document's `<title>` element inside the `<head>`.
   * Ensures only one `<title>` exists — updates if found, creates if missing.
   *
   * @param text - The title text to apply.
   * @return This instance for chaining.
   */
  title(text: string): this {
    let titleEl = this.query<"title">("title");

    if (!titleEl) {
      titleEl = this.getDocument().createDomElement("title");
      this.add(titleEl);
    }

    titleEl.text(text);

    return this;
  }

  /**
   * Sets or updates the `<meta charset="...">` tag in the `<head>`.
   * Ensures only one charset declaration exists — updates if found, creates if missing.
   *
   * @param encoding - The character encoding to set (e.g. "UTF-8").
   * @return This instance for chaining.
   */
  charset(encoding: string): this {
    let metaEl = this.query<"meta">("meta[charset]");

    if (!metaEl) {
      metaEl = this.getDocument().createDomElement("meta");
      this.insertBefore(metaEl, this.getFirstChildNode());
    }

    metaEl.attr("charset", encoding);

    return this;
  }

  /**
   * Sets or updates the `<meta name="viewport">` tag in the `<head>`.
   * Ensures only one viewport declaration exists — updates if found, creates if missing.
   *
   * @param content - The viewport configuration string (e.g. "width=device-width, initial-scale=1").
   * @return This instance for chaining.
   */
  viewport(content: string): this {
    let metaEl = this.query<"meta">(`meta[name="viewport"]`);

    if (!metaEl) {
      metaEl = this.getDocument().createDomElement("meta");
      metaEl.attr("name", "viewport");
      this.add(metaEl);
    }

    metaEl.attr("content", content);

    return this;
  }

  /**
   * Sets or updates a `<meta http-equiv="...">` tag in the `<head>`.
   * Ensures only one tag per `http-equiv` value exists — updates if found, creates if missing.
   *
   * Common use cases include:
   * - `"refresh"` → auto-refresh or redirect
   * - `"content-type"` → MIME type and charset
   * - `"X-UA-Compatible"` → browser compatibility mode
   *
   * @param httpEquiv - The `http-equiv` directive (e.g. "refresh", "content-type").
   * @param content - The `content` value to apply.
   * @return This instance for chaining.
   */
  httpEquiv(httpEquiv: string, content: string): this {
    let metaEl = this.query<"meta">(`meta[http-equiv="${httpEquiv}"]`);

    if (!metaEl) {
      metaEl = this.getDocument().createDomElement("meta");
      metaEl.attr("http-equiv", httpEquiv);
      this.add(metaEl);
    }

    metaEl.attr("content", content);

    return this;
  }

  /**
   * Sets or updates the `<meta http-equiv="Content-Security-Policy">` tag in the `<head>`.
   * Accepts a structured object to declaratively build the CSP string.
   *
   * @param policy - An object mapping CSP directives to space-separated values.
   * @return This instance for chaining.
   *
   * @example
   * head.csp({
   *   "default-src": "'self'",
   *   "script-src": "'self' https://cdn.example.com",
   *   "style-src": "'self' 'unsafe-inline'",
   *   "frame-src": "https://trusted.com"
   * });
   */
  csp(policy: ContentSecurityPolicy): this {
    const content = Object.entries(policy)
      .map(([directive, value]) => `${directive} ${value}`)
      .join("; ");

    return this.httpEquiv("Content-Security-Policy", content);
  }

  /**
   * Sets or updates the `<meta name="description">` tag in the `<head>`.
   * Ensures only one description tag exists — updates if found, creates if missing.
   *
   * Commonly used for SEO and social previews.
   *
   * @param text - The description content to apply.
   * @return This instance for chaining.
   */
  description(text: string): this {
    let metaEl = this.query<"meta">(`meta[name="description"]`);

    if (!metaEl) {
      metaEl = this.getDocument().createDomElement("meta");
      metaEl.attr("name", "description");
      this.add(metaEl);
    }

    metaEl.attr("content", text);

    return this;
  }

  /**
   * Sets or updates the `<meta name="keywords">` tag in the `<head>`.
   * Ensures only one keywords tag exists — updates if found, creates if missing.
   *
   * Keywords help search engines understand page relevance, though modern SEO relies more on content and structure.
   *
   * @param text - A comma-separated list of keywords.
   * @return This instance for chaining.
   */
  keywords(text: string): this {
    let metaEl = this.query<"meta">(`meta[name="keywords"]`);

    if (!metaEl) {
      metaEl = this.getDocument().createDomElement("meta");
      metaEl.attr("name", "keywords");
      this.add(metaEl);
    }

    metaEl.attr("content", text);

    return this;
  }

  /**
   * Sets or updates a `<link>` tag in the `<head>` by `rel`.
   * Ensures only one `<link rel="...">` exists — updates if found, creates if missing.
   *
   * Common use cases include:
   * - `"stylesheet"` → external CSS
   * - `"icon"` → favicon
   * - `"manifest"` → web app manifest
   *
   * @param rel - The `rel` attribute (e.g. "stylesheet", "icon").
   * @param href - The `href` value to apply (URL or path to the resource).
   * @param attributes - Optional additional attributes (e.g. type, media, sizes).
   * @return This instance for chaining.
   */
  link(
    rel: string,
    href: string,
    attributes: Record<string, string> = {}
  ): this {
    let linkEl = this.query<"link">(`link[rel="${rel}"]`);

    if (!linkEl) {
      linkEl = this.getDocument().createDomElement("link");
      linkEl.attr("rel", rel);
      this.add(linkEl);
    }

    linkEl.attr("href", href);

    for (const [key, value] of Object.entries(attributes)) {
      linkEl.attr(key, value);
    }

    return this;
  }
}

/**
 * Creates a `DomHead` wrapper for the `<head>` element.
 * Defaults to the main document, but accepts an optional `HTMLHeadElement`.
 *
 * @param head - Optional `<head>` element to wrap (defaults to `document.head`).
 * @return A `DomHead` instance for fluent head manipulation.
 */
export function $head(head?: HTMLHeadElement): DomHead {
  return new DomHead(head);
}
