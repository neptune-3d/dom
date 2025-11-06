import { DomElement } from "./DomElement";

export class Button extends DomElement<"button"> {
  constructor() {
    super("button");
  }

  type(value: "button" | "submit" | "reset") {
    this.dom.type = value;
    return this;
  }
}

export function $btn() {
  return new Button();
}
