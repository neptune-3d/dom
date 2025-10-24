import { DomElement } from "./DomElement";

export class InputRange extends DomElement<"input"> {
  constructor() {
    super("input");

    this._dom.type = "range";
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
}
