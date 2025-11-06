import type { Property } from "csstype";
import type { Autocomplete, CssProperties } from "./types";

export abstract class BaseStyle {
  protected abstract setStyleProp(
    name: Autocomplete<keyof CssProperties>,
    value: string | number | undefined
  ): this;

  /**
   * Sets or clears the `padding` style of the element.
   * Accepts any valid CSS padding shorthand (e.g., "10px", "1em 2em").
   * Passing `undefined` removes the padding style.
   *
   * @param value - The padding value to apply, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  p(value: Property.Padding | undefined) {
    return this.setStyleProp("padding", value);
  }

  /**
   * Sets or clears the `padding-top` style of the element.
   * Accepts any valid CSS value (e.g., "10px", "1em").
   * Passing `undefined` removes the top padding.
   *
   * @param value - The top padding value to apply, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  pt(value: Property.PaddingTop | undefined) {
    return this.setStyleProp("paddingTop", value);
  }

  /**
   * Sets or clears the `padding-right` style of the element.
   * Accepts any valid CSS value (e.g., "10px", "1em").
   * Passing `undefined` removes the right padding.
   *
   * @param value - The right padding value to apply, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  pr(value: Property.PaddingRight | undefined) {
    return this.setStyleProp("paddingRight", value);
  }

  /**
   * Sets or clears the `padding-bottom` style of the element.
   * Accepts any valid CSS value (e.g., "10px", "1em").
   * Passing `undefined` removes the bottom padding.
   *
   * @param value - The bottom padding value to apply, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  pb(value: Property.PaddingBottom | undefined) {
    return this.setStyleProp("paddingBottom", value);
  }

  /**
   * Sets or clears the `padding-left` style of the element.
   * Accepts any valid CSS value (e.g., "10px", "1em").
   * Passing `undefined` removes the left padding.
   *
   * @param value - The left padding value to apply, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  pl(value: Property.PaddingLeft | undefined) {
    return this.setStyleProp("paddingLeft", value);
  }

  /**
   * Sets or clears horizontal padding (`padding-left` and `padding-right`) simultaneously.
   * Accepts any valid CSS value (e.g., "10px", "1em").
   * Passing `undefined` removes both left and right padding.
   *
   * @param value - The horizontal padding value to apply, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  px(value: Property.PaddingLeft | undefined) {
    return this.pl(value).pr(value);
  }

  /**
   * Sets or clears vertical padding (`padding-top` and `padding-bottom`) simultaneously.
   * Accepts any valid CSS value (e.g., "10px", "1em").
   * Passing `undefined` removes both top and bottom padding.
   *
   * @param value - The vertical padding value to apply, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  py(value: Property.PaddingTop | undefined) {
    return this.pt(value).pb(value);
  }

  /**
   * Sets or clears the `margin` style of the element.
   * Accepts any valid CSS margin shorthand (e.g., "10px", "1em 2em").
   * Passing `undefined` removes the margin style.
   *
   * @param value - The margin value to apply, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  m(value: Property.Margin | undefined) {
    return this.setStyleProp("margin", value);
  }

  /**
   * Sets or clears the `margin-top` style of the element.
   * Accepts any valid CSS value (e.g., "10px", "auto").
   * Passing `undefined` removes the top margin.
   *
   * @param value - The top margin value to apply, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  mt(value: Property.MarginTop | undefined) {
    return this.setStyleProp("marginTop", value);
  }

  /**
   * Sets or clears the `margin-right` style of the element.
   * Accepts any valid CSS value (e.g., "10px", "auto").
   * Passing `undefined` removes the right margin.
   *
   * @param value - The right margin value to apply, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  mr(value: Property.MarginRight | undefined) {
    return this.setStyleProp("marginRight", value);
  }

  /**
   * Sets or clears the `margin-bottom` style of the element.
   * Accepts any valid CSS value (e.g., "10px", "auto").
   * Passing `undefined` removes the bottom margin.
   *
   * @param value - The bottom margin value to apply, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  mb(value: Property.MarginBottom | undefined) {
    return this.setStyleProp("marginBottom", value);
  }

  /**
   * Sets or clears the `margin-left` style of the element.
   * Accepts any valid CSS value (e.g., "10px", "auto").
   * Passing `undefined` removes the left margin.
   *
   * @param value - The left margin value to apply, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  ml(value: Property.MarginLeft | undefined) {
    return this.setStyleProp("marginLeft", value);
  }

  /**
   * Sets the overall border radius.
   * @param value - The CSS border-radius value (e.g., "8px", "50%").
   * @return This instance for chaining.
   */
  radius(value: Property.BorderRadius | undefined) {
    return this.setStyleProp("borderRadius", value);
  }

