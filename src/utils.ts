import { UNITLESS_CSS_PROPS } from "./constants";
import type { Autocomplete, CssProperties } from "./types";

export function uniqueId(): string {
  return `${Date.now().toString(36)}-${(counter++).toString(36)}`;
}

let counter = 0;

export function camelToKebab(prop: string): string {
  return prop.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

export function getStyleValue(
  name: Autocomplete<keyof CssProperties>,
  value: string | number
): string {
  if (typeof value === "number") {
    const isUnitless = !!UNITLESS_CSS_PROPS[name];

    return isUnitless ? String(value) : `${value}px`;
  }

  return value;
}

export function getPxStyleValue(value: string | number): string {
  return typeof value === "number" ? `${value}px` : value;
}
