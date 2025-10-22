import type { Property } from "csstype";
import { DomElement } from "./DomElement";

export class InputText extends DomElement<"input"> {
  constructor() {
    super("input");

    this.dom.type = "text";
  }

  name(value: string) {
    this.dom.name = value;
    return this;
  }

  value(value: string) {
    this.dom.value = value;
    return this;
  }

  getValue() {
    return this.dom.value;
  }

  textAlign(value: Property.TextAlign) {
    this.dom.style.textAlign = value;
    return this;
  }

  fontWeight(value: Property.FontWeight) {
    this.dom.style.fontWeight = String(value);
    return this;
  }
}
