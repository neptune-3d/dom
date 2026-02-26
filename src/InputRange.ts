import { DomElement } from "./DomElement";

/**
 * A wrapper for an an `<input type="range">` DomElement.
 *
 * Contains range-specific methods and value is typed as number.
 */
export class InputRange extends DomElement<"input"> {
  constructor() {
    super("input");
    this.dom.type = "range";
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
   * Returns the `min` property` converted to a number.
   *
   * @returns The minimum value as a number.
   */
  getMin(): number {
    return Number(this.dom.min);
  }

  /**
   * Returns the `max` property converted to a number.
   *
   * @returns The maximum value as a number.
   */
  getMax(): number {
    return Number(this.dom.max);
  }

  /**
   * Returns the `step` property converted to a number.
   *
   * @returns The step value as a number.
   */
  getStep(): number {
    return Number(this.dom.step);
  }

  /**
   * Returns the current value of the range input as a normalized ratio between 0 and 1.
   * Computed as `(value - min) / (max - min)`, clamped to the [0, 1] interval.
   *
   * @returns The current value as a ratio between 0 and 1.
   */
  getRatio(): number {
    const min = this.getMin();
    const max = this.getMax();
    const value = this.getValue();
    const span = max - min;
    return span > 0 ? Math.max(0, Math.min(1, (value - min) / span)) : 0;
  }

  /**
   * Returns the current value of the range input as a percentage between 0 and 100.
   * Computed as `(value - min) / (max - min) * 100`, clamped to the [0, 100] interval.
   *
   * @returns The current value as a percentage.
   */
  getPercent(): number {
    return this.getRatio() * 100;
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
   * @param value - The step size between values.
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
   * Sets the range input value using a normalized ratio between 0 and 1.
   * Computes the actual value as `min + ratio * (max - min)` and clamps it to bounds.
   *
   * @param ratio A normalized value between 0 and 1.
   * @returns this instance for chaining.
   */
  ratio(ratio: number): this {
    const min = this.getMin();
    const max = this.getMax();
    const span = max - min;
    const clamped = Math.max(0, Math.min(1, ratio));
    return this.value(min + clamped * span);
  }

  /**
   * Sets the range input value using a percentage between 0 and 100.
   * Computes the actual value as `min + (percent / 100) * (max - min)` and clamps it to bounds.
   *
   * @param percent - A value between 0 and 100.
   * @returns this instance for chaining.
   */
  percent(percent: number): this {
    return this.ratio(percent / 100);
  }

  /**
   * Updates the background of the range input to visually reflect the current value.
   * Applies a horizontal linear gradient with two color stops: one for the filled portion,
   * and one for the unfilled remainder. Uses `getPercent()` to compute the fill percentage.
   *
   * @param fillColor The color used for the filled portion of the track.
   * @param emptyColor The color used for the unfilled portion of the track.
   * @returns this instance for chaining.
   */
  trackFillColors(fillColor: string, emptyColor: string): this {
    const pct = this.getPercent();
    return this.linearGradient(
      "to right",
      `${fillColor} ${pct}%`,
      `${emptyColor} ${pct}%`,
    );
  }
}
