import type { Canvas } from "./Canvas";

/**
 * A wrapper class for the `CanvasRenderingContext2D`.
 *
 * The CanvasRenderingContext2D interface, part of the Canvas API, provides the 2D rendering context for the drawing surface of a <canvas> element.
 *
 * It is used for drawing shapes, text, images, and other objects.
 */
export class CanvasContext2D {
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  /**
   * The `CanvasRenderingContext2D` object.
   */
  readonly ctx: CanvasRenderingContext2D;

  // CONFIG

  /**
   * Sets the thickness of lines.
   *
   * @param value A number specifying the line width, in coordinate space units. The value is 1.0 by default.
   * @returns this instance for chaining.
   */
  lineWidth(value: number): this {
    this.ctx.lineWidth = value;
    return this;
  }

  /**
   * Gets the current line dash pattern.
   *
   * @returns An Array of numbers that specify distances to alternately draw a line and a gap (in coordinate space units).
   * If the number, when setting the elements, is odd, the elements of the array get copied and concatenated.
   * For example, setting the line dash to `[5, 15, 25]` will result in getting back `[5, 15, 25, 5, 15, 25]`.
   */
  getLineDash(): number[] {
    return this.ctx.getLineDash();
  }

  /**
   * Sets the line dash pattern used when stroking lines.
   *
   * It uses an array of values that specify alternating lengths of lines and gaps which describe the pattern.
   *
   * @param segments An Array of numbers that specify distances to alternately draw a line and a gap (in coordinate space units).
   * If the number of elements in the array is odd, the elements of the array get copied and concatenated.
   * For example, `[5, 15, 25]` will become `[5, 15, 25, 5, 15, 25]`.
   * If the array is empty, the line dash list is cleared and line strokes return to being solid.
   * @returns this instance for chaining.
   */
  setLineDash(segments: Iterable<number>): this {
    this.ctx.setLineDash(segments);
    return this;
  }

  /**
   * Specifies the color, gradient, or pattern to use for the strokes (outlines) around shapes.
   *
   * The default is black.
   *
   * @returns this instance for chaining.
   */
  strokeStyle(value: string | CanvasGradient | CanvasPattern): this {
    this.ctx.strokeStyle = value;
    return this;
  }

  /**
   * Specifies the color, gradient, or pattern to use inside shapes.
   *
   * The default style is black.
   *
   * @param value Either a string parsed CSS color value (e.g. `"#ff0099"`), a CanvasGradient object, or a CanvasPattern object.
   * @returns this instance for chaining.
   */
  fillStyle(value: string | CanvasGradient | CanvasPattern): this {
    this.ctx.fillStyle = value;
    return this;
  }

  /**
   * Provides filter effects such as blurring and grayscaling.
   *
   * It is similar to the CSS filter property and accepts the same values.
   *
   * @param value A value of "none" or one or more of filter functions in a string (e.g. `"contrast(1.4) sepia(1)"`).
   * @returns this instance for chaining.
   */
  filter(value: string): this {
    this.ctx.filter = value;
    return this;
  }

  /**
   * Specifies the current text style to use when drawing text.
   *
   * This string uses the same syntax as the CSS font specifier.
   *
   * @param value A string parsed as CSS font value. The default font is `10px sans-serif`.
   * @returns this instance for chaining.
   */
  font(value: string): this {
    this.ctx.font = value;
    return this;
  }

  /**
   * Specifies the current text baseline used when drawing text.
   *
   * @param value A CanvasTextBaseline value.
   * @returns this instance for chaining.
   */
  textBaseline(value: CanvasTextBaseline): this {
    this.ctx.textBaseline = value;
    return this;
  }

  /**
   * Specifies the current text alignment used when drawing text.
   *
   * The alignment is relative to the x value of the fillText() method.
   *
   * For example, if textAlign is "center", then the text's left edge will be at `x - (textWidth / 2)`.
   *
   * @param value A CanvasTextAlign value
   * @returns this instance for chaining.
   */
  textAlign(value: CanvasTextAlign): this {
    this.ctx.textAlign = value;
    return this;
  }

  /**
   * Specifies the spacing between words when drawing text.
   *
   * This corresponds to the CSS word-spacing property.
   *
   * @param value The word spacing as a string in the CSS <length> data format. The default is 0px.
   * @returns this instance for chaining.
   */
  wordSpacing(value: string): this {
    this.ctx.wordSpacing = value;
    return this;
  }

