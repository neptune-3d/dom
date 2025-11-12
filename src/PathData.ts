/**
 * Fluent builder for constructing the `d` attribute of an SVG `<path>` element.
 * Supports common path commands with type-safe chaining and automatic formatting.
 *
 * Example:
 *   new PathData()
 *     .moveTo(10, 10)
 *     .lineTo(100, 100)
 *     .close()
 *     .toString(); // "M10 10 L100 100 Z"
 */
export class PathData {
  protected _segments: string[] = [];

  /**
   * Moves the current drawing position to the absolute coordinate (x, y).
   * Starts a new subpath without drawing a line.
   *
   * Equivalent to the SVG `M` command.
   *
   * @param x - Absolute x coordinate.
   * @param y - Absolute y coordinate.
   * @return This instance for chaining.
   */
  moveTo(x: number, y: number): this {
    this._segments.push(`M${x} ${y}`);
    return this;
  }

  /**
   * Moves the current drawing position by a relative offset (dx, dy).
   * Starts a new subpath without drawing a line.
   *
   * Equivalent to the SVG `m` command.
   *
   * @param dx - Relative x offset from the current position.
   * @param dy - Relative y offset from the current position.
   * @return This instance for chaining.
   */
  moveToRel(dx: number, dy: number): this {
    this._segments.push(`m${dx} ${dy}`);
    return this;
  }

  /**
   * Draws a straight line from the current position to the absolute coordinate (x, y).
   * Adds a visible segment to the path.
   *
   * Equivalent to the SVG `L` command.
   *
   * @param x - Absolute x coordinate of the line endpoint.
   * @param y - Absolute y coordinate of the line endpoint.
   * @return This instance for chaining.
   */
  lineTo(x: number, y: number): this {
    this._segments.push(`L${x} ${y}`);
    return this;
  }

  /**
   * Draws a straight line from the current position by a relative offset (dx, dy).
   * Adds a visible segment to the path.
   *
   * Equivalent to the SVG `l` command.
   *
   * @param dx - Relative x offset from the current position.
   * @param dy - Relative y offset from the current position.
   * @return This instance for chaining.
   */
  lineToRel(dx: number, dy: number): this {
    this._segments.push(`l${dx} ${dy}`);
    return this;
  }

  /**
   * Draws a horizontal line from the current position to the absolute x coordinate.
   * Keeps the current y position unchanged.
   *
   * Equivalent to the SVG `H` command.
   *
   * @param x - Absolute x coordinate of the line endpoint.
   * @return This instance for chaining.
   */
  horizontal(x: number): this {
    this._segments.push(`H${x}`);
    return this;
  }

  /**
   * Draws a horizontal line from the current position by a relative x offset.
   * Keeps the current y position unchanged.
   *
   * Equivalent to the SVG `h` command.
   *
   * @param dx - Relative x offset from the current position.
   * @return This instance for chaining.
   */
  horizontalRel(dx: number): this {
    this._segments.push(`h${dx}`);
    return this;
  }

  /**
   * Draws a vertical line from the current position to the absolute y coordinate.
   * Keeps the current x position unchanged.
   *
   * Equivalent to the SVG `V` command.
   *
   * @param y - Absolute y coordinate of the line endpoint.
   * @return This instance for chaining.
   */
  vertical(y: number): this {
    this._segments.push(`V${y}`);
    return this;
  }

  /**
   * Draws a vertical line from the current position by a relative y offset.
   * Keeps the current x position unchanged.
   *
   * Equivalent to the SVG `v` command.
   *
   * @param dy - Relative y offset from the current position.
   * @return This instance for chaining.
   */
  verticalRel(dy: number): this {
    this._segments.push(`v${dy}`);
    return this;
  }

  /**
   * Draws a cubic Bézier curve from the current position to the absolute coordinate (x, y),
   * using two control points to shape the curve.
   *
   * Equivalent to the SVG `C` command.
   *
   * @param cx1 - Absolute x coordinate of the first control point.
   * @param cy1 - Absolute y coordinate of the first control point.
   * @param cx2 - Absolute x coordinate of the second control point.
   * @param cy2 - Absolute y coordinate of the second control point.
   * @param x - Absolute x coordinate of the curve endpoint.
   * @param y - Absolute y coordinate of the curve endpoint.
   * @return This instance for chaining.
   */
  curveTo(
    cx1: number,
    cy1: number,
    cx2: number,
    cy2: number,
    x: number,
    y: number
  ): this {
    this._segments.push(`C${cx1} ${cy1}, ${cx2} ${cy2}, ${x} ${y}`);
    return this;
  }