  /**
   * Sets the top-left corner border radius.
   * @param value - The CSS border-top-left-radius value.
   * @return This instance for chaining.
   */
  radiusTopLeft(value: Property.BorderTopLeftRadius | undefined) {
    return this.setStyleProp("borderTopLeftRadius", value);
  }

  /**
   * Sets the top-right corner border radius.
   * @param value - The CSS border-top-right-radius value.
   * @return This instance for chaining.
   */
  radiusTopRight(value: Property.BorderTopRightRadius | undefined) {
    return this.setStyleProp("borderTopRightRadius", value);
  }

  /**
   * Sets the bottom-left corner border radius.
   * @param value - The CSS border-bottom-left-radius value.
   * @return This instance for chaining.
   */
  radiusBottomLeft(value: Property.BorderBottomLeftRadius | undefined) {
    return this.setStyleProp("borderBottomLeftRadius", value);
  }

  /**
   * Sets the bottom-right corner border radius.
   * @param value - The CSS border-bottom-right-radius value.
   * @return This instance for chaining.
   */
  radiusBottomRight(value: Property.BorderBottomRightRadius | undefined) {
    return this.setStyleProp("borderBottomRightRadius", value);
  }

  /**
   * Sets the border radius for both top corners.
   * @param value - The CSS border-radius value to apply to top-left and top-right corners.
   * @return This instance for chaining.
   */
  radiusTop(value: Property.BorderTopLeftRadius | undefined) {
    return this.radiusTopLeft(value).radiusTopRight(value);
  }

  /**
   * Sets the border radius for both bottom corners.
   * @param value - The CSS border-radius value to apply to bottom-left and bottom-right corners.
   * @return This instance for chaining.
   */
  radiusBottom(value: Property.BorderBottomLeftRadius | undefined) {
    return this.radiusBottomLeft(value).radiusBottomRight(value);
  }

  /**
   * Sets the border radius for both left corners.
   * @param value - The CSS border-radius value to apply to top-left and bottom-left corners.
   * @return This instance for chaining.
   */
  radiusLeft(value: Property.BorderTopLeftRadius | undefined) {
    return this.radiusTopLeft(value).radiusBottomLeft(value);
  }

  /**
   * Sets the border radius for both right corners.
   * @param value - The CSS border-radius value to apply to top-right and bottom-right corners.
   * @return This instance for chaining.
   */
  radiusRight(value: Property.BorderTopRightRadius | undefined) {
    return this.radiusTopRight(value).radiusBottomRight(value);
  }

  /**
   * Sets the border radius for both left and right sides (horizontal corners).
   * Applies to top-left, top-right, bottom-left, and bottom-right corners on the X axis.
   * @param value - The CSS border-radius value to apply horizontally.
   * @return This instance for chaining.
   */
  radiusX(value: Property.BorderRadius | undefined) {
    return this.radiusLeft(value).radiusRight(value);
  }

  /**
   * Sets the border radius for both top and bottom sides (vertical corners).
   * Applies to top-left, top-right, bottom-left, and bottom-right corners on the Y axis.
   * @param value - The CSS border-radius value to apply vertically.
   * @return This instance for chaining.
   */
  radiusY(value: Property.BorderRadius | undefined) {
    return this.radiusTop(value).radiusBottom(value);
  }

