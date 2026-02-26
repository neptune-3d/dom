import { DomElement } from "./DomElement";
import type { Autocomplete, KnownFileTypeSpecifier } from "./types";

/**
 * A wrapper for an an `<input type="file">` DomElement.
 *
 * Contains file-specific methods.
 */
export class InputFile extends DomElement<"input"> {
  constructor() {
    super("input");
    this.dom.type = "file";
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
   * Returns the `files` property as a `FileList`.
   *
   * @returns The `files` property.
   */
  getFiles(): FileList {
    return this.dom.files!;
  }

  /**
   * Returns the `value` property which will be an
   * empty string if no file is chosen or the path
   * to the first (or only) selected file prepended with `C:\fakepath\`.
   *
   * @returns The `value` property.
   */
  getValue(): string {
    return this.dom.value;
  }

  /**
   * Sets the `name` property.
   *
   * @param value The name to set.
   * @returns this instance for chaining.
   */
  name(value: string): this {
    this.dom.name = value;
    return this;
  }

  /**
   * Clears the `value` by setting the
   * property to an empty string `""`.
   *
   * @returns this instance for chaining.
   */
  clearValue(): this {
    this.dom.value = "";
    return this;
  }

  /**
   * Sets the `accept` property.
   *
   * Takes an array of values and joins them with the comma separator.
   *
   * @param values Values containing file type specifiers.
   * @returns this instance for chaining.
   */
  accept(...values: Autocomplete<KnownFileTypeSpecifier>[]): this {
    this.dom.accept = values.join(",");
    return this;
  }

  /**
   * Sets the `multiple` property.
   *
   * @param value Whether to this input can have more than one value.
   * @returns this instance for chaining.
   */
  multiple(value: boolean): this {
    this.dom.multiple = value;
    return this;
  }
}
