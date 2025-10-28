import { DomElement } from "./DomElement";

export class IFrame extends DomElement<"iframe"> {
  constructor() {
    super("iframe");
  }

  src(value: string) {
    this._dom.src = value;
    return this;
  }

  allowFullscreen(value = true) {
    this._dom.allowFullscreen = value;
    return this;
  }

  width(value: number) {
    this._dom.width = this.getStyleValue("width", value);
    return this;
  }

  height(value: number) {
    this._dom.height = this.getStyleValue("height", value);
    return this;
  }

  setSize(width: number, height: number) {
    this._dom.width = this.getStyleValue("width", width);
    this._dom.height = this.getStyleValue("height", height);
    return this;
  }

  reload() {
    this.dom.src = this.dom.src;
  }
}
