import { DomElement } from "./DomElement";

export class InputNumber extends DomElement<"input"> {
  constructor() {
    super("input");

    this.dom.type = "number";
  }

  name(value: string) {
    this.dom.name = value;
    return this;
  }

  value(value: number) {
    this.dom.value = String(value);
    return this;
  }

  getValue() {
    return Number(this.dom.value);
  }

  min(value: number) {
    this.dom.min = String(value);
    return this;
  }

  max(value: number) {
    this.dom.max = String(value);
    return this;
  }

  step(value: number) {
    this.dom.step = String(value);
    return this;
  }

  placeholder(value: string) {
    this.dom.placeholder = value;
    return this;
  }
}
