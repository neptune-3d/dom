import { InputCheckbox } from "./InputCheckbox";
import { InputColor } from "./InputColor";
import { InputFile } from "./InputFile";
import { InputNumber } from "./InputNumber";
import { InputRange } from "./InputRange";
import { InputText } from "./InputText";

/**
 * Creates a typed input element instance based on the specified input type.
 * Returns a subclass of `DomElement` with type-safe access to input-specific properties and behaviors.
 *
 * Supported types include:
 * - `"text"` → `InputText`
 * - `"number"` → `InputNumber`
 * - `"checkbox"` → `InputCheckbox`
 * - `"color"` → `InputColor`
 * - `"range"` → `InputRange`
 * - `"file"` -> `InputFile`
 *
 * @param type - The input type to create.
 * @return A typed input element instance matching the given type.
 */
export function $input<T extends keyof CM>(type: T): InstanceType<CM[T]> {
  const InputClass = INPUT_CLASS_MAP[type];
  return new InputClass() as InstanceType<CM[T]>;
}

const INPUT_CLASS_MAP = {
  text: InputText,
  number: InputNumber,
  checkbox: InputCheckbox,
  color: InputColor,
  range: InputRange,
  file: InputFile,
} as const;

type CM = typeof INPUT_CLASS_MAP;
