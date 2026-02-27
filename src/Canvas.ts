import { DomElement } from "./DomElement";

/**
 * Wrapper class for an `HTMLCanvasElement` object.
 *
 * The HTMLCanvasElement interface provides properties and methods for manipulating the layout and presentation of <canvas> elements.
 */
export class Canvas extends DomElement<"canvas"> {
  constructor(el?: HTMLCanvasElement) {
    super("canvas", el);
  }

  /**
   * Returns the width property of the canvas.
   *
   * @returns The width property value.
   */
  getWidth(): number {
    return this.dom.width;
  }

  /**
   * Returns the height property of the canvas.
   *
   * @returns The height property value.
   */
  getHeight(): number {
    return this.dom.height;
  }

  /**
   * Returns an object with `width` and `height` property values.
   *
   * @param target Optional Size object to write to instead of creating a new object.
   * @returns The size object.
   */
  getSize(target?: { width: number; height: number }): {
    width: number;
    height: number;
  } {
    const _target = target ?? ({} as { width: number; height: number });

    _target.width = this.dom.width;
    _target.height = this.dom.height;

    return _target;
  }

  /**
   * Returns the aspect ratio of the canvas (width / height).
   *
   * @returns The aspect ratio value.
   */
  getAspectRatio(): number {
    return this.dom.width / this.dom.height;
  }

  /**
   * Returns the aspect ratio as a scaling Vector3.
   *
   * @param target Optional Vector3 object to write to instead of creating a new object.
   * @returns An object with {x, y, z} values used for scaling.
   */
  getAspectRatioScale(target?: { x: number; y: number; z: number }): {
    x: number;
    y: number;
    z: number;
  } {
    const aspect = this.dom.width / this.dom.height;

    const _target = target ?? ({} as { x: number; y: number; z: number });

    if (aspect >= 1) {
      _target.x = 1 / aspect;
      _target.y = 1;
      _target.z = 1;
    }
    //
    else {
      _target.x = 1;
      _target.y = aspect;
      _target.z = 1;
    }

    return _target;
  }

  /**
   * Returns the `CanvasRenderingContext2D` object if available
   * and if the canvas hasn't already been set to a different context mode.
   *
   * @param options Optional `CanvasRenderingContext2DSettings` object.
   * @returns A `CanvasRenderingContext2D` instance or null if `getContext` fails.
   */
  getContext2D(
    options?: CanvasRenderingContext2DSettings,
  ): CanvasRenderingContext2D | null {
    return this.dom.getContext("2d", options);
  }

  /**
   * Sets the width property of the canvas.
   *
   * @param value The width value. Should be a positive integer.
   * @returns this instance for chaining.
   */
  width(value: number) {
    this.dom.width = value;
    return this;
  }

  /**
   * Sets the height property of the canvas.
   *
   * @param value The height value. Should be a positive integer.
   * @returns this instance for chaining.
   */
  height(value: number) {
    this.dom.height = value;
    return this;
  }

  /**
   * Sets the width and height properties of the canvas.
   *
   * @param width The width value. Should be a positive integer.
   * @param height The height value. Should be a positive integer.
   * @returns this instance for chaining.
   */
  setSize(width: number, height: number) {
    this.dom.width = width;
    this.dom.height = height;
    return this;
  }
}

/**
 * Factory helper function for creating an instance of the `Canvas` class.
 *
 * @returns A new `Canvas` instance.
 */
export function $canvas() {
  return new Canvas();
}
