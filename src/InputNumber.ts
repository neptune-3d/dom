import type { Property } from "csstype";
import { DomElement } from "./DomElement";

export class InputNumber extends DomElement<"input"> {
  constructor() {
    super("input");

    this._dom.type = "number";
  }

  name(value: string) {
    this._dom.name = value;
    return this;
  }

  value(value: number) {
    this._dom.value = String(value);
    return this;
  }

  getValue() {
    return Number(this._dom.value);
  }

  min(value: number) {
    this._dom.min = String(value);
    return this;
  }

  max(value: number) {
    this._dom.max = String(value);
    return this;
  }

  step(value: number) {
    this._dom.step = String(value);
    return this;
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
