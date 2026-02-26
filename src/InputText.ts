import { DomElement } from "./DomElement";

/**
 * A wrapper for an an `<input type="text">` DomElement.
 *
 * Contains text-specific methods.
 */
export class InputText extends DomElement<"input"> {
  constructor() {
    super("input");
    this.dom.type = "text";
  }

  /**
   * Returns the `name` property.
   *
   * @returns The `name` property.
   */
  getName(): string {
    return this.dom.name;
  }

  /**
   * Returns the `value` property as a string.
   *
   * @returns The `value` property.
   */
  getValue() {
    return this.dom.value;
  }

  /**
   * Sets the `name` property.
   *
   * @param value The value to set.
   * @returns this instance for chaining.
   */
  name(value: string): this {
    this.dom.name = value;
    return this;
  }

  /**
   * Sets the `value` property as a string.
   *
   * @param value The value to set.
   * @returns this instance for chaining.
   */
  value(value: string) {
    this.dom.value = value;
    return this;
  }

  /**
   * Sets the `placeholder` property.
   *
   * @param value The value to set.
   * @returns this instance for chaining.
   */
  placeholder(value: string): this {
    this.dom.placeholder = value;
    return this;
  }
}
