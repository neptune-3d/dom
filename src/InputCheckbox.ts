import { DomElement } from "./DomElement";

export class InputCheckbox extends DomElement<"input"> {
  constructor() {
    super("input");

    this._dom.type = "checkbox";
  }

  name(value: string) {
    this._dom.name = value;
    return this;
  }

  checked(value: boolean) {
    this.prop("checked", value);
    return this;
  }

  isChecked() {
    return this.getProp("checked") as boolean;
  }
}