  /**
   * Draws a cubic Bézier curve from the current position by a relative offset (dx, dy),
   * using two relative control points to shape the curve.
   *
   * Equivalent to the SVG `c` command.
   *
   * @param dc1x - Relative x offset of the first control point.
   * @param dc1y - Relative y offset of the first control point.
   * @param dc2x - Relative x offset of the second control point.
   * @param dc2y - Relative y offset of the second control point.
   * @param dx - Relative x offset of the curve endpoint.
   * @param dy - Relative y offset of the curve endpoint.
   * @return This instance for chaining.
   */
  curveToRel(
    dc1x: number,
    dc1y: number,
    dc2x: number,
    dc2y: number,
    dx: number,
    dy: number
  ): this {
    this._segments.push(`c${dc1x} ${dc1y}, ${dc2x} ${dc2y}, ${dx} ${dy}`);
    return this;
  }

  /**
   * Draws a quadratic Bézier curve from the current position to the absolute coordinate (x, y),
   * using a single control point to shape the curve.
   *
   * Equivalent to the SVG `Q` command.
   *
   * @param cx - Absolute x coordinate of the control point.
   * @param cy - Absolute y coordinate of the control point.
   * @param x - Absolute x coordinate of the curve endpoint.
   * @param y - Absolute y coordinate of the curve endpoint.
   * @return This instance for chaining.
   */
  quadraticTo(cx: number, cy: number, x: number, y: number): this {
    this._segments.push(`Q${cx} ${cy}, ${x} ${y}`);
    return this;
  }

  /**
   * Draws a quadratic Bézier curve from the current position by a relative offset (dx, dy),
   * using a single relative control point to shape the curve.
   *
   * Equivalent to the SVG `q` command.
   *
   * @param dcx - Relative x offset of the control point.
   * @param dcy - Relative y offset of the control point.
   * @param dx - Relative x offset of the curve endpoint.
   * @param dy - Relative y offset of the curve endpoint.
   * @return This instance for chaining.
   */
  quadraticToRel(dcx: number, dcy: number, dx: number, dy: number): this {
    this._segments.push(`q${dcx} ${dcy}, ${dx} ${dy}`);
    return this;
  }

  /**
   * Draws an elliptical arc from the current position to the absolute coordinate (x, y),
   * using the specified radii, rotation, and arc/sweep flags.
   *
   * Equivalent to the SVG `A` command.
   *
   * @param rx - Horizontal radius of the ellipse.
   * @param ry - Vertical radius of the ellipse.
   * @param xAxisRotation - Rotation (in degrees) of the ellipse's x-axis relative to the coordinate system.
   * @param largeArc - If true, draws the larger of the two possible arcs (sweep angle ≥ 180°).
   * @param sweep - If true, draws the arc in a "positive-angle" (clockwise) direction.
   * @param x - Absolute x coordinate of the arc endpoint.
   * @param y - Absolute y coordinate of the arc endpoint.
   * @return This instance for chaining.
   */
  arcTo(
    rx: number,
    ry: number,
    xAxisRotation: number,
    largeArc: boolean,
    sweep: boolean,
    x: number,
    y: number
  ): this {
    this._segments.push(
      `A${rx} ${ry} ${xAxisRotation} ${largeArc ? 1 : 0} ${
        sweep ? 1 : 0
      } ${x} ${y}`
    );
    return this;
  }

  /**
   * Draws an elliptical arc from the current position by a relative offset (dx, dy),
   * using the specified radii, rotation, and arc/sweep flags.
   *
   * Equivalent to the SVG `a` command.
   *
   * @param rx - Horizontal radius of the ellipse.
   * @param ry - Vertical radius of the ellipse.
   * @param xAxisRotation - Rotation (in degrees) of the ellipse's x-axis relative to the coordinate system.
   * @param largeArc - If true, draws the larger of the two possible arcs (sweep angle ≥ 180°).
   * @param sweep - If true, draws the arc in a "positive-angle" (clockwise) direction.
   * @param dx - Relative x offset of the arc endpoint.
   * @param dy - Relative y offset of the arc endpoint.
   * @return This instance for chaining.
   */
  arcToRel(
    rx: number,
    ry: number,
    xAxisRotation: number,
    largeArc: boolean,
    sweep: boolean,
    dx: number,
    dy: number
  ): this {
    this._segments.push(
      `a${rx} ${ry} ${xAxisRotation} ${largeArc ? 1 : 0} ${
        sweep ? 1 : 0
      } ${dx} ${dy}`
    );
    return this;
  }

