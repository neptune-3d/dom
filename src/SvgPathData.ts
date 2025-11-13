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
export class SvgPathData {
  protected _segments: string[] = [];

  /**
   * Moves the current drawing position to the coordinate (x, y).
   * Starts a new subpath without drawing a line.
   *
   * Equivalent to the SVG `M` or `m` command.
   *
   * @param x - X coordinate of the new position.
   * @param y - Y coordinate of the new position.
   * @param relative - If true, uses relative coordinates (`m`); otherwise absolute (`M`)
   * @return This instance for chaining.
   */
  m(x: number, y: number, relative: boolean = false): this {
    const cmd = relative ? "m" : "M";
    this._segments.push(`${cmd}${x} ${y}`);
    return this;
  }

  /**
   * Draws a straight line from the current position to (x, y).
   * Adds a visible segment to the path.
   *
   * Equivalent to the SVG `L` or `l` command.
   *
   * @param x - X coordinate of the line endpoint.
   * @param y - Y coordinate of the line endpoint.
   * @param relative - If true, uses relative coordinates (`l`); otherwise absolute (`L`)
   * @return This instance for chaining.
   */
  l(x: number, y: number, relative: boolean = false): this {
    const cmd = relative ? "l" : "L";
    this._segments.push(`${cmd}${x} ${y}`);
    return this;
  }

  /**
   * Draws a horizontal line to the given x coordinate,
   * keeping the current y position unchanged.
   *
   * Equivalent to the SVG `H` or `h` command.
   *
   * @param x - X coordinate of the line endpoint.
   * @param relative - If true, uses relative coordinates (`h`); otherwise absolute (`H`)
   * @return This instance for chaining.
   */
  h(x: number, relative: boolean = false): this {
    const cmd = relative ? "h" : "H";
    this._segments.push(`${cmd}${x}`);
    return this;
  }

  /**
   * Draws a vertical line to the given y coordinate,
   * keeping the current x position unchanged.
   *
   * Equivalent to the SVG `V` or `v` command.
   *
   * @param y - Y coordinate of the line endpoint.
   * @param relative - If true, uses relative coordinates (`v`); otherwise absolute (`V`)
   * @return This instance for chaining.
   */
  v(y: number, relative: boolean = false): this {
    const cmd = relative ? "v" : "V";
    this._segments.push(`${cmd}${y}`);
    return this;
  }

  /**
   * Draws a cubic Bézier curve from the current position to (x, y),
   * using two control points to shape the curve.
   *
   * Equivalent to the SVG `C` or `c` command.
   *
   * @param cx1 - X coordinate of the first control point.
   * @param cy1 - Y coordinate of the first control point.
   * @param cx2 - X coordinate of the second control point.
   * @param cy2 - Y coordinate of the second control point.
   * @param x - Destination x coordinate.
   * @param y - Destination y coordinate.
   * @param relative - If true, uses relative coordinates (`c`); otherwise absolute (`C`)
   * @return This instance for chaining.
   */
  c(
    cx1: number,
    cy1: number,
    cx2: number,
    cy2: number,
    x: number,
    y: number,
    relative: boolean = false
  ): this {
    const cmd = relative ? "c" : "C";
    this._segments.push(`${cmd}${cx1} ${cy1}, ${cx2} ${cy2}, ${x} ${y}`);
    return this;
  }

  /**
   * Draws a quadratic Bézier curve from the current position to (x, y),
   * using a single control point to shape the curve.
   *
   * Equivalent to the SVG `Q` or `q` command.
   *
   * @param cx - X coordinate of the control point.
   * @param cy - Y coordinate of the control point.
   * @param x - Destination x coordinate.
   * @param y - Destination y coordinate.
   * @param relative - If true, uses relative coordinates (`q`); otherwise absolute (`Q`)
   * @return This instance for chaining.
   */
  q(
    cx: number,
    cy: number,
    x: number,
    y: number,
    relative: boolean = false
  ): this {
    const cmd = relative ? "q" : "Q";
    this._segments.push(`${cmd}${cx} ${cy}, ${x} ${y}`);
    return this;
  }