  // TRANSFORMS

  /**
   * Retrieves the current transformation matrix being applied to the context.
   *
   * @returns A DOMMatrix object.
   */
  getTransform(): DOMMatrix {
    return this.ctx.getTransform();
  }

  /**
   * Adds a translation transformation to the current matrix.
   *
   * @param x Distance to move in the horizontal direction. Positive values are to the right, and negative to the left.
   * @param y Distance to move in the vertical direction. Positive values are down, and negative are up.
   * @returns this instance for chaining.
   */
  translate(x: number, y: number): this {
    this.ctx.translate(x, y);
    return this;
  }

  /**
   * Adds a scaling transformation to the canvas units horizontally and/or vertically.
   *
   * @param x Scaling factor in the horizontal direction. A negative value flips pixels across the vertical axis.
   * A value of 1 results in no horizontal scaling.
   * @param y Scaling factor in the vertical direction. A negative value flips pixels across the horizontal axis.
   * A value of 1 results in no vertical scaling.
   * @returns this instance for chaining.
   */
  scale(x: number, y: number): this {
    this.ctx.scale(x, y);
    return this;
  }

  /**
   * Adds a rotation to the transformation matrix.
   *
   * @param angle The rotation angle, clockwise in radians.
   * @returns this instance for chaining.
   */
  rotateRad(angle: number): this {
    this.ctx.rotate(angle);
    return this;
  }

  /**
   * Adds a rotation to the transformation matrix.
   *
   * @param angle The rotation angle, clockwise in degrees.
   * @returns this instance for chaining.
   */
  rotateDeg(angle: number): this {
    this.ctx.rotate(angle * (Math.PI / 180));
    return this;
  }

  /**
   * Resets (overrides) the current transformation to the identity matrix, and then invokes a transformation described by the arguments of this method.
   *
   * This lets you scale, rotate, translate (move), and skew the context.
   *
   * @param a (m11) The cell in the first row and first column of the matrix.
   * @param b (m12) The cell in the second row and first column of the matrix.
   * @param c (m21) The cell in the first row and second column of the matrix.
   * @param d (m22) The cell in the second row and second column of the matrix.
   * @param e (m41) The cell in the first row and third column of the matrix.
   * @param f (m42) The cell in the second row and third column of the matrix.
   * @returns this instance for chaining.
   */
  setTransformComponents(
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    f: number,
  ): this {
    this.ctx.setTransform(a, b, c, d, e, f);
    return this;
  }

  /**
   * Resets (overrides) the current transformation to the identity matrix, and then invokes a transformation described by the arguments of this method.
   *
   * This lets you scale, rotate, translate (move), and skew the context.
   *
   * @param matrix A DOMMatrix or DOMMatrix2DInit object.
   * @returns this instance for chaining.
   */
  setTransformMatrix(matrix: DOMMatrix2DInit): this {
    this.ctx.setTransform(matrix);
    return this;
  }

  /**
   * Multiplies the current transformation with the matrix described by the arguments of this method.
   *
   * This lets you scale, rotate, translate (move), and skew the context.
   *
   * @param a (m11) The cell in the first row and first column of the matrix.
   * @param b (m12) The cell in the second row and first column of the matrix.
   * @param c (m21) The cell in the first row and second column of the matrix.
   * @param d (m22) The cell in the second row and second column of the matrix.
   * @param e (m41) The cell in the first row and third column of the matrix.
   * @param f (m42) The cell in the second row and third column of the matrix.
   * @returns this instance for chaining.
   */
  transform(
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    f: number,
  ): this {
    this.ctx.transform(a, b, c, d, e, f);
    return this;
  }

  /**
   * Resets the current transform to the identity matrix.
   *
   * @returns this instance for chaining.
   */
  resetTransform(): this {
    this.ctx.resetTransform();
    return this;
  }

  // PATH

  /**
   * Starts a new path by emptying the list of sub-paths.
   *
   * Call this method when you want to create a new path.
   *
   * @returns this instance for chaining.
   */
  beginPath(): this {
    this.ctx.beginPath();
    return this;
  }

