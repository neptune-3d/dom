import { DomElement } from "./DomElement";

export class ImageElement extends DomElement<"img"> {
  constructor() {
    super("img");
  }

  src(value: string) {
    this.dom.src = value;
    return this;
  }

  width(value: number) {
    this.dom.width = value;
    return this;
  }

  height(value: number) {
    this.dom.height = value;
    return this;
  }

  setSize(width: number, height: number) {
    this.dom.width = width;
    this.dom.height = height;
    return this;
  }

  alt(value: string) {
    this.dom.alt = value;
    return this;
  }
}

export function $img() {
  return new ImageElement();
}
