import { DomElement } from "./DomElement";
import type { CssProperties } from "./types";

export class Button extends DomElement<"button"> {
  constructor() {
    super("button");
  }

  type(value: "button" | "submit" | "reset") {
    this.dom.type = value;
    return this;
  }

  disabledCss(props: CssProperties) {
    return this.css(":disabled", props);
  }
}
