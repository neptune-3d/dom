import type { Property } from "csstype";
import { DomElement } from "./DomElement";

export class Grid<
  T extends keyof HTMLElementTagNameMap = "div"
> extends DomElement<T> {
  constructor(tag?: T) {
    super(tag ?? ("div" as T));

    this.style({ display: "grid", alignItems: "center" });
  }

  templateColumns(value: Property.GridTemplateColumns) {
    this.dom.style.gridTemplateColumns = String(value);
    return this;
  }

  templateRows(value: Property.GridTemplateRows) {
    this.dom.style.gridTemplateRows = String(value);
    return this;
  }

  gap(value: Property.Gap) {
    this.dom.style.gap = this.getStyleValue("gap", value);
    return this;
  }

  alignItems(value: Property.AlignItems = "center") {
    this.dom.style.alignItems = value;
    return this;
  }
}
