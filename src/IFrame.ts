import { DomDocument } from "./DomDocument";
import { DomElement } from "./DomElement";
import { DomWindow } from "./DomWindow";
import type { DomElementTagNameMap, IFrameSandboxFlag } from "./types";
import { getStyleValue } from "./utils";

/**
 * Fluent wrapper for the `<iframe>` element, extending `DomElement<"iframe">` with iframe-specific APIs.
 * Inherits styling and DOM manipulation capabilities from `BaseStyle → BaseDom → DomElement`.
 *
 * Provides ergonomic methods for setting `src`, sizing, fullscreen permissions, and reloading.
 * Designed for declarative composition, chaining, and integration with dynamic layout systems.
 *
 * Example:
 * ```ts
 * $iframe()
 *   .src("https://example.com")
 *   .width(800)
 *   .height(600)
 *   .allowFullscreen();
 * ```
 */
export class IFrame extends DomElement<"iframe"> {
  constructor() {
    super("iframe");
  }

  /**
   * Returns a `DomWindow` wrapper for the iframe's `contentWindow`.
   * Enables typed event handling and DOM access within the iframe's window context.
   *
   * ⚠️ Cross-origin iframes will restrict access to most properties for security reasons.
   *
   * @return A `DomWindow` instance wrapping the iframe's window, or `null` if inaccessible.
   */
  getContentWindow(): DomWindow | null {
    const win = this.dom.contentWindow;
    return win ? new DomWindow(win) : null;
  }

  /**
   * Returns a `DomDocument` wrapper for the iframe's `contentDocument`.
   * This enables typed event handling and DOM utilities inside the iframe.
   *
   * ⚠️ Returns `null` if the iframe is cross-origin or not yet loaded.
   *
   * @return A `DomDocument` instance wrapping the iframe's document, or `null` if inaccessible.
   */
  getContentDocument(): DomDocument | null {
    const doc = this.dom.contentDocument;
    return doc ? new DomDocument(doc) : null;
  }

