import { DomElement } from "./DomElement";

export class InputColor extends DomElement<"input"> {
  constructor() {
    super("input");

    this.dom.type = "color";
  }

  protected _rgb = { r: 1, g: 1, b: 1 };

  name(value: string) {
    this.dom.name = value;
    return this;
  }

  value(value: string) {
    this.dom.value = value;
    return this;
  }

  getValue() {
    return this.dom.value;
  }

  getRGB() {
    const value = this.dom.value;
    const r = parseInt(value.slice(1, 3), 16);
    const g = parseInt(value.slice(3, 5), 16);
    const b = parseInt(value.slice(5, 7), 16);

    this._rgb.r = r;
    this._rgb.g = g;
    this._rgb.b = b;

    return this._rgb;
  }

  getNormalizedRGB() {
    const value = this.dom.value;
    const r = parseInt(value.slice(1, 3), 16);
    const g = parseInt(value.slice(3, 5), 16);
    const b = parseInt(value.slice(5, 7), 16);

    this._rgb.r = r / 255;
    this._rgb.g = g / 255;
    this._rgb.b = b / 255;

    return this._rgb;
  }
}
