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

  placeholder(value: string) {
    this.dom.placeholder = value;
    return this;
  }
}
