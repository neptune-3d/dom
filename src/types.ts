import type { PropertiesFallback } from "csstype";
import type { DomElement } from "./DomElement";

export type CssProperties = PropertiesFallback<string | number>;

export type { Property as CssProperty } from "csstype";

export type Autocomplete<T extends string> = T | (string & {});

export type DomElementChild = DomElement<any> | string | number;