  /**
   * Closes the current subpath by drawing a straight line back to its starting point.
   * Ensures the shape is fully enclosed, which is important for fill operations.
   *
   * Equivalent to the SVG `Z` command.
   *
   * @return This instance for chaining.
   */
  close(): this {
    this._segments.push("Z");
    return this;
  }

  /**
   * Adds a rectangular path starting at (x, y) with the given width and height.
   * Uses `moveTo`, `horizontal`, `vertical`, and `close` for fluent composition.
   *
   * @param x - Top-left x coordinate.
   * @param y - Top-left y coordinate.
   * @param width - Width of the rectangle.
   * @param height - Height of the rectangle.
   * @return This instance for chaining.
   */
  rect(x: number, y: number, width: number, height: number): this {
    return this.moveTo(x, y)
      .horizontal(x + width)
      .vertical(y + height)
      .horizontal(x)
      .close();
  }

  /**
   * Adds a rectangular path using relative coordinates from the current position.
   * Uses `moveToRel`, `horizontalRel`, `verticalRel`, and `close` for fluent composition.
   *
   * @param dx - Relative x offset from the current position.
   * @param dy - Relative y offset from the current position.
   * @param width - Width of the rectangle.
   * @param height - Height of the rectangle.
   * @return This instance for chaining.
   */
  rectRel(dx: number, dy: number, width: number, height: number): this {
    return this.moveToRel(dx, dy)
      .horizontalRel(width)
      .verticalRel(height)
      .horizontalRel(-width)
      .close();
  }

  /**
   * Adds a rounded rectangle path starting at (x, y) with the given width, height, and corner radius.
   * Uses `moveTo`, `arcTo`, `horizontal`, `vertical`, and `close` for fluent composition.
   *
   * @param x - Top-left x coordinate.
   * @param y - Top-left y coordinate.
   * @param width - Width of the rectangle.
   * @param height - Height of the rectangle.
   * @param r - Radius of the corners.
   * @return This instance for chaining.
   */
  roundedRect(
    x: number,
    y: number,
    width: number,
    height: number,
    r: number
  ): this {
    const right = x + width;
    const bottom = y + height;

    return this.moveTo(x + r, y)
      .horizontal(right - r)
      .arcTo(r, r, 0, false, true, right, y + r)
      .vertical(bottom - r)
      .arcTo(r, r, 0, false, true, right - r, bottom)
      .horizontal(x + r)
      .arcTo(r, r, 0, false, true, x, bottom - r)
      .vertical(y + r)
      .arcTo(r, r, 0, false, true, x + r, y)
      .close();
  }

  /**
   * Adds a circular path centered at (cx, cy) with radius `r`.
   * Uses `moveTo` and two `arcTo` commands to complete the full circle.
   *
   * This creates a clockwise circle starting at the rightmost point.
   *
   * @param cx - Center x coordinate.
   * @param cy - Center y coordinate.
   * @param r - Radius of the circle.
   * @return This instance for chaining.
   */
  circle(cx: number, cy: number, r: number): this {
    const startX = cx + r;
    const startY = cy;
    return this.moveTo(startX, startY)
      .arcTo(r, r, 0, true, false, cx - r, cy)
      .arcTo(r, r, 0, true, false, startX, startY);
  }

  /**
   * Adds a circular path using relative coordinates from the current position.
   * Uses `moveToRel` and two `arcToRel` commands to complete the full circle.
   *
   * Starts at (r, 0) relative to the current position.
   *
   * @param dx - Relative x offset to the circle center.
   * @param dy - Relative y offset to the circle center.
   * @param r - Radius of the circle.
   * @return This instance for chaining.
   */
  circleRel(dx: number, dy: number, r: number): this {
    return this.moveToRel(dx + r, dy)
      .arcToRel(r, r, 0, true, false, -2 * r, 0)
      .arcToRel(r, r, 0, true, false, 2 * r, 0);
  }

