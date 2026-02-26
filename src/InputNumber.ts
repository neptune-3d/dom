import { DomElement } from "./DomElement";

/**
 * A wrapper for an an `<input type="text">` DomElement.
 *
 * Contains number-specific methods and value is typed as number.
 */
export class InputNumber extends DomElement<"input"> {
  constructor() {
    super("input");
    this.dom.type = "number";
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
   * Returns the `value` property converted to a number.
   *
   * @returns The current value as a number.
   */
  getValue(): number {
    return Number(this.dom.value);
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
   * Sets the `value` property. Converts the value to string if a number is passed.
   *
   * @param value The numeric value to assign to the input.
   * @returns this instance for chaining.
   */
  value(value: string | number): this {
    this.dom.value = String(value);
    return this;
  }

  /**
   * Sets the `min` property. Converts the value to string if a number is passed.
   *
   * @param value The minimum value allowed by the input.
   * @returns this instance for chaining.
   */
  min(value: string | number): this {
    this.dom.min = String(value);
    return this;
  }

  /**
   * Sets the `max` property. Converts the value to string if a number is passed.
   *
   * @param value The maximum value allowed by the input.
   * @returns this instance for chaining.
   */
  max(value: string | number): this {
    this.dom.max = String(value);
    return this;
  }

  /**
   * Sets the `step` property. Converts the value to string if a number is passed.
   *
   * @param value The step size between values.
   * @returns this instance for chaining.
   */
  step(value: string | number): this {
    this.dom.step = String(value);
    return this;
  }

  /**
   * Sets the `min`, `max`, and `step` properties of the range input.
   *
   * @param min The minimum value of the range.
   * @param max The maximum value of the range.
   * @param step The step increment between values.
   * @returns this instance for chaining.
   */
  bounds(min: number, max: number, step: number): this {
    return this.min(min).max(max).step(step);
  }

  /**
   * Sets the placeholder property.
   *
   * @param value The value to set.
   * @returns this instance for chaining.
   */
  placeholder(value: string) {
    this.dom.placeholder = value;
    return this;
  }
}