  /**
   * Sets the `display` style of the element.
   * Common values include "block", "inline", "flex", "grid", or "none".
   * Controls the element's layout behavior in the document flow.
   *
   * @param value - The CSS display value, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  display(value: Property.Display | undefined) {
    return this.setStyleProp("display", value);
  }

  /**
   * Sets the `flex-shrink` style of the element.
   * Defines how much the element should shrink relative to its siblings in a flex container.
   *
   * @param value - A numeric shrink factor (e.g., 0, 1), or `undefined` to remove it.
   * @return This instance for chaining.
   */
  flexShrink(value: Property.FlexShrink | undefined) {
    return this.setStyleProp("flexShrink", value);
  }

  /**
   * Sets the `flex` shorthand style of the element.
   * Combines `flex-grow`, `flex-shrink`, and `flex-basis` into a single declaration.
   *
   * @param value - A flex shorthand value (e.g., "1 0 auto"), or `undefined` to remove it.
   * @return This instance for chaining.
   */
  flex(value: Property.Flex | undefined) {
    return this.setStyleProp("flex", value);
  }

  /**
   * Sets the `background-color` style of the element.
   * Accepts named colors, hex codes, RGB/RGBA values, or CSS variables.
   *
   * @param value - The background color value (e.g., "#fff", "rgba(0,0,0,0.5)"), or `undefined` to remove it.
   * @return This instance for chaining.
   */
  bgColor(value: Property.BackgroundColor | undefined) {
    return this.setStyleProp("backgroundColor", value);
  }

  /**
   * Sets the `color` style of the element.
   * Defines the foreground text color using named colors, hex codes, RGB/RGBA values, or CSS variables.
   *
   * @param value - The text color value (e.g., "black", "#333"), or `undefined` to remove it.
   * @return This instance for chaining.
   */
  color(value: Property.Color | undefined) {
    return this.setStyleProp("color", value);
  }

  /**
   * Sets or clears the `width` style of the element.
   * Accepts CSS width values (e.g., "100px", "50%") or numeric pixel values.
   * Passing `undefined` removes the width style.
   *
   * @param value - The width value to apply, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  w(value: Property.Width | number | undefined) {
    return this.setStyleProp("width", value);
  }

  /**
   * Sets or clears the `height` style of the element.
   * Accepts CSS height values (e.g., "100px", "auto") or numeric pixel values.
   * Passing `undefined` removes the height style.
   *
   * @param value - The height value to apply, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  h(value: Property.Height | number | undefined) {
    return this.setStyleProp("height", value);
  }

  /**
   * Sets the full border style.
   * @param value - The CSS border value (e.g., "1px solid #ccc").
   * @return This instance for chaining.
   */
  b(value: Property.Border | undefined) {
    return this.setStyleProp("border", value);
  }

  /**
   * Sets the top border style.
   * @param value - The CSS border-top value.
   * @return This instance for chaining.
   */
  bt(value: Property.BorderTop | undefined) {
    return this.setStyleProp("borderTop", value);
  }

  /**
   * Sets the right border style.
   * @param value - The CSS border-right value.
   * @return This instance for chaining.
   */
  br(value: Property.BorderRight | undefined) {
    return this.setStyleProp("borderRight", value);
  }

  /**
   * Sets the bottom border style.
   * @param value - The CSS border-bottom value.
   * @return This instance for chaining.
   */
  bb(value: Property.BorderBottom | undefined) {
    return this.setStyleProp("borderBottom", value);
  }

  /**
   * Sets the left border style.
   * @param value - The CSS border-left value.
   * @return This instance for chaining.
   */
  bl(value: Property.BorderLeft | undefined) {
    return this.setStyleProp("borderLeft", value);
  }

  /**
   * Sets the left and right border styles.
   * @param value - The CSS border value to apply to both left and right sides.
   * @return This instance for chaining.
   */
  bx(value: Property.BorderLeft | Property.BorderRight | undefined) {
    this.setStyleProp("borderLeft", value);
    this.setStyleProp("borderRight", value);
    return this;
  }

  /**
   * Sets the top and bottom border styles.
   * @param value - The CSS border value to apply to both top and bottom sides.
   * @return This instance for chaining.
   */
  by(value: Property.BorderTop | Property.BorderBottom | undefined) {
    this.setStyleProp("borderTop", value);
    this.setStyleProp("borderBottom", value);
    return this;
  }

