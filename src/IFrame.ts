import { DomElement } from "./DomElement";
import { getStyleValue } from "./utils";

export class IFrame extends DomElement<"iframe"> {
  constructor() {
    super("iframe");
  }

  src(value: string) {
    this.dom.src = value;
    return this;
  }

  allowFullscreen(value = true) {
    this.dom.allowFullscreen = value;
    return this;
  }

  width(value: number) {
    this.dom.width = getStyleValue("width", value);
    return this;
  }

  height(value: number) {
    this.dom.height = getStyleValue("height", value);
    return this;
  }

  setSize(width: number, height: number) {
    this.dom.width = getStyleValue("width", width);
    this.dom.height = getStyleValue("height", height);
    return this;
  }

  reload() {
    this.dom.src = this.dom.src;
  }
}

export function $iframe() {
  return new IFrame();
}
