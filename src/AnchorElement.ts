import { DomElement } from "./DomElement";

export class AnchorElement extends DomElement<"a"> {
  constructor() {
    super("a");
  }

  href(value: string) {
    this._dom.href = value;
    return this;
  }
}