  /**
   * Sets the top and left border styles.
   * @param value - The CSS border value to apply to both top and left sides.
   * @return This instance for chaining.
   */
  btl(value: Property.BorderTop | Property.BorderLeft | undefined) {
    this.setStyleProp("borderTop", value);
    this.setStyleProp("borderLeft", value);
    return this;
  }

  /**
   * Sets the top and right border styles.
   * @param value - The CSS border value to apply to both top and right sides.
   * @return This instance for chaining.
   */
  btr(value: Property.BorderTop | Property.BorderRight | undefined) {
    this.setStyleProp("borderTop", value);
    this.setStyleProp("borderRight", value);
    return this;
  }

  /**
   * Sets the bottom and left border styles.
   * @param value - The CSS border value to apply to both bottom and left sides.
   * @return This instance for chaining.
   */
  bbl(value: Property.BorderBottom | Property.BorderLeft | undefined) {
    this.setStyleProp("borderBottom", value);
    this.setStyleProp("borderLeft", value);
    return this;
  }

  /**
   * Sets the bottom and right border styles.
   * @param value - The CSS border value to apply to both bottom and right sides.
   * @return This instance for chaining.
   */
  bbr(value: Property.BorderBottom | Property.BorderRight | undefined) {
    this.setStyleProp("borderBottom", value);
    this.setStyleProp("borderRight", value);
    return this;
  }

  /**
   * Sets the `overflow` style of the element.
   * Controls how content that exceeds the element's bounds is handled on both axes.
   * Common values include "visible", "hidden", "scroll", and "auto".
   *
   * @param value - The overflow behavior for both axes, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  overflow(value: Property.Overflow | undefined) {
    return this.setStyleProp("overflow", value);
  }

  /**
   * Sets the `overflow-y` style of the element.
   * Controls vertical overflow behavior independently of horizontal overflow.
   * Common values include "visible", "hidden", "scroll", and "auto".
   *
   * @param value - The vertical overflow behavior, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  overflowY(value: Property.OverflowY | undefined) {
    return this.setStyleProp("overflowY", value);
  }

  /**
   * Sets the `overflow-x` style of the element.
   * Controls horizontal overflow behavior independently of vertical overflow.
   * Common values include "visible", "hidden", "scroll", and "auto".
   *
   * @param value - The horizontal overflow behavior, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  overflowX(value: Property.OverflowX | undefined) {
    return this.setStyleProp("overflowX", value);
  }

  /**
   * Sets the `font-size` style of the element.
   * Accepts absolute units (e.g., "16px", "1rem") or relative keywords (e.g., "small", "larger").
   *
   * @param value - The font size value, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  fontSize(value: Property.FontSize | undefined) {
    return this.setStyleProp("fontSize", value);
  }

  /**
   * Sets the `font-weight` style of the element.
   * Accepts numeric weights (e.g., 400, 700) or keywords like "bold", "normal", "lighter".
   *
   * @param value - The font weight value, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  fontWeight(value: Property.FontWeight | undefined) {
    return this.setStyleProp("fontWeight", value);
  }

  /**
   * Sets the `font-family` style of the element.
   * Accepts a comma-separated list of font names or CSS variables.
   *
   * @param value - The font family string (e.g., "Arial, sans-serif"), or `undefined` to remove it.
   * @return This instance for chaining.
   */
  fontFamily(value: Property.FontFamily | undefined) {
    return this.setStyleProp("fontFamily", value);
  }

  /**
   * Sets the `font-style` style of the element.
   * Common values include "normal", "italic", or "oblique".
   *
   * @param value - The font style value, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  fontStyle(value: Property.FontStyle | undefined) {
    return this.setStyleProp("fontStyle", value);
  }

  /**
   * Sets the `text-align` style of the element.
   * Controls horizontal alignment of inline content. Common values include "left", "right", "center", or "justify".
   *
   * @param value - The text alignment value, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  textAlign(value: Property.TextAlign | undefined) {
    return this.setStyleProp("textAlign", value);
  }

  /**
   * Sets the `text-decoration` style of the element.
   * Common values include "underline", "line-through", "none", or combinations like "underline overline".
   *
   * @param value - The text decoration value, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  textDecoration(value: Property.TextDecoration | undefined) {
    return this.setStyleProp("textDecoration", value);
  }

  /**
   * Sets the CSS `position` property.
   * @param value - The positioning mode (e.g., "absolute", "relative", "fixed").
   * @return This instance for chaining.
   */
  pos(value: Property.Position | undefined) {
    return this.setStyleProp("position", value);
  }

