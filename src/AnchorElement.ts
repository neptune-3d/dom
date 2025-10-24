import type { Property } from "csstype";
import { DomElement } from "./DomElement";

export class AnchorElement extends DomElement<"a"> {
  constructor() {
    super("a");
  }

  href(value: string) {
    this._dom.href = value;
    return this;
  }

  textDecoration(value: Property.TextDecoration) {
    this._dom.style.textDecoration = this.getStyleValue("textDecoration", value);
    return this;
  }
}
