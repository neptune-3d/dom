import type { Property } from "csstype";
import { DomElement } from "./DomElement";

export class Flex<
  T extends keyof HTMLElementTagNameMap = "div"
> extends DomElement<T> {
  constructor(tag?: T) {
    super(tag ?? ("div" as T));

    this.style({ display: "flex", alignItems: "center" });
  }

  alignItems(value: Property.AlignItems = "center") {
    this.dom.style.alignItems = value;
    return this;
  }

  justifyContent(value: Property.JustifyContent = "center") {
    this.dom.style.justifyContent = value;
    return this;
  }

  gap(value: Property.Gap) {
    this.dom.style.gap = this.getStyleValue("gap", value);
    return this;
  }
}