  /**
   * Draws an elliptical arc from the current position to the coordinate (x, y),
   * using the specified radii, rotation, and arc/sweep flags.
   *
   * Equivalent to the SVG `A` or `a` command.
   *
   * @param rx - Horizontal radius of the ellipse.
   * @param ry - Vertical radius of the ellipse.
   * @param xAxisRotation - Rotation (in degrees) of the ellipse's x-axis.
   * @param largeArc - If true, draws the larger arc (≥ 180°).
   * @param sweep - If true, draws clockwise.
   * @param x - Destination x coordinate.
   * @param y - Destination y coordinate.
   * @param relative - If true, uses relative coordinates (`a`); otherwise absolute (`A`)
   * @return This instance for chaining.
   */
  a(
    rx: number,
    ry: number,
    xAxisRotation: number,
    largeArc: boolean,
    sweep: boolean,
    x: number,
    y: number,
    relative: boolean = false
  ): this {
    const cmd = relative ? "a" : "A";
    this._segments.push(
      `${cmd}${rx} ${ry} ${xAxisRotation} ${largeArc ? 1 : 0} ${
        sweep ? 1 : 0
      } ${x} ${y}`
    );
    return this;
  }

  /**
   * Draws a smooth quadratic Bézier curve to (x, y),
   * reflecting the previous control point.
   *
   * Equivalent to the SVG `T` or `t` command.
   *
   * @param x - Destination x
   * @param y - Destination y
   * @param relative - If true, uses relative coordinates (`t`); otherwise absolute (`T`)
   * @return This instance for chaining.
   */
  t(x: number, y: number, relative: boolean = false): this {
    const cmd = relative ? "t" : "T";
    this._segments.push(`${cmd}${x} ${y}`);
    return this;
  }