  /**
   * Sets the CSS `top` offset.
   * @param value - The top offset value (e.g., "10px", "50%").
   * @return This instance for chaining.
   */
  posTop(value: Property.Top | number | undefined) {
    return this.setStyleProp("top", value);
  }

  /**
   * Sets the CSS `bottom` offset.
   * @param value - The bottom offset value (e.g., "0", "2rem").
   * @return This instance for chaining.
   */
  posBottom(value: Property.Bottom | number | undefined) {
    return this.setStyleProp("bottom", value);
  }

  /**
   * Sets the CSS `left` offset.
   * @param value - The left offset value (e.g., "5px", "auto").
   * @return This instance for chaining.
   */
  posLeft(value: Property.Left | number | undefined) {
    return this.setStyleProp("left", value);
  }

  /**
   * Sets the CSS `right` offset.
   * @param value - The right offset value (e.g., "1em", "0").
   * @return This instance for chaining.
   */
  posRight(value: Property.Right | number | undefined) {
    return this.setStyleProp("right", value);
  }

  /**
   * Sets the `cursor` style of the element.
   * Controls the mouse cursor appearance when hovering over the element.
   * Common values include "pointer", "default", "text", "move", or "not-allowed".
   *
   * @param value - The cursor style value, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  cursor(value: Property.Cursor | undefined) {
    return this.setStyleProp("cursor", value);
  }

  /**
   * Sets the `align-items` style of the element.
   * Defines how flex or grid children are aligned along the cross axis.
   * Common values include "flex-start", "center", "baseline", or "stretch".
   *
   * @param value - The alignment value for child items, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  alignItems(value: Property.AlignItems | undefined) {
    return this.setStyleProp("alignItems", value);
  }

  /**
   * Sets the `justify-content` style of the element.
   * Defines how flex or grid children are distributed along the main axis.
   * Common values include "flex-start", "center", "space-between", or "space-around".
   *
   * @param value - The justification value for child items, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  justifyContent(value: Property.JustifyContent | undefined) {
    return this.setStyleProp("justifyContent", value);
  }

  /**
   * Sets the `gap` style of the element.
   * Defines spacing between flex or grid children, supporting both row and column gaps.
   * Accepts length units (e.g., "10px", "1rem") or shorthand values.
   *
   * @param value - The gap size between child elements, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  gap(value: Property.Gap | undefined) {
    return this.setStyleProp("gap", value);
  }

  /**
   * Sets the `flex-direction` style of the element.
   * Controls the direction of child elements in a flex container.
   * Common values include "row", "column", "row-reverse", or "column-reverse".
   *
   * @param value - The flex direction value, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  flexDirection(value: Property.FlexDirection | undefined) {
    return this.setStyleProp("flexDirection", value);
  }

  /**
   * Sets the `grid-template-columns` style of the element.
   * Defines the column structure of a CSS grid container using track sizes, repeat(), or auto-fit/auto-fill.
   * For example: "1fr 2fr", "repeat(3, 100px)", or "auto-fit, minmax(200px, 1fr)".
   *
   * @param value - The grid column template string, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  templateColumns(value: Property.GridTemplateColumns | undefined) {
    return this.setStyleProp("gridTemplateColumns", value);
  }

  /**
   * Sets the `grid-template-rows` style of the element.
   * Defines the row structure of a CSS grid container using track sizes, repeat(), or auto-fit/auto-fill.
   * For example: "100px auto", "repeat(2, 1fr)", or "minmax(50px, auto)".
   *
   * @param value - The grid row template string, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  templateRows(value: Property.GridTemplateRows | undefined) {
    return this.setStyleProp("gridTemplateRows", value);
  }

  /**
   * Sets the `appearance` style of the element.
   * Controls native platform styling of UI elements like buttons and inputs.
   * Common values include "none" to remove default styling, or platform-specific keywords.
   *
   * @param value - The appearance value (e.g., "none", "auto"), or `undefined` to remove it.
   * @return This instance for chaining.
   */
  appearance(value: Property.Appearance | undefined) {
    return this.setStyleProp("appearance", value);
  }

