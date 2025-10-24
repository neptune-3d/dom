import type { PropertiesFallback } from "csstype";

export type CssProperties = PropertiesFallback<string | number>;

export type { Property as CssProperty } from "csstype";

export type Autocomplete<T extends string> = T | (string & {});
