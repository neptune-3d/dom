import { DomElement } from "./DomElement";

/**
 * Represents a styled `<input type="range">` element with fluent configuration methods.
 * Inherits DOM manipulation and style capabilities from `DomElement`, `BaseDom`, and `BaseStyle`.
 * Provides ergonomic setters for common range input attributes (`min`, `max`, `step`, `value`, `name`),
 * and exposes a typed `getValue()` accessor for reading the current numeric value.
 *
 * Designed for declarative UI composition and chaining, with full support for styling, layout, and interactivity.
 *
 * Example usage:
 *   new InputRange()
 *     .min(0)
 *     .max(100)
 *     .step(5)
 *     .value(50)
 *     .bWidth(1)
 *     .bStyle("solid")
 *     .bColor("#ccc");
 */
export class InputRange extends DomElement<"input"> {
  constructor() {
    super("input");

    this.dom.type = "range";
  }

  /**
   * Returns the current numeric value of the range input.
   * Converts the underlying string value to a number for type-safe access.
   * Useful for reading user-selected values in event handlers or form logic.
   *
   * @return The current value as a number.
   */
  getValue(): number {
    return Number(this.dom.value);
  }

  /**
   * Returns the configured minimum value of the range input.
   * Converts the string `min` attribute to a number.
   * Useful for validation, clamping, or dynamic UI feedback.
   *
   * @return The minimum value as a number.
   */
  getMin(): number {
    return Number(this.dom.min);
  }

  /**
   * Returns the configured maximum value of the range input.
   * Converts the string `max` attribute to a number.
   * Useful for validation, clamping, or dynamic UI feedback.
   *
   * @return The maximum value as a number.
   */
  getMax(): number {
    return Number(this.dom.max);
  }

  /**
   * Returns the configured step increment of the range input.
   * Converts the string `step` attribute to a number.
   * Useful for calculating snap points or enforcing input granularity.
   *
   * @return The step value as a number.
   */
  getStep(): number {
    return Number(this.dom.step);
  }

  /**
   * Sets the `name` attribute of the range input.
   * Useful for form serialization, accessibility, and identifying the input in event handlers or submissions.
   *
   * @param value - The name to assign to the input element.
   * @return This instance for chaining.
   */
  name(value: string): this {
    this.dom.name = value;
    return this;
  }

  /**
   * Sets the current value of the range input.
   * Converts the number to a string for DOM compatibility.
   * Useful for initializing or programmatically updating the slider position.
   *
   * @param value - The numeric value to assign to the input.
   * @return This instance for chaining.
   */
  value(value: number): this {
    this.dom.value = String(value);
    return this;
  }

  /**
   * Sets the `min` attribute of the range input.
   * Defines the lowest selectable value in the range.
   * Converts the number to a string for DOM compatibility.
   *
   * @param value - The minimum value allowed by the input.
   * @return This instance for chaining.
   */
  min(value: number): this {
    this.dom.min = String(value);
    return this;
  }

  /**
   * Sets the `max` attribute of the range input.
   * Defines the highest selectable value in the range.
   * Converts the number to a string for DOM compatibility.
   *
   * @param value - The maximum value allowed by the input.
   * @return This instance for chaining.
   */
  max(value: number): this {
    this.dom.max = String(value);
    return this;
  }

  /**
   * Sets the `step` attribute of the range input.
   * Controls the increment between selectable values.
   * Converts the number to a string for DOM compatibility.
   *
   * @param value - The step size between values.
   * @return This instance for chaining.
   */
  step(value: number): this {
    this.dom.step = String(value);
    return this;
  }

  /**
   * Sets the `min`, `max`, and `step` attributes of the range input.
   * Accepts individual numeric parameters for ergonomic and explicit configuration.
   * Useful for declaratively defining the full range boundaries.
   *
   * @param min - The minimum value of the range.
   * @param max - The maximum value of the range.
   * @param step - The step increment between values.
   * @return This instance for chaining.
   */
  bounds(min: number, max: number, step: number): this {
    return this.min(min).max(max).step(step);
  }
}