  /**
   * Sets the CSS `user-select` property to control text selection behavior.
   * @param value - The user-select value (e.g., "none", "text", "auto", "contain", "all").
   * @return This instance for chaining.
   */
  userSelect(value: Property.UserSelect | undefined) {
    return this.setStyleProp("userSelect", value);
  }

  /**
   * Sets the vertical alignment of the element.
   * Common values include "middle", "top", "bottom", "baseline", or pixel/em units.
   *
   * @param value - The CSS vertical-align value (e.g., "middle", "top", "10px").
   * @return This instance for chaining.
   */
  verticalAlign(value: Property.VerticalAlign | undefined) {
    return this.setStyleProp("verticalAlign", value);
  }

  /**
   * Sets the `white-space` style of the element.
   * Common values include "normal", "nowrap", "pre", "pre-wrap", or "pre-line".
   * Controls how whitespace and line breaks are handled within the element.
   *
   * @param value - The CSS white-space value (e.g., "nowrap", "pre-wrap"), or `undefined` to remove it.
   * @return This instance for chaining.
   */
  whiteSpace(value: Property.WhiteSpace | undefined) {
    return this.setStyleProp("whiteSpace", value);
  }

  /**
   * Sets the `text-overflow` style of the element.
   * Common values include "ellipsis", "clip", or "string" for custom overflow indicators.
   * Controls how overflowed inline content is rendered when it exceeds the container bounds.
   *
   * @param value - The CSS text-overflow value (e.g., "ellipsis", "clip"), or `undefined` to remove it.
   * @return This instance for chaining.
   */
  textOverflow(value: Property.TextOverflow | undefined) {
    return this.setStyleProp("textOverflow", value);
  }

  /**
   * Sets the `z-index` style of the element.
   * Controls the stacking order of positioned elements. Higher values appear in front of lower ones.
   * Only applies to elements with a position other than `static`.
   *
   * @param value - The z-index value (e.g., 10, 1000), or `undefined` to remove it.
   * @return This instance for chaining.
   */
  zIndex(value: Property.ZIndex | undefined) {
    return this.setStyleProp("zIndex", value);
  }

  /**
   * Sets the `opacity` style of the element.
   * Controls the transparency level, where `1` is fully opaque and `0` is fully transparent.
   * Accepts fractional values between `0` and `1`, or `undefined` to remove the style.
   *
   * @param value - The opacity value (e.g., `0.5`, `1`), or `undefined` to remove it.
   * @return This instance for chaining.
   */
  opacity(value: Property.Opacity | undefined) {
    return this.setStyleProp("opacity", value);
  }

  /**
   * Applies CSS styles to truncate overflowing text with an ellipsis.
   * Ensures the text stays on a single line and hides overflow.
   *
   * Equivalent to:
   * ```css
   * overflow: hidden;
   * white-space: nowrap;
   * text-overflow: ellipsis;
   * ```
   *
   * @return This instance for chaining.
   */
  overflowEllipsis() {
    return this.overflow("hidden")
      .whiteSpace("nowrap")
      .textOverflow("ellipsis");
  }

  /**
   * Applies a batch of CSS style properties to the element.
   * Delegates each property to `setStyleProp`, which handles value normalization and kebab-case conversion.
   *
   * - Properties with `undefined` values are removed from the inline style.
   * - Numeric values are passed through the style sheet for unit resolution.
   * - Supports chainable usage for fluent DOM composition.
   *
   * @param props - A partial map of CSS properties and their values.
   * @returns This instance for chaining.
   */
  style(props: CssProperties) {
    for (const name of Object.keys(props)) {
      this.setStyleProp(name, (props as any)[name]);
    }
    return this;
  }
}
