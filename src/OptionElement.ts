import { DomElement } from "./DomElement";

export class OptionElement extends DomElement<"option"> {
  constructor() {
    super("option");
  }

  value(value: string | number) {
    this.dom.value = String(value);
    return this;
  }

  getValue() {
    return this.dom.value;
  }
}

export function $option() {
  return new OptionElement();
}