  /**
   * Adds an elliptical path centered at (cx, cy) with radii `rx` and `ry`.
   * Uses `moveTo` and two `arcTo` commands to complete the full ellipse.
   *
   * Starts at the rightmost point of the ellipse and draws two arcs to complete it.
   *
   * @param cx - Center x coordinate.
   * @param cy - Center y coordinate.
   * @param rx - Horizontal radius.
   * @param ry - Vertical radius.
   * @return This instance for chaining.
   */
  ellipse(cx: number, cy: number, rx: number, ry: number): this {
    const startX = cx + rx;
    const startY = cy;
    return this.moveTo(startX, startY)
      .arcTo(rx, ry, 0, true, false, cx - rx, cy)
      .arcTo(rx, ry, 0, true, false, startX, startY);
  }

  /**
   * Adds a regular star shape centered at (cx, cy) with the given number of points and outer radius.
   * Uses `moveTo` and `lineTo` to connect alternating outer and inner vertices.
   *
   * @param cx - Center x coordinate.
   * @param cy - Center y coordinate.
   * @param points - Number of star points (minimum 2).
   * @param radius - Outer radius of the star.
   * @param insetRatio - Ratio of inner radius to outer radius (default: 0.5).
   * @return This instance for chaining.
   */
  star(
    cx: number,
    cy: number,
    points: number,
    radius: number,
    insetRatio = 0.5
  ): this {
    if (points < 2) return this;

    const angleStep = Math.PI / points;
    const innerRadius = radius * insetRatio;

    for (let i = 0; i < points * 2; i++) {
      const r = i % 2 === 0 ? radius : innerRadius;
      const angle = i * angleStep - Math.PI / 2;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);

      i === 0 ? this.moveTo(x, y) : this.lineTo(x, y);
    }