  /**
   * Draws a smooth cubic Bézier curve from the current position to (x, y),
   * using one control point. The first control point is inferred from the previous segment.
   *
   * Equivalent to the SVG `S` or `s` command.
   *
   * @param cx2 - X coordinate of the second control point.
   * @param cy2 - Y coordinate of the second control point.
   * @param x - Destination x coordinate.
   * @param y - Destination y coordinate.
   * @param relative - If true, uses relative coordinates (`s`); otherwise absolute (`S`)
   * @return This instance for chaining.
   */
  s(
    cx2: number,
    cy2: number,
    x: number,
    y: number,
    relative: boolean = false
  ): this {
    const cmd = relative ? "s" : "S";
    this._segments.push(`${cmd}${cx2} ${cy2}, ${x} ${y}`);
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
   * @param relative - If true, uses relative coordinates (`m`, `h`, `v`); otherwise absolute (`M`, `H`, `V`)
   * @return This instance for chaining.
   */
  rect(
    x: number,
    y: number,
    width: number,
    height: number,
    relative: boolean = false
  ): this {
    if (relative) {
      return this.m(x, y, true)
        .h(width, true)
        .v(height, true)
        .h(-width, true)
        .close();
    } else {
      return this.m(x, y)
        .h(x + width)
        .v(y + height)
        .h(x)
        .close();
    }
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

    return this.m(x + r, y)
      .h(right - r)
      .a(r, r, 0, false, true, right, y + r)
      .v(bottom - r)
      .a(r, r, 0, false, true, right - r, bottom)
      .h(x + r)
      .a(r, r, 0, false, true, x, bottom - r)
      .v(y + r)
      .a(r, r, 0, false, true, x + r, y)
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
   * @param relative - If true, uses relative coordinates (`m`, `a`); otherwise absolute (`M`, `A`)
   * @return This instance for chaining.
   */
  circle(cx: number, cy: number, r: number, relative: boolean = false): this {
    const startX = cx + r;
    const startY = cy;

    if (relative) {
      return this.m(startX, startY, true)
        .a(r, r, 0, true, false, -2 * r, 0, true)
        .a(r, r, 0, true, false, 2 * r, 0, true);
    } else {
      return this.m(startX, startY)
        .a(r, r, 0, true, false, cx - r, cy)
        .a(r, r, 0, true, false, startX, startY);
    }
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
   * @param relative - If true, uses relative coordinates (`m`, `a`); otherwise absolute (`M`, `A`)
   * @return This instance for chaining.
   */
  ellipse(
    cx: number,
    cy: number,
    rx: number,
    ry: number,
    relative: boolean = false
  ): this {
    const startX = cx + rx;
    const startY = cy;

    if (relative) {
      return this.m(startX, startY, true)
        .a(rx, ry, 0, true, false, -2 * rx, 0, true)
        .a(rx, ry, 0, true, false, 2 * rx, 0, true);
    } else {
      return this.m(startX, startY)
        .a(rx, ry, 0, true, false, cx - rx, cy)
        .a(rx, ry, 0, true, false, startX, startY);
    }
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
   * @param relative - If true, uses relative coordinates (`m`, `l`); otherwise absolute (`M`, `L`)
   * @return This instance for chaining.
   */
  star(
    cx: number,
    cy: number,
    points: number,
    radius: number,
    insetRatio = 0.5,
    relative: boolean = false
  ): this {
    if (points < 2) return this;

    const angleStep = Math.PI / points;
    const innerRadius = radius * insetRatio;

    for (let i = 0; i < points * 2; i++) {
      const r = i % 2 === 0 ? radius : innerRadius;
      const angle = i * angleStep - Math.PI / 2;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);

      if (relative) {
        const dx = r * Math.cos(angle);
        const dy = r * Math.sin(angle);
        i === 0 ? this.m(dx, dy, true) : this.l(dx, dy, true);
      } else {
        i === 0 ? this.m(x, y) : this.l(x, y);
      }
    }

    return this.close();
  }

  /**
   * Adds a closed polygon path using the provided list of points.
   * Uses `moveTo` and `lineTo` to connect each vertex, then closes the shape.
   *
   * @param points - Array of [x, y] coordinate pairs.
   * @param relative - If true, uses relative coordinates (`m`, `l`); otherwise absolute (`M`, `L`)
   * @return This instance for chaining.
   */
  polygon(points: [number, number][], relative: boolean = false): this {
    if (points.length < 2) return this;

    const [firstX, firstY] = points[0];
    this.m(firstX, firstY, relative);

    for (let i = 1, len = points.length; i < len; i++) {
      const [x, y] = points[i];
      this.l(x, y, relative);
    }

    return this.close();
  }

  /**
   * Adds an open polyline path using the provided list of points.
   * Uses `moveTo` and `lineTo` to connect each vertex without closing the shape.
   *
   * @param points - Array of [x, y] coordinate pairs.
   * @param relative - If true, uses relative coordinates (`m`, `l`); otherwise absolute (`M`, `L`)
   * @return This instance for chaining.
   */
  polyline(points: [number, number][], relative: boolean = false): this {
    if (points.length < 2) return this;

    const [firstX, firstY] = points[0];
    this.m(firstX, firstY, relative);

    for (let i = 1, len = points.length; i < len; i++) {
      const [x, y] = points[i];
      this.l(x, y, relative);
    }

    return this;
  }

  /**
   * Adds a smooth spline through the given points using cubic Bézier segments.
   * Uses Catmull-Rom to Bézier conversion for natural curvature.
   *
   * @param points - Array of [x, y] coordinate pairs (minimum 2).
   * @param tension - Controls curve tightness (default: 0.5). Lower = looser, higher = tighter.
   * @param relative - If true, uses relative coordinates (`m`, `c`); otherwise absolute (`M`, `C`)
   * @return This instance for chaining.
   */
  spline(
    points: [number, number][],
    tension = 0.5,
    relative: boolean = false
  ): this {
    const n = points.length;
    if (n < 2) return this;

    let [startX, startY] = points[0];
    this.m(startX, startY, relative);

    for (let i = 0; i < n - 1; i++) {
      const [p0x, p0y] = points[i - 1] ?? points[i];
      const [p1x, p1y] = points[i];
      const [p2x, p2y] = points[i + 1];
      const [p3x, p3y] = points[i + 2] ?? points[i + 1];

      const d1x = ((p2x - p0x) * tension) / 6;
      const d1y = ((p2y - p0y) * tension) / 6;
      const d2x = ((p3x - p1x) * tension) / 6;
      const d2y = ((p3y - p1y) * tension) / 6;

      if (relative) {
        const dx1 = p1x + d1x - startX;
        const dy1 = p1y + d1y - startY;
        const dx2 = p2x - d2x - startX;
        const dy2 = p2y - d2y - startY;
        const dx = p2x - startX;
        const dy = p2y - startY;
        this.c(dx1, dy1, dx2, dy2, dx, dy, true);
      } else {
        this.c(p1x + d1x, p1y + d1y, p2x - d2x, p2y - d2y, p2x, p2y);
      }

      [startX, startY] = [p2x, p2y];
    }

    return this;
  }

  /**
   * Adds a path from the given list of points.
   * Uses `moveTo` and `lineTo` to connect each vertex, optionally closing the shape.
   *
   * @param points - Array of [x, y] coordinate pairs.
   * @param close - Whether to close the path (default: false).
   * @param relative - If true, uses relative coordinates (`m`, `l`); otherwise absolute (`M`, `L`)
   * @return This instance for chaining.
   */
  pathFrom(
    points: [number, number][],
    close = false,
    relative: boolean = false
  ): this {
    if (points.length < 2) return this;

    const [firstX, firstY] = points[0];
    this.m(firstX, firstY, relative);

    for (let i = 1, len = points.length; i < len; i++) {
      const [x, y] = points[i];
      this.l(x, y, relative);
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
   * @param relative - If true, uses relative coordinates (`m`, `c`); otherwise absolute (`M`, `C`)
   * @return This instance for chaining.
   */
  polyBezier(points: [number, number][], relative: boolean = false): this {
    if (points.length < 4 || (points.length - 1) % 3 !== 0) return this;

    let [startX, startY] = points[0];
    this.m(startX, startY, relative);

    for (let i = 1; i < points.length; i += 3) {
      const [cx1, cy1] = points[i];
      const [cx2, cy2] = points[i + 1];
      const [x, y] = points[i + 2];

      if (relative) {
        const dx1 = cx1 - startX;
        const dy1 = cy1 - startY;
        const dx2 = cx2 - startX;
        const dy2 = cy2 - startY;
        const dx = x - startX;
        const dy = y - startY;
        this.c(dx1, dy1, dx2, dy2, dx, dy, true);
      } else {
        this.c(cx1, cy1, cx2, cy2, x, y);
      }

      [startX, startY] = [x, y];
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
   * @param relative - If true, uses relative coordinates (`m`, `q`); otherwise absolute (`M`, `Q`)
   * @return This instance for chaining.
   */
  polyQuadratic(points: [number, number][], relative: boolean = false): this {
    if (points.length < 3 || (points.length - 1) % 2 !== 0) return this;

    let [startX, startY] = points[0];
    this.m(startX, startY, relative);

    for (let i = 1; i < points.length; i += 2) {
      const [cx, cy] = points[i];
      const [x, y] = points[i + 1];

      if (relative) {
        const dx1 = cx - startX;
        const dy1 = cy - startY;
        const dx2 = x - startX;
        const dy2 = y - startY;
        this.q(dx1, dy1, dx2, dy2, true);
      } else {
        this.q(cx, cy, x, y);
      }

      [startX, startY] = [x, y];
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
   * @param relative - If true, uses relative coordinates (`m`, `a`); otherwise absolute (`M`, `A`)
   * @return This instance for chaining.
   */
  polyArc(segments: (number | boolean)[][], relative: boolean = false): this {
    if (segments.length < 2) return this;

    let [startX, startY] = segments[0] as [number, number];
    this.m(startX, startY, relative);

    for (let i = 1, len = segments.length; i < len; i++) {
      const [rx, ry, xAxisRotation, largeArc, sweep, x, y] = segments[i] as [
        number,
        number,
        number,
        boolean,
        boolean,
        number,
        number
      ];

      if (relative) {
        const dx = x - startX;
        const dy = y - startY;
        this.a(rx, ry, xAxisRotation, largeArc, sweep, dx, dy, true);
      } else {
        this.a(rx, ry, xAxisRotation, largeArc, sweep, x, y);
      }

      [startX, startY] = [x, y];
    }

    return this;
  }

  toString(): string {
    return this._segments.join(" ");
  }
}

export function $d() {
  return new SvgPathData();
}
