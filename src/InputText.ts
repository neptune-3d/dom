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

  placeholder(value: string) {
    this.dom.placeholder = value;
    return this;
  }
}
