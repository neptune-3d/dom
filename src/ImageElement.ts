import { DomElement } from "./DomElement";

/**
 * Fluent wrapper for an `<img>` element.
 * Provides chainable methods for setting image source, dimensions, and alt text.
 * Inherits style and event utilities from `DomElement` and `BaseDom`.
 *
 * Useful for programmatically constructing image elements with ergonomic, declarative syntax.
 */
export class ImageElement extends DomElement<"img"> {
  constructor() {
    super("img");
  }

  /**
   * Returns the `naturalWidth` of the image.
   * This is the intrinsic width of the image resource in pixels, unaffected by CSS or layout.
   * Returns `0` if the image has not loaded or failed to decode.
   *
   * @return The natural width in pixels.
   */
  getNaturalWidth(): number {
    return this.dom.naturalWidth ?? 0;
  }

  /**
   * Returns the `naturalHeight` of the image.
   * This is the intrinsic height of the image resource in pixels, unaffected by CSS or layout.
   * Returns `0` if the image has not loaded or failed to decode.
   *
   * @return The natural height in pixels.
   */
  getNaturalHeight(): number {
    return this.dom.naturalHeight ?? 0;
  }

  /**
   * Sets the `src` attribute of the `<img>` element.
   * Defines the image source URL or path to be loaded.
   *
   * @param value - The image source (e.g., "/logo.png", "https://example.com/photo.jpg").
   * @return This instance for chaining.
   */
  src(value: string) {
    this.dom.src = value;
    return this;
  }

  /**
   * Sets the `width` attribute of the `<img>` element in pixels.
   * This controls the rendered width of the image, independent of its intrinsic size.
   *
   * @param value - The width in pixels.
   * @return This instance for chaining.
   */
  width(value: number) {
    this.dom.width = value;
    return this;
  }

  /**
   * Sets the `height` attribute of the `<img>` element in pixels.
   * This controls the rendered height of the image, independent of its intrinsic size.
   *
   * @param value - The height in pixels.
   * @return This instance for chaining.
   */
  height(value: number) {
    this.dom.height = value;
    return this;
  }

  /**
   * Sets both the `width` and `height` attributes of the `<img>` element in pixels.
   * Useful for explicitly sizing the image without relying on CSS.
   *
   * @param width - The width in pixels.
   * @param height - The height in pixels.
   * @return This instance for chaining.
   */
  setSize(width: number, height: number) {
    return this.width(width).height(height);
  }

  /**
   * Sets the `alt` attribute of the `<img>` element.
   * Provides alternative text for accessibility and fallback rendering.
   *
   * @param value - The alt text (e.g., "User avatar", "Company logo").
   * @return This instance for chaining.
   */
  alt(value: string) {
    this.dom.alt = value;
    return this;
  }
}

/**
 * Creates a new `ImageElement` instance.
 * Equivalent to: `new ImageElement()`, but more expressive in fluent DOM construction.
 *
 * @return A new `ImageElement` instance.
 */
export function $img() {
  return new ImageElement();
}