  /**
   * Begins a new sub-path at the point specified by the given (x, y) coordinates.
   *
   * @param x The x-axis (horizontal) coordinate of the point.
   * @param y The y-axis (vertical) coordinate of the point.
   * @returns this instance for chaining.
   */
  moveTo(x: number, y: number): this {
    this.ctx.moveTo(x, y);
    return this;
  }

  /**
   * Adds a straight line to the current sub-path by connecting the sub-path's last point to the specified (x, y) coordinates.
   *
   * @param x The x-axis coordinate of the line's end point.
   * @param y The y-axis coordinate of the line's end point.
   * @returns this instance for chaining.
   */
  lineTo(x: number, y: number): this {
    this.ctx.lineTo(x, y);
    return this;
  }

  /**
   * Adds a circular arc to the current sub-path.
   *
   * @param x The horizontal coordinate of the arc's center.
   * @param y The vertical coordinate of the arc's center.
   * @param radius The arc's radius. Must be positive.
   * @param startAngle The angle at which the arc starts in radians, measured from the positive x-axis.
   * @param endAngle The angle at which the arc ends in radians, measured from the positive x-axis.
   * @param ccw An optional boolean value. If true, draws the arc counter-clockwise between the start and end angles.
   * The default is false (clockwise).
   * @returns this instance for chaining.
   */
  arc(
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    ccw?: boolean,
  ): this {
    this.ctx.arc(x, y, radius, startAngle, endAngle, ccw);
    return this;
  }

