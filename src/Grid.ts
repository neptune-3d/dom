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
    this._dom.style.gridTemplateColumns = String(value);
    return this;
  }

  templateRows(value: Property.GridTemplateRows) {
    this._dom.style.gridTemplateRows = String(value);
    return this;
  }

  gap(value: Property.Gap) {
    this._dom.style.gap = this.getStyleValue("gap", value);
    return this;
  }

  alignItems(value: Property.AlignItems = "center") {
    this._dom.style.alignItems = value;
    return this;
  }
}