    return this.close();
  }

  /**
   * Adds a closed polygon path using the provided list of points.
   * Uses `moveTo` and `lineTo` to connect each vertex, then closes the shape.
   *
   * @param points - Array of [x, y] coordinate pairs.
   * @return This instance for chaining.
   */
  polygon(points: [number, number][]): this {
    if (points.length < 2) return this;

    const [firstX, firstY] = points[0];
    this.moveTo(firstX, firstY);

    for (let i = 1; i < points.length; i++) {
      const [x, y] = points[i];
      this.lineTo(x, y);
    }

    return this.close();
  }

  /**
   * Adds an open polyline path using the provided list of points.
   * Uses `moveTo` and `lineTo` to connect each vertex without closing the shape.
   *
   * @param points - Array of [x, y] coordinate pairs.
   * @return This instance for chaining.
   */
  polyline(points: [number, number][]): this {
    if (points.length < 2) return this;

    const [firstX, firstY] = points[0];
    this.moveTo(firstX, firstY);

    for (let i = 1; i < points.length; i++) {
      const [x, y] = points[i];
      this.lineTo(x, y);
    }

    return this;
  }

  /**
   * Adds a smooth spline through the given points using cubic Bézier segments.
   * Uses Catmull-Rom to Bézier conversion for natural curvature.
   *
   * @param points - Array of [x, y] coordinate pairs (minimum 2).
   * @param tension - Controls curve tightness (default: 0.5). Lower = looser, higher = tighter.
   * @return This instance for chaining.
   */
  spline(points: [number, number][], tension = 0.5): this {
    const n = points.length;
    if (n < 2) return this;

    this.moveTo(points[0][0], points[0][1]);

    for (let i = 0; i < n - 1; i++) {
      const [p0x, p0y] = points[i - 1] ?? points[i];
      const [p1x, p1y] = points[i];
      const [p2x, p2y] = points[i + 1];
      const [p3x, p3y] = points[i + 2] ?? points[i + 1];

      const d1x = ((p2x - p0x) * tension) / 6;
      const d1y = ((p2y - p0y) * tension) / 6;
      const d2x = ((p3x - p1x) * tension) / 6;
      const d2y = ((p3y - p1y) * tension) / 6;

      this.curveTo(p1x + d1x, p1y + d1y, p2x - d2x, p2y - d2y, p2x, p2y);
    }

    return this;
  }

  /**
   * Adds a path from the given list of points.
   * Uses `moveTo` and `lineTo` to connect each vertex, optionally closing the shape.
   *
   * @param points - Array of [x, y] coordinate pairs.
   * @param close - Whether to close the path (default: false).
   * @return This instance for chaining.
   */
  pathFrom(points: [number, number][], close = false): this {
    if (points.length < 2) return this;

    const [firstX, firstY] = points[0];
    this.moveTo(firstX, firstY);

    for (let i = 1; i < points.length; i++) {
      const [x, y] = points[i];
      this.lineTo(x, y);
    }

    if (close) this.close();
    return this;
  }

  /**
   * Adds a path using relative point offsets from the current position.
   * Uses `moveToRel` and `lineToRel` to connect each vertex, optionally closing the shape.
   *
   * @param deltas - Array of [dx, dy] relative coordinate pairs.
   * @param close - Whether to close the path (default: false).
   * @return This instance for chaining.
   */
  pathFromRel(deltas: [number, number][], close = false): this {
    if (deltas.length < 2) return this;

    const [firstDx, firstDy] = deltas[0];
    this.moveToRel(firstDx, firstDy);

    for (let i = 1; i < deltas.length; i++) {
      const [dx, dy] = deltas[i];
      this.lineToRel(dx, dy);
    }

    if (close) this.close();
    return this;
  }

  /**
   * Adds a sequence of cubic Bézier segments using explicit control and end points.
   * Each segment is defined by two control points and one endpoint.
   *
   * The first point is used as the starting position (via `moveTo`),
   * and each subsequent triplet defines a `curveTo` segment.
   *
   * @param points - Array of [x, y] coordinate pairs: [start, c1, c2, end, c1, c2, end, ...].
   *                 Must contain 1 + 3×N points (N ≥ 1).
   * @return This instance for chaining.
   */
  polyBezier(points: [number, number][]): this {
    if (points.length < 4 || (points.length - 1) % 3 !== 0) return this;

    const [startX, startY] = points[0];
    this.moveTo(startX, startY);

    for (let i = 1; i < points.length; i += 3) {
      const [cx1, cy1] = points[i];
      const [cx2, cy2] = points[i + 1];
      const [x, y] = points[i + 2];
      this.curveTo(cx1, cy1, cx2, cy2, x, y);
    }

    return this;
  }

  /**
   * Adds a sequence of quadratic Bézier segments using explicit control and end points.
   * Each segment is defined by one control point and one endpoint.
   *
   * The first point is used as the starting position (via `moveTo`),
   * and each subsequent pair defines a `quadraticTo` segment.
   *
   * @param points - Array of [x, y] coordinate pairs: [start, c1, end, c1, end, ...].
   *                 Must contain 1 + 2×N points (N ≥ 1).
   * @return This instance for chaining.
   */
  polyQuadratic(points: [number, number][]): this {
    if (points.length < 3 || (points.length - 1) % 2 !== 0) return this;

    const [startX, startY] = points[0];
    this.moveTo(startX, startY);

    for (let i = 1; i < points.length; i += 2) {
      const [cx, cy] = points[i];
      const [x, y] = points[i + 1];
      this.quadraticTo(cx, cy, x, y);
    }

    return this;
  }

  /**
   * Adds a sequence of elliptical arc segments.
   * Each segment is defined by radii, rotation, arc/sweep flags, and an endpoint.
   *
   * The first point is used as the starting position (via `moveTo`),
   * and each subsequent arc segment is defined by a tuple of:
   * [rx, ry, xAxisRotation, largeArc, sweep, x, y]
   *
   * @param segments - Array of arc segments: [start, arc1, arc2, ...].
   *                   Must contain 1 + N×7 points (N ≥ 1).
   * @return This instance for chaining.
   */
  polyArc(segments: (number | boolean)[][]): this {
    if (segments.length < 2) return this;

    const [startX, startY] = segments[0] as [number, number];
    this.moveTo(startX, startY);

    for (let i = 1; i < segments.length; i++) {
      const [rx, ry, xAxisRotation, largeArc, sweep, x, y] = segments[i] as [
        number,
        number,
        number,
        boolean,
        boolean,
        number,
        number
      ];
      this.arcTo(rx, ry, xAxisRotation, largeArc, sweep, x, y);
    }

    return this;
  }

  toString(): string {
    return this._segments.join(" ");
  }
}
