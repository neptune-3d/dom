import { DomElement } from "./DomElement";

/**
 * A typed wrapper around the native <progress> HTML element, extending the DomElement base class.
 *
 * Provides ergonomic methods for setting and retrieving progress state.
 *
 * This class is designed for declarative composition and fluent chaining, and integrates
 * seamlessly with the DomElement styling and layout system.
 */
export class ProgressElement extends DomElement<"progress"> {
  constructor() {
    super("progress");
  }

  /**
   * Sets the current progress value.
   * @param value - The numeric value to assign to the progress bar.
   * @return This ProgressElement instance for chaining.
   */
  value(value: number) {
    this.dom.value = value;
    return this;
  }

  /**
   * Retrieves the current progress value.
   * @return The numeric value of the progress bar.
   */
  getValue() {
    return this.dom.value;
  }

  /**
   * Sets the maximum value of the progress bar.
   * @param value - The numeric maximum value to assign.
   * @return This ProgressElement instance for chaining.
   */
  max(value: number) {
    this.dom.max = value;
    return this;
  }

  /**
   * Retrieves the maximum value of the progress bar.
   * @return The numeric maximum value.
   */
  getMax() {
    return this.dom.max;
  }

  /**
   * Enables indeterminate mode by removing the value attribute.
   * @return This ProgressElement instance for chaining.
   */
  indeterminate() {
    this.dom.removeAttribute("value");
    return this;
  }
}
