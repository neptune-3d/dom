import { InputCheckbox } from "./InputCheckbox";
import { InputColor } from "./InputColor";
import { InputNumber } from "./InputNumber";
import { InputRange } from "./InputRange";
import { InputText } from "./InputText";
import type { InputElementMap } from "./types";

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
 *
 * Each returned instance supports fluent styling, DOM composition, and event binding.
 *
 * @param type - The input type to create.
 * @return A typed input element instance matching the given type.
 */
export function $input<T extends keyof InputElementMap>(type: T) {
  switch (type) {
    case "text": {
      return new InputText() as InputElementMap[T];
    }
    case "number": {
      return new InputNumber() as InputElementMap[T];
    }
    case "checkbox": {
      return new InputCheckbox() as InputElementMap[T];
    }
    case "color": {
      return new InputColor() as InputElementMap[T];
    }
    case "range": {
      return new InputRange() as InputElementMap[T];
    }
  }
}