  /**
   * Adds a circular arc to the current sub-path, using the given control points and radius.
   *
   * The arc is automatically connected to the path's latest point with a straight line if necessary,
   * for example if the starting point and control points are in a line.
   *
   * @param x1 The x-axis coordinate of the first control point.
   * @param y1 The y-axis coordinate of the first control point.
   * @param x2 The x-axis coordinate of the second control point.
   * @param y2 The y-axis coordinate of the second control point.
   * @param radius The arc's radius. Must be non-negative.
   * @returns this instance for chaining.
   */
  arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): this {
    this.ctx.arcTo(x1, y1, x2, y2, radius);
    return this;
  }

  /**
   * Adds a rectangle to the current path.
   *
   * @param x The x-axis coordinate of the rectangle's starting point.
   * @param y The y-axis coordinate of the rectangle's starting point.
   * @param w The rectangle's width. Positive values are to the right, and negative to the left.
   * @param h The rectangle's height. Positive values are down, and negative are up.
   * @returns this instance for chaining.
   */
  rect(x: number, y: number, w: number, h: number): this {
    this.ctx.rect(x, y, w, h);
    return this;
  }

  /**
   * @param x The x-axis coordinate of the rectangle's starting point, in pixels.
   * @param y The y-axis coordinate of the rectangle's starting point, in pixels.
   * @param w The rectangle's width. Positive values are to the right, and negative to the left.
   * @param h The rectangle's height. Positive values are down, and negative are up.
   * @param radii A number or list specifying the radii of the circular arc to be used for the corners of the rectangle.
   * The number and order of the radii function in the same way as the border-radius CSS property when width and height are positive.
   * @returns this instance for chaining.
   */
  roundRect(
    x: number,
    y: number,
    w: number,
    h: number,
    radii: number | DOMPointInit | Iterable<number | DOMPointInit> | undefined,
  ): this {
    this.ctx.roundRect(x, y, w, h, radii);
    return this;
  }

  /**
   * Adds an elliptical arc to the current sub-path.
   *
   * @param x The x-axis (horizontal) coordinate of the ellipse's center.
   * @param y The y-axis (vertical) coordinate of the ellipse's center.
   * @param radiusX The ellipse's major-axis radius. Must be non-negative.
   * @param radiusY The ellipse's minor-axis radius. Must be non-negative.
   * @param rotation The rotation of the ellipse, expressed in radians.
   * @param startAngle The eccentric angle at which the ellipse starts, measured clockwise from the positive x-axis and expressed in radians.
   * @param endAngle The eccentric angle at which the ellipse ends, measured clockwise from the positive x-axis and expressed in radians.
   * @param ccw An optional boolean value which, if true, draws the ellipse counterclockwise (anticlockwise).
   * The default value is false (clockwise).
   * @returns this instance for chaining.
   */
  ellipse(
    x: number,
    y: number,
    radiusX: number,
    radiusY: number,
    rotation: number,
    startAngle: number,
    endAngle: number,
    ccw?: boolean,
  ): this {
    this.ctx.ellipse(
      x,
      y,
      radiusX,
      radiusY,
      rotation,
      startAngle,
      endAngle,
      ccw,
    );
    return this;
  }

  /**
   * Adds a quadratic Bézier curve to the current sub-path.
   *
   * It requires two points: the first one is a control point and the second one is the end point.
   *
   * @param cpx The x-axis coordinate of the control point.
   * @param cpy The y-axis coordinate of the control point.
   * @param x The x-axis coordinate of the end point.
   * @param y The y-axis coordinate of the end point.
   * @returns this instance for chaining.
   */
  quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): this {
    this.ctx.quadraticCurveTo(cpx, cpy, x, y);
    return this;
  }

  /**
   * Adds a cubic Bézier curve to the current sub-path.
   *
   * It requires three points: the first two are control points and the third one is the end point.
   *
   * @param cp1x The x-axis coordinate of the first control point.
   * @param cp1y The y-axis coordinate of the first control point.
   * @param cp2x The x-axis coordinate of the second control point.
   * @param cp2y The y-axis coordinate of the second control point.
   * @param x The x-axis coordinate of the end point.
   * @param y The y-axis coordinate of the end point.
   * @returns this instance for chaining.
   */
  bezierCurveTo(
    cp1x: number,
    cp1y: number,
    cp2x: number,
    cp2y: number,
    x: number,
    y: number,
  ): this {
    this.ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
    return this;
  }

  /**
   * Attempts to add a straight line from the current point to the start of the current sub-path.
   *
   * If the shape has already been closed or has only one point, this function does nothing.
   *
   * @returns this instance for chaining.
   */
  closePath(): this {
    this.ctx.closePath();
    return this;
  }

  /**
   * Reports whether or not the specified point is contained in the current path.
   *
   * @param x The x-axis coordinate of the point to check, unaffected by the current transformation of the context.
   * @param y The y-axis coordinate of the point to check, unaffected by the current transformation of the context.
   * @param fillRule Optional, the algorithm by which to determine if a point is inside or outside the path.
   * Possible values: `nonzero` and `evenodd`.
   * @returns A boolean value, which is true if the specified point is contained in the current path, otherwise false.
   */
  isPointInCurrentPath(
    x: number,
    y: number,
    fillRule?: CanvasFillRule,
  ): boolean {
    return this.ctx.isPointInPath(x, y, fillRule);
  }

  /**
   * Reports whether or not the specified point is contained in the specified path.
   *
   * @param path A Path2D path to check against.
   * @param x The x-axis coordinate of the point to check, unaffected by the current transformation of the context.
   * @param y The y-axis coordinate of the point to check, unaffected by the current transformation of the context.
   * @param fillRule Optional, the algorithm by which to determine if a point is inside or outside the path.
   * Possible values: `nonzero` and `evenodd`.
   * @returns A boolean value, which is true if the specified point is contained in the specified path, otherwise false.
   */
  isPointInPath(
    path: Path2D,
    x: number,
    y: number,
    fillRule?: CanvasFillRule,
  ): boolean {
    return this.ctx.isPointInPath(path, x, y, fillRule);
  }

  // STROKE / FILL

  /**
   * Strokes (outlines) the current path with the current stroke style.
   *
   * @returns this instance for chaining.
   */
  stroke(): this {
    this.ctx.stroke();
    return this;
  }

  /**
   * Strokes (outlines) the given path with the current stroke style.
   *
   * @param path A Path2D path to stroke.
   * @returns this instance for chaining.
   */
  strokePath(path: Path2D): this {
    this.ctx.stroke(path);
    return this;
  }

  /**
   * Fills the current path with the current or provided fillStyle.
   *
   * @param fillRule Optional, the algorithm by which to determine if a point is inside or outside the filling region.
   * Possible values: `nonzero` and `evenodd`.
   * @returns this instance for chaining.
   */
  fill(fillRule?: CanvasFillRule): this {
    this.ctx.fill(fillRule);
    return this;
  }

  /**
   * Fills the provided path with the current or provided fillStyle.
   *
   * @param path A Path2D path to fill.
   * @param fillRule Optional, the algorithm by which to determine if a point is inside or outside the filling region.
   * Possible values: `nonzero` and `evenodd`.
   * @returns this instance for chaining.
   */
  fillPath(path: Path2D, fillRule?: CanvasFillRule): this {
    this.ctx.fill(path, fillRule);
    return this;
  }

  /**
   * Draws a rectangle that is stroked (outlined) according to the current strokeStyle and other context settings.
   *
   * @param x The x-axis coordinate of the rectangle's starting point.
   * @param y The y-axis coordinate of the rectangle's starting point.
   * @param w The rectangle's width. Positive values are to the right, and negative to the left.
   * @param h The rectangle's height. Positive values are down, and negative are up.
   * @returns this instance for chaining.
   */
  strokeRect(x: number, y: number, w: number, h: number): this {
    this.ctx.strokeRect(x, y, w, h);
    return this;
  }

  /**
   * Draws a rectangle that is filled according to the current fillStyle.
   *
   * @param x The x-axis coordinate of the rectangle's starting point.
   * @param y The y-axis coordinate of the rectangle's starting point.
   * @param w The rectangle's width. Positive values are to the right, and negative to the left.
   * @param h The rectangle's height. Positive values are down, and negative are up.
   * @returns this instance for chaining.
   */
  fillRect(x: number, y: number, w: number, h: number): this {
    this.ctx.fillRect(x, y, w, h);
    return this;
  }

  /**
   * Erases the pixels in a rectangular area by setting them to transparent black.
   *
   * @param x The x-axis coordinate of the rectangle's starting point.
   * @param y The y-axis coordinate of the rectangle's starting point.
   * @param w The rectangle's width. Positive values are to the right, and negative to the left.
   * @param h The rectangle's height. Positive values are down, and negative are up.
   * @returns this instance for chaining.
   */
  clearRect(x: number, y: number, w: number, h: number): this {
    this.ctx.clearRect(x, y, w, h);
    return this;
  }

  /**
   * strokes — that is, draws the outlines of — the characters of a text string at the specified coordinates.
   *
   * An optional parameter allows specifying a maximum width for the rendered text,
   * which the user agent will achieve by condensing the text or by using a lower font size.
   *
   * @param text A string specifying the text string to render into the context.
   * The text is rendered using the settings specified by `font`, `textAlign`, `textBaseline`, and `direction`.
   * @param x The x-axis coordinate of the point at which to begin drawing the text.
   * @param y The y-axis coordinate of the point at which to begin drawing the text.
   * @param maxWidth he maximum width the text may be once rendered.
   * If not specified, there is no limit to the width of the text.
   * However, if this value is provided, the user agent will adjust the kerning,
   * select a more horizontally condensed font (if one is available or can be generated without loss of quality),
   * or scale down to a smaller font size in order to fit the text in the specified width.
   * @returns this instance for chaining.
   */
  strokeText(
    text: string,
    x: number,
    y: number,
    maxWidth?: number | undefined,
  ): this {
    this.ctx.strokeText(text, x, y, maxWidth);
    return this;
  }

  /**
   * Draws a text string at the specified coordinates, filling the string's characters with the current fillStyle.
   *
   * An optional parameter allows specifying a maximum width for the rendered text,
   * which the user agent will achieve by condensing the text or by using a lower font size.
   *
   * @param text A string specifying the text string to render into the context.
   * The text is rendered using the settings specified by `font`, `textAlign`, `textBaseline`, and `direction`.
   * @param x The x-axis coordinate of the point at which to begin drawing the text, in pixels.
   * @param y The y-axis coordinate of the baseline on which to begin drawing the text, in pixels.
   * @param maxWidth Optional, The maximum number of pixels wide the text may be once rendered.
   * If not specified, there is no limit to the width of the text.
   * However, if this value is provided, the user agent will adjust the kerning,
   * select a more horizontally condensed font (if one is available or can be generated without loss of quality),
   * or scale down to a smaller font size in order to fit the text in the specified width.
   * @returns this instance for chaining.
   */
  fillText(text: string, x: number, y: number, maxWidth?: number): this {
    this.ctx.fillText(text, x, y, maxWidth);
    return this;
  }

  // IMAGE

  /**
   * Returns an ImageData object representing the underlying pixel data for a specified portion of the canvas.
   *
   * @param sx The x-axis coordinate of the top-left corner of the rectangle from which the ImageData will be extracted.
   * @param sy The y-axis coordinate of the top-left corner of the rectangle from which the ImageData will be extracted.
   * @param sw The width of the rectangle from which the ImageData will be extracted. Positive values are to the right, and negative to the left.
   * @param sh The height of the rectangle from which the ImageData will be extracted. Positive values are down, and negative are up.
   * @param settings Optional ImageDataSettings object.
   * @returns An ImageData object containing the image data for the rectangle of the canvas specified.
   * The coordinates of the rectangle's top-left corner are (sx, sy), while the coordinates of the bottom corner are `(sx + sw - 1, sy + sh - 1)`.
   */
  getImageData(
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    settings?: ImageDataSettings,
  ): ImageData {
    return this.ctx.getImageData(sx, sy, sw, sh, settings);
  }

  /**
   * Draw the entire source image at a destination position, using its natural size.
   *
   * @param image An element to draw into the context.
   * The specification permits any canvas image source, specifically,
   * an HTMLImageElement, an SVGImageElement, an HTMLVideoElement, an HTMLCanvasElement, an ImageBitmap, an OffscreenCanvas, or a VideoFrame.
   * @param dx The x-axis coordinate in the destination canvas at which to place the top-left corner of the source image.
   * @param dy The y-axis coordinate in the destination canvas at which to place the top-left corner of the source image.
   * @returns this instance for chaining
   */
  drawImageAt(image: CanvasImageSource, dx: number, dy: number): this {
    this.ctx.drawImage(image, dx, dy);
    return this;
  }

  /**
   * Draw the entire source image at a destination position, but scale it to the given width and height.
   *
   * @param dx The x-axis coordinate in the destination canvas at which to place the top-left corner of the source image.
   * @param dy The y-axis coordinate in the destination canvas at which to place the top-left corner of the source image.
   * @param dw The width to draw the image in the destination canvas. This allows scaling of the drawn image.
   * @param dh The height to draw the image in the destination canvas. This allows scaling of the drawn image.
   * @returns this instance for chaining
   */
  drawImageScaled(
    image: CanvasImageSource,
    dx: number,
    dy: number,
    dw: number,
    dh: number,
  ): this {
    this.ctx.drawImage(image, dx, dy, dw, dh);
    return this;
  }

  /**
   * Draw a rectangular region of the source image (crop) into a destination rectangle (position + scale).
   *
   * @param sx The x-axis coordinate of the top left corner of the sub-rectangle of the source image to draw into the destination context.
   * @param sy The y-axis coordinate of the top left corner of the sub-rectangle of the source image to draw into the destination context.
   * @param sw The width of the sub-rectangle of the source image to draw into the destination context.
   * @param sh The height of the sub-rectangle of the source image to draw into the destination context.
   * @param dx The x-axis coordinate in the destination canvas at which to place the top-left corner of the source image.
   * @param dy The y-axis coordinate in the destination canvas at which to place the top-left corner of the source image.
   * @param dw The width to draw the image in the destination canvas. This allows scaling of the drawn image.
   * @param dh The height to draw the image in the destination canvas. This allows scaling of the drawn image.
   * @returns this instance for chaining.
   */
  drawImageRegion(
    image: CanvasImageSource,
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    dx: number,
    dy: number,
    dw: number,
    dh: number,
  ): this {
    this.ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
    return this;
  }

  /**
   * Paint the entire ImageData object onto the canvas at the destination coordinates (dx, dy).
   *
   * @param imageData An ImageData object containing the array of pixel values.
   * @param dx Horizontal position (x coordinate) at which to place the image data in the destination canvas.
   * @param dy Vertical position (y coordinate) at which to place the image data in the destination canvas.
   * @returns this instance for chaining.
   */
  putImageDataAt(imageData: ImageData, dx: number, dy: number): this {
    this.ctx.putImageData(imageData, dx, dy);
    return this;
  }

  /**
   * Paint only a rectangular region of the ImageData (defined by dirtyX, dirtyY, dirtyWidth, dirtyHeight) onto the canvas at (dx, dy).
   *
   * @param imageData An ImageData object containing the array of pixel values.
   * @param dx Horizontal position (x coordinate) at which to place the image data in the destination canvas.
   * @param dy Vertical position (y coordinate) at which to place the image data in the destination canvas.
   * @param dirtyX Horizontal position (x coordinate) of the top-left corner from which the image data will be extracted. Defaults to 0.
   * @param dirtyY Vertical position (y coordinate) of the top-left corner from which the image data will be extracted. Defaults to 0.
   * @param dirtyWidth Width of the rectangle to be painted. Defaults to the width of the image data.
   * @param dirtyHeight Height of the rectangle to be painted. Defaults to the height of the image data.
   * @returns this instance for chaining.
   */
  putImageDataRegion(
    imageData: ImageData,
    dx: number,
    dy: number,
    dirtyX: number,
    dirtyY: number,
    dirtyWidth: number,
    dirtyHeight: number,
  ): this {
    this.ctx.putImageData(
      imageData,
      dx,
      dy,
      dirtyX,
      dirtyY,
      dirtyWidth,
      dirtyHeight,
    );
    return this;
  }

  // CLIP

  /**
   * Turns the current path into the current clipping region.
   *
   * The previous clipping region, if any, is intersected with the current or given path to create the new clipping region.
   *
   * @param fillRule Optional, the algorithm by which to determine if a point is inside or outside the clipping region.
   * Possible values: `nonzero` and `evenodd`.
   * @returns this instance for chaining.
   */
  clip(fillRule?: CanvasFillRule): this {
    this.ctx.clip(fillRule);
    return this;
  }

  /**
   * Turns the given path into the current clipping region.
   *
   * The previous clipping region, if any, is intersected with the current or given path to create the new clipping region.
   *
   * @param path Path2D
   * @param fillRule Optional, the algorithm by which to determine if a point is inside or outside the clipping region.
   * Possible values: `nonzero` and `evenodd`.
   * @returns this instance for chaining.
   */
  clipPath(path: Path2D, fillRule?: CanvasFillRule): this {
    this.ctx.clip(path, fillRule);
    return this;
  }

  // STATE

  /**
   * Returns true if the rendering context is lost (and has not yet been reset).
   *
   * This might occur due to driver crashes, running out of memory, and so on.
   *
   * @returns true if the rendering context was lost; false otherwise.
   */
  isContextLost(): boolean {
    return this.ctx.isContextLost();
  }

  /**
   * Saves the entire state of the canvas by pushing the current state onto a stack.
   *
   * @returns this instance for chaining.
   */
  save(): this {
    this.ctx.save();
    return this;
  }

  /**
   * Restores the most recently saved canvas state by popping the top entry in the drawing state stack.
   *
   * If there is no saved state, this method does nothing.
   *
   * @returns this instance for chaining.
   */
  restore(): this {
    this.ctx.restore();
    return this;
  }

  /**
   * Resets the rendering context to its default state,
   * allowing it to be reused for drawing something else without having to explicitly reset all the properties.
   *
   * Resetting clears the backing buffer, drawing state stack, any defined paths, and styles.
   *
   * This includes the current transformation matrix, compositing properties, clipping region, dash list,
   * line styles, text styles, shadows, image smoothing, filters, and so on.
   *
   * @returns this instance for chaining.
   */
  reset(): this {
    this.ctx.reset();
    return this;
  }

  // QUERY

  /**
   * Returns a TextMetrics object that contains information about the measured text (such as its width, for example).
   *
   * @param text The text string to measure.
   * @returns A TextMetrics object.
   */
  measureText(text: string): TextMetrics {
    return this.ctx.measureText(text);
  }

  /**
   * Tries to acquire the `CanvasRenderingContext2D` object
   * from the `Canvas` and wrap it in `CanvasContext2D`.
   *
   * @param canvas The `Canvas` class instance.
   * @param options Optional CanvasRenderingContext2DSettings object.
   * @returns A CanvasContext2D instance or null if `getContext` fails.
   */
  static fromCanvas(
    canvas: Canvas,
    options?: CanvasRenderingContext2DSettings,
  ): CanvasContext2D | null {
    const ctx = canvas.getContext2D(options);
    return ctx ? new CanvasContext2D(ctx) : null;
  }
}
