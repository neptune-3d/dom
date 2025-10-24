import { DomElement } from "./DomElement";

export class SelectElement extends DomElement<"select"> {
  constructor() {
    super("select");
  }

  name(value: string) {
    this.dom.name = value;
    return this;
  }

  value(value: string | number) {
    this.dom.value = String(value);
    return this;
  }

  getValue() {
    return this.dom.value;
  }
}
