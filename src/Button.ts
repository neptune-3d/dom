import { DomElement } from "./DomElement";

export class Button extends DomElement<"button"> {
  constructor() {
    super("button");
  }

  type(value: "button" | "submit" | "reset") {
    this.dom.type = value;
    return this;
  }

  /**
   * Checks whether the button is disabled.
   *
   * Always safe because this class wraps a `<button>` element.
   *
   * @returns `true` if the button is disabled, otherwise `false`.
   */
  isDisabled(): boolean {
    return this.dom.disabled;
  }
}

export function $btn() {
  return new Button();
}