  /**
   * Checks whether the iframe is same-origin with the parent document.
   * Attempts to access `contentWindow.location.href` and catches any security error.
   *
   * @return `true` if same-origin, `false` if cross-origin or inaccessible.
   */
  isSameOrigin(): boolean {
    try {
      void this.dom.contentWindow?.location.href;
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Sets the `src` attribute of the `<iframe>` element.
   * Defines the URL to load inside the iframe. Can be same-origin or cross-origin.
   * This triggers a navigation and replaces the iframe's current content.
   *
   * @param value - The URL to load in the iframe.
   * @return This instance for chaining.
   */
  src(value: string): this {
    this.dom.src = value;
    return this;
  }

  /**
   * Enables or disables the `allowFullscreen` capability on the `<iframe>`.
   * When `true`, allows the iframe content to request fullscreen mode via the Fullscreen API.
   *
   * @param value - Whether to allow fullscreen requests (default is `true`).
   * @return This instance for chaining.
   */
  allowFullscreen(value = true): this {
    this.dom.allowFullscreen = value;
    return this;
  }

  /**
   * Sets the `width` attribute of the `<iframe>` element.
   * Accepts a numeric value in pixels and applies it via the `width` DOM property.
   * Uses `getStyleValue("width", value)` to normalize units or apply custom logic.
   *
   * @param value - The desired width in pixels.
   * @return This instance for chaining.
   */
  width(value: number): this {
    this.dom.width = getStyleValue("width", value);
    return this;
  }

  /**
   * Sets the `height` attribute of the `<iframe>` element.
   * Accepts a numeric value in pixels and applies it via the `height` DOM property.
   * Uses `getStyleValue("height", value)` to normalize units or apply custom logic.
   *
   * @param value - The desired height in pixels.
   * @return This instance for chaining.
   */
  height(value: number): this {
    this.dom.height = getStyleValue("height", value);
    return this;
  }

  /**
   * Sets both the `width` and `height` attributes of the `<iframe>` element.
   * Delegates to `.width()` and `.height()` internally for unit normalization and chaining.
   * Useful for concise, declarative sizing of the iframe in pixels.
   *
   * @param width - The desired width in pixels.
   * @param height - The desired height in pixels.
   * @return This instance for chaining.
   */
  size(width: number, height: number): this {
    return this.width(width).height(height);
  }

  /**
   * Sets or removes the `sandbox` attribute to restrict iframe capabilities.
   * Accepts an array of sandbox flags (typed) or `undefined` to remove the attribute.
   *
   * @param flags - Array of allowed sandbox flags, or `undefined` to remove the attribute.
   * @return This instance for chaining.
   */
  sandbox(flags: IFrameSandboxFlag[] | undefined): this {
    const value = flags?.join(" ");
    return this.attr("sandbox", value);
  }

  /**
   * Sets the `referrerPolicy` attribute to control referrer behavior for iframe requests.
   * Accepts values like "no-referrer", "origin", "strict-origin", etc.
   *
   * @param value - The referrer policy to apply.
   * @return This instance for chaining.
   */
  referrerPolicy(value: ReferrerPolicy): this {
    this.dom.referrerPolicy = value;
    return this;
  }

  /**
   * Sets the `loading` attribute to control iframe loading behavior.
   * Use `"lazy"` to defer loading until the iframe is near the viewport.
   *
   * @param value - `"lazy"` or `"eager"`.
   * @return This instance for chaining.
   */
  loading(value: "lazy" | "eager"): this {
    this.dom.loading = value;
    return this;
  }

  /**
   * Reloads the iframe by reassigning its `src` attribute.
   * Works even for cross-origin iframes, as long as `src` is set.
   * This is the most broadly compatible reload strategy.
   * @return This instance for chaining.
   */
  reloadViaSrc(): this {
    if (this.dom.src) {
      this.dom.src = this.dom.src;
    }
    return this;
  }

  /**
   * Reloads the iframe using its `contentWindow.location.reload()` method.
   * Only works for same-origin iframes. Throws a security error if cross-origin.
   * @return This instance for chaining.
   */
  reloadViaLocation(): this {
    this.dom.contentWindow?.location.reload();
    return this;
  }

  /**
   * Reloads the iframe using the most appropriate strategy:
   *
   * - Attempts `contentWindow.location.reload()` for same-origin iframes, which preserves dynamic state and scroll position.
   * - Falls back to reassigning `src` for cross-origin iframes or when `contentWindow` is inaccessible.
   *
   * This ensures robust behavior across both same-origin and cross-origin scenarios.
   *
   * @return This instance for chaining.
   */
  reload(): this {
    try {
      this.dom.contentWindow?.location.reload();
    } catch {
      if (this.dom.src) {
        this.dom.src = this.dom.src;
      }
    }
    return this;
  }

  /**
   * Queries the iframe's `contentDocument` for a matching element and wraps it in a `DomElement`.
   * Only works for same-origin iframes. Returns `null` if the iframe is cross-origin, inaccessible, or the element is not found.
   *
   * This enables safe DOM querying inside iframes with fluent manipulation.
   *
   * @param selector - CSS selector to query inside the iframe.
   * @return A `DomElement` wrapping the matched element, or `null` if not found or inaccessible.
   */
  queryInside<T extends keyof DomElementTagNameMap>(
    selector: string
  ): DomElement<T> | null {
    const el = this.getContentDocument()?.dom.querySelector(selector);
    return el
      ? new DomElement<T>(
          el.tagName.toLowerCase() as T,
          el as DomElementTagNameMap[T]
        )
      : null;
  }

  /**
   * Sends a message to the iframe's `contentWindow` using `postMessage`.
   * Only works for same-origin iframes or cross-origin targets that accept messages.
   *
   * ⚠️ Ensure the iframe is loaded and the target window is ready to receive messages.
   * ⚠️ For cross-origin messaging, the receiver must explicitly validate origins.
   *
   * @param data - The message payload to send (any serializable object).
   * @param targetOrigin - The expected origin of the receiver (e.g. "https://example.com" or "*").
   * @return This instance for chaining.
   */
  postMessage(data: any, targetOrigin: string): this {
    const win = this.getContentWindow();
    if (win) win.postMessage(data, targetOrigin);
    return this;
  }
}

/**
 * Creates a new `IFrame` instance with a wrapped `<iframe>` element.
 * This provides access to the fluent iframe API, including sizing, messaging, reload strategies,
 * and DOM interaction helpers for same-origin content.
 *
 * @return A new `IFrame` instance.
 */
export function $iframe(): IFrame {
  return new IFrame();
}
