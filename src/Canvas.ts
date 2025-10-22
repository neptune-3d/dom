import { DomElement } from "./DomElement";

export class Canvas extends DomElement<"canvas"> {
  constructor(el?: HTMLCanvasElement) {
    super("canvas", el);
  }

  protected _size = { width: this.dom.width, height: this.dom.height };

  getWidth() {
    return this.dom.width;
  }

  getHeight() {
    return this.dom.height;
  }

  setSize(width: number, height: number) {
    this.dom.width = width;
    this.dom.height = height;
    return this;
  }

  getSize() {
    this._size.width = this.dom.width;
    this._size.height = this.dom.height;
    return this._size;
  }

  getAspect() {
    return this.dom.width / this.dom.height;
  }

  getAspectScale(target: { x: number; y: number; z: number }) {
    const aspect = this.dom.width / this.dom.height;

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
