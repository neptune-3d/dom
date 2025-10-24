import { DomElement } from "./DomElement";

export class Canvas extends DomElement<"canvas"> {
  constructor(el?: HTMLCanvasElement) {
    super("canvas", el);
  }

  protected _size = { width: this._dom.width, height: this._dom.height };

  getWidth() {
    return this._dom.width;
  }

  getHeight() {
    return this._dom.height;
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

  getSize() {
    this._size.width = this._dom.width;
    this._size.height = this._dom.height;
    return this._size;
  }

  getAspect() {
    return this._dom.width / this._dom.height;
  }

  getAspectScale(target: { x: number; y: number; z: number }) {
    const aspect = this._dom.width / this._dom.height;

    let x: number, y: number, z: number;

    if (aspect >= 1) {
      x = 1 / aspect;
      y = 1;
      z = 1;
    }
    //
    else {
      x = 1;
      y = aspect;
      z = 1;
    }

    target.x = x;
    target.y = y;
    target.z = z;

    return target;
  }
}
