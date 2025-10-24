import { DomElement } from "./DomElement";

export class ImageElement extends DomElement<"img"> {
  constructor() {
    super("img");
  }

  src(value: string) {
    this._dom.src = value;
    return this;
  }

  width(value: number) {
    this._dom.width = value;
    return this;
  }

  height(value: number) {
    this._dom.height = value;
    return this;
  }

  setSize(width: number, height: number) {
    this._dom.width = width;
    this._dom.height = height;
    return this;
  }

  alt(value: string) {
    this.dom.alt = value;
    return this;
  }
}
