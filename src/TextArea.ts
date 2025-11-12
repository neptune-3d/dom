import { DomElement } from "./DomElement";
import type { TextAreaWrapMode } from "./types";

/**
 * Fluent wrapper for the native `<textarea>` element.
 * Provides ergonomic access to common attributes like `name`, `value`, `placeholder`, `rows`, `cols`, and `wrap`.
 * Enables type-safe, chainable configuration for form inputs, comment boxes, and multi-line editors.
 *
 * This class extends `DomElement<"textarea">`, preserving full DOM access while offering a declarative API.
 * Ideal for dynamic UI composition, form scaffolding, and reusable component abstractions.
 */
export class TextArea extends DomElement<"textarea"> {
  constructor() {
    super("textarea");
  }

  /**
   * Sets the `name` attribute of the element.
   * Useful for form serialization and identifying the field in submissions.
   *
   * @param value - The name to assign to the element.
   * @return This instance for chaining.
   */
  name(value: string) {
    this.dom.name = value;
    return this;
  }

  /**
   * Sets the current value of the element.
   * Applies to `<input>` and `<textarea>` elements.
   *
   * @param value - The string value to assign.
   * @return This instance for chaining.
   */
  value(value: string) {
    this.dom.value = value;
    return this;
  }

  /**
   * Retrieves the current value of the element.
   * Useful for reading user input or programmatic state.
   *
   * @return The string value of the element.
   */
  getValue() {
    return this.dom.value;
  }

  /**
   * Sets the `placeholder` text shown when the element is empty.
   * Useful for guiding user input with contextual hints or expected formatting.
   *
   * Applies to `<input>` and `<textarea>` elements.
   *
   * @param value - The placeholder string to display.
   * @return This instance for chaining.
   */
  placeholder(value: string) {
    this.dom.placeholder = value;
    return this;
  }

  /**
   * Sets the number of visible text rows in the `<textarea>`.
   * Useful for controlling vertical size and layout in forms or editors.
   *
   * @param count - The number of rows to display.
   * @return This instance for chaining.
   */
  rows(count: number) {
    this.dom.rows = count;
    return this;
  }

  /**
   * Sets the number of visible character columns in the `<textarea>`.
   * Useful for controlling horizontal size and layout in forms or editors.
   *
   * @param count - The number of columns to display.
   * @return This instance for chaining.
   */
  cols(count: number) {
    this.dom.cols = count;
    return this;
  }

  /**
   * Sets the `wrap` behavior for text input in the `<textarea>`.
   * Controls how text is wrapped when submitted or displayed.
   *
   * - `"soft"`: No automatic line breaks; text wraps visually but not in form submission.
   * - `"hard"`: Text wraps and includes line breaks in submitted value.
   * - `"off"`: Disables wrapping entirely (non-standard but supported in some browsers).
   *
   * @param mode - The desired wrap mode.
   * @return This instance for chaining.
   */
  wrap(mode: TextAreaWrapMode) {
    this.dom.wrap = mode;
    return this;
  }

  /**
   * Sets the maximum number of characters allowed in the `<textarea>`.
   * Useful for input validation, limiting user responses, or enforcing content constraints.
   *
   * @param limit - The maximum number of characters allowed.
   * @return This instance for chaining.
   */
  maxLength(limit: number) {
    this.dom.maxLength = limit;
    return this;
  }
}

/**
 * Creates a new TextArea element.
 *
 * @return A new TextArea instance.
 */
export function $textarea(): TextArea {
  return new TextArea();
}
