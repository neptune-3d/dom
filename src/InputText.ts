import type { Property } from "csstype";
import { DomElement } from "./DomElement";

export class InputText extends DomElement<"input"> {
  constructor() {
    super("input");

    this._dom.type = "text";
  }

  name(value: string) {
    this._dom.name = value;
    return this;
  }

  value(value: string) {
    this._dom.value = value;
    return this;
  }

  getValue() {
    return this._dom.value;
  }

  textAlign(value: Property.TextAlign) {
    this._dom.style.textAlign = value;
    return this;
  }

  fontWeight(value: Property.FontWeight) {
    this._dom.style.fontWeight = String(value);
    return this;
  }
}
