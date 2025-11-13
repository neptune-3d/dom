import type { Property } from "csstype";
import type {
  Autocomplete,
  CssProperties,
  LinearGradientDirection,
} from "./types";

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
  p(value: Property.Padding | number | undefined) {
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
  mt(value: Property.MarginTop | number | undefined) {
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
  mr(value: Property.MarginRight | number | undefined) {
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
  mb(value: Property.MarginBottom | number | undefined) {
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
  ml(value: Property.MarginLeft | number | undefined) {
    return this.setStyleProp("marginLeft", value);
  }

  /**
   * Sets the overall border radius.
   * @param value - The CSS border-radius value (e.g., "8px", "50%").
   * @return This instance for chaining.
   */
  radius(value: Property.BorderRadius | number | undefined) {
    return this.setStyleProp("borderRadius", value);
  }

  /**
   * Sets the top-left corner border radius.
   * @param value - The CSS border-top-left-radius value.
   * @return This instance for chaining.
   */
  radiusTopLeft(value: Property.BorderTopLeftRadius | number | undefined) {
    return this.setStyleProp("borderTopLeftRadius", value);
  }

  /**
   * Sets the top-right corner border radius.
   * @param value - The CSS border-top-right-radius value.
   * @return This instance for chaining.
   */
  radiusTopRight(value: Property.BorderTopRightRadius | number | undefined) {
    return this.setStyleProp("borderTopRightRadius", value);
  }

  /**
   * Sets the bottom-left corner border radius.
   * @param value - The CSS border-bottom-left-radius value.
   * @return This instance for chaining.
   */
  radiusBottomLeft(
    value: Property.BorderBottomLeftRadius | number | undefined
  ) {
    return this.setStyleProp("borderBottomLeftRadius", value);
  }

  /**
   * Sets the bottom-right corner border radius.
   * @param value - The CSS border-bottom-right-radius value.
   * @return This instance for chaining.
   */
  radiusBottomRight(
    value: Property.BorderBottomRightRadius | number | undefined
  ) {
    return this.setStyleProp("borderBottomRightRadius", value);
  }

  /**
   * Sets the border radius for both top corners.
   * @param value - The CSS border-radius value to apply to top-left and top-right corners.
   * @return This instance for chaining.
   */
  radiusTop(value: Property.BorderTopLeftRadius | number | undefined) {
    return this.radiusTopLeft(value).radiusTopRight(value);
  }

  /**
   * Sets the border radius for both bottom corners.
   * @param value - The CSS border-radius value to apply to bottom-left and bottom-right corners.
   * @return This instance for chaining.
   */
  radiusBottom(value: Property.BorderBottomLeftRadius | number | undefined) {
    return this.radiusBottomLeft(value).radiusBottomRight(value);
  }

  /**
   * Sets the border radius for both left corners.
   * @param value - The CSS border-radius value to apply to top-left and bottom-left corners.
   * @return This instance for chaining.
   */
  radiusLeft(value: Property.BorderTopLeftRadius | number | undefined) {
    return this.radiusTopLeft(value).radiusBottomLeft(value);
  }

  /**
   * Sets the border radius for both right corners.
   * @param value - The CSS border-radius value to apply to top-right and bottom-right corners.
   * @return This instance for chaining.
   */
  radiusRight(value: Property.BorderTopRightRadius | number | undefined) {
    return this.radiusTopRight(value).radiusBottomRight(value);
  }

  /**
   * Sets the border radius for both left and right sides (horizontal corners).
   * Applies to top-left, top-right, bottom-left, and bottom-right corners on the X axis.
   * @param value - The CSS border-radius value to apply horizontally.
   * @return This instance for chaining.
   */
  radiusX(value: Property.BorderRadius | number | undefined) {
    return this.radiusLeft(value).radiusRight(value);
  }

  /**
   * Sets the border radius for both top and bottom sides (vertical corners).
   * Applies to top-left, top-right, bottom-left, and bottom-right corners on the Y axis.
   * @param value - The CSS border-radius value to apply vertically.
   * @return This instance for chaining.
   */
  radiusY(value: Property.BorderRadius | number | undefined) {
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
   * Sets or clears the `min-width` style of the element.
   * Accepts CSS width values (e.g., "100px", "50%") or numeric pixel values.
   * Passing `undefined` removes the min-width style.
   *
   * @param value - The minimum width value to apply, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  minW(value: Property.MinWidth | number | undefined) {
    return this.setStyleProp("minWidth", value);
  }

  /**
   * Sets or clears the `max-width` style of the element.
   * Accepts CSS width values (e.g., "100px", "100%") or numeric pixel values.
   * Passing `undefined` removes the max-width style.
   *
   * @param value - The maximum width value to apply, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  maxW(value: Property.MaxWidth | number | undefined) {
    return this.setStyleProp("maxWidth", value);
  }

  /**
   * Sets or clears the `min-height` style of the element.
   * Accepts CSS height values (e.g., "100px", "50vh") or numeric pixel values.
   * Passing `undefined` removes the min-height style.
   *
   * @param value - The minimum height value to apply, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  minH(value: Property.MinHeight | number | undefined) {
    return this.setStyleProp("minHeight", value);
  }

  /**
   * Sets or clears the `max-height` style of the element.
   * Accepts CSS height values (e.g., "100px", "100%") or numeric pixel values.
   * Passing `undefined` removes the max-height style.
   *
   * @param value - The maximum height value to apply, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  maxH(value: Property.MaxHeight | number | undefined) {
    return this.setStyleProp("maxHeight", value);
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
   * Sets the `border-width` of the element.
   * Controls the thickness of the border. Accepts any valid CSS length (e.g., "1px", "0.2em") or a number (interpreted as pixels).
   * Passing `undefined` removes the border width.
   *
   * @param value - The border width to apply, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  bWidth(value: Property.BorderWidth | number | undefined): this {
    const val = typeof value === "number" ? `${value}px` : value;
    return this.setStyleProp("borderWidth", val);
  }

  /**
   * Sets the `border-style` of the element.
   * Controls the visual style of the border (e.g., solid, dashed, dotted, double).
   * Accepts any valid CSS border-style value, or `undefined` to remove the style.
   *
   * @param value - The border style to apply (e.g., "solid", "dashed", "none"), or `undefined` to remove it.
   * @return This instance for chaining.
   */
  bStyle(value: Property.BorderStyle | undefined): this {
    return this.setStyleProp("borderStyle", value);
  }

  /**
   * Sets the `border-color` of the element.
   * Controls the color of the element’s border.
   * Accepts named colors, hex codes, RGB/RGBA values, or CSS variables.
   * Passing `undefined` removes the border color.
   *
   * @param value - The border color to apply (e.g., "#000", "rgba(0,0,0,0.2)", "var(--border-color)"), or `undefined` to remove it.
   * @return This instance for chaining.
   */
  bColor(value: Property.BorderColor | undefined): this {
    return this.setStyleProp("borderColor", value);
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
   * Sets the `border-top-width` of the element.
   * Controls the thickness of the top border. Accepts any valid CSS length or a number (interpreted as pixels).
   * Passing `undefined` removes the top border width.
   *
   * @param value - The top border width to apply, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  btWidth(value: Property.BorderTopWidth | number | undefined): this {
    const val = typeof value === "number" ? `${value}px` : value;
    return this.setStyleProp("borderTopWidth", val);
  }

  /**
   * Sets the `border-top-style` of the element.
   * Controls the visual style of the top border (e.g., solid, dashed, dotted).
   * Passing `undefined` removes the top border style.
   *
   * @param value - The top border style to apply, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  btStyle(value: Property.BorderTopStyle | undefined): this {
    return this.setStyleProp("borderTopStyle", value);
  }

  /**
   * Sets the `border-top-color` of the element.
   * Controls the color of the top border.
   * Accepts named colors, hex codes, RGB/RGBA values, or CSS variables.
   * Passing `undefined` removes the top border color.
   *
   * @param value - The top border color to apply, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  btColor(value: Property.BorderTopColor | undefined): this {
    return this.setStyleProp("borderTopColor", value);
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
   * Sets the `border-right-width` of the element.
   * Controls the thickness of the right border. Accepts any valid CSS length or a number (interpreted as pixels).
   * Passing `undefined` removes the right border width.
   *
   * @param value - The right border width to apply, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  brWidth(value: Property.BorderRightWidth | number | undefined): this {
    const val = typeof value === "number" ? `${value}px` : value;
    return this.setStyleProp("borderRightWidth", val);
  }

  /**
   * Sets the `border-right-style` of the element.
   * Controls the visual style of the right border (e.g., solid, dashed, dotted).
   * Passing `undefined` removes the right border style.
   *
   * @param value - The right border style to apply, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  brStyle(value: Property.BorderRightStyle | undefined): this {
    return this.setStyleProp("borderRightStyle", value);
  }

  /**
   * Sets the `border-right-color` of the element.
   * Controls the color of the right border.
   * Accepts named colors, hex codes, RGB/RGBA values, or CSS variables.
   * Passing `undefined` removes the right border color.
   *
   * @param value - The right border color to apply, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  brColor(value: Property.BorderRightColor | undefined): this {
    return this.setStyleProp("borderRightColor", value);
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
   * Sets the `border-bottom-width` of the element.
   * Controls the thickness of the bottom border. Accepts any valid CSS length or a number (interpreted as pixels).
   * Passing `undefined` removes the bottom border width.
   *
   * @param value - The bottom border width to apply, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  bbWidth(value: Property.BorderBottomWidth | number | undefined): this {
    const val = typeof value === "number" ? `${value}px` : value;
    return this.setStyleProp("borderBottomWidth", val);
  }

  /**
   * Sets the `border-bottom-style` of the element.
   * Controls the visual style of the bottom border (e.g., solid, dashed, dotted).
   * Passing `undefined` removes the bottom border style.
   *
   * @param value - The bottom border style to apply, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  bbStyle(value: Property.BorderBottomStyle | undefined): this {
    return this.setStyleProp("borderBottomStyle", value);
  }

  /**
   * Sets the `border-bottom-color` of the element.
   * Controls the color of the bottom border.
   * Accepts named colors, hex codes, RGB/RGBA values, or CSS variables.
   * Passing `undefined` removes the bottom border color.
   *
   * @param value - The bottom border color to apply, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  bbColor(value: Property.BorderBottomColor | undefined): this {
    return this.setStyleProp("borderBottomColor", value);
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
   * Sets the `border-left-width` of the element.
   * Controls the thickness of the left border. Accepts any valid CSS length or a number (interpreted as pixels).
   * Passing `undefined` removes the left border width.
   *
   * @param value - The left border width to apply, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  blWidth(value: Property.BorderLeftWidth | number | undefined): this {
    const val = typeof value === "number" ? `${value}px` : value;
    return this.setStyleProp("borderLeftWidth", val);
  }

  /**
   * Sets the `border-left-style` of the element.
   * Controls the visual style of the left border (e.g., solid, dashed, dotted).
   * Passing `undefined` removes the left border style.
   *
   * @param value - The left border style to apply, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  blStyle(value: Property.BorderLeftStyle | undefined): this {
    return this.setStyleProp("borderLeftStyle", value);
  }

  /**
   * Sets the `border-left-color` of the element.
   * Controls the color of the left border.
   * Accepts named colors, hex codes, RGB/RGBA values, or CSS variables.
   * Passing `undefined` removes the left border color.
   *
   * @param value - The left border color to apply, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  blColor(value: Property.BorderLeftColor | undefined): this {
    return this.setStyleProp("borderLeftColor", value);
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
  top(value: Property.Top | number | undefined) {
    return this.setStyleProp("top", value);
  }

  /**
   * Sets the CSS `bottom` offset.
   * @param value - The bottom offset value (e.g., "0", "2rem").
   * @return This instance for chaining.
   */
  bottom(value: Property.Bottom | number | undefined) {
    return this.setStyleProp("bottom", value);
  }

  /**
   * Sets the CSS `left` offset.
   * @param value - The left offset value (e.g., "5px", "auto").
   * @return This instance for chaining.
   */
  left(value: Property.Left | number | undefined) {
    return this.setStyleProp("left", value);
  }

  /**
   * Sets the CSS `right` offset.
   * @param value - The right offset value (e.g., "1em", "0").
   * @return This instance for chaining.
   */
  right(value: Property.Right | number | undefined) {
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
   * Sets the `transform` style of the element.
   * Applies visual transformations such as translation, rotation, scaling, or skewing.
   * Accepts any valid CSS transform string (e.g., `"translateX(10px)"`, `"scale(1.2)"`), or `undefined` to remove it.
   *
   * @param value - The transform string to apply, or `undefined` to remove the style.
   * @return This instance for chaining.
   */
  transform(value: Property.Transform | undefined) {
    return this.setStyleProp("transform", value);
  }

  /**
   * Sets the `transform` style to a `translate(x, y)` value.
   * Accepts either pixel numbers or full CSS unit strings (e.g., `"10px"`, `"50%"`, `"2em"`).
   * Automatically appends `"px"` to numeric values.
   * Overwrites any existing `transform` style — use with care if combining multiple transforms.
   *
   * @param x - Horizontal offset as a number (pixels) or CSS string.
   * @param y - Vertical offset as a number (pixels) or CSS string.
   * @return This instance for chaining.
   */
  translate(x: string | number, y: string | number): this {
    const xVal = typeof x === "number" ? `${x}px` : x;
    const yVal = typeof y === "number" ? `${y}px` : y;
    return this.setStyleProp("transform", `translate(${xVal}, ${yVal})`);
  }

  /**
   * Sets the `transform` style to a `translateX(x)` value.
   * Moves the element horizontally using pixel or CSS units.
   * Accepts either a number (pixels) or a full CSS unit string (e.g., `"50%"`, `"2em"`).
   * Overwrites any existing `transform` style — use with care if combining multiple transforms.
   *
   * @param x - Horizontal offset as a number or CSS string.
   * @return This instance for chaining.
   */
  translateX(x: string | number): this {
    const xVal = typeof x === "number" ? `${x}px` : x;
    return this.setStyleProp("transform", `translateX(${xVal})`);
  }

  /**
   * Sets the `transform` style to a `translateY(y)` value.
   * Moves the element vertically using pixel or CSS units.
   * Accepts either a number (pixels) or a full CSS unit string (e.g., `"50%"`, `"2em"`).
   * Overwrites any existing `transform` style — use with care if combining multiple transforms.
   *
   * @param y - Vertical offset as a number or CSS string.
   * @return This instance for chaining.
   */
  translateY(y: string | number): this {
    const yVal = typeof y === "number" ? `${y}px` : y;
    return this.setStyleProp("transform", `translateY(${yVal})`);
  }

  /**
   * Sets the `transform` style to a `scale(x, y)` value.
   * Scales the element along the X and Y axes.
   * Accepts either numeric scale factors (e.g., `1.2`) or full CSS unit strings (e.g., `"1.5"`).
   * Automatically converts numeric values to string format.
   * Overwrites any existing `transform` style — use with care if combining multiple transforms.
   *
   * @param x - Horizontal scale factor as a number or string.
   * @param y - Vertical scale factor as a number or string.
   * @return This instance for chaining.
   */
  scale(x: string | number, y: string | number): this {
    const xVal = typeof x === "number" ? x.toString() : x;
    const yVal = typeof y === "number" ? y.toString() : y;
    return this.setStyleProp("transform", `scale(${xVal}, ${yVal})`);
  }

  /**
   * Sets the `transform` style to a `scaleX(x)` value.
   * Scales the element horizontally. Accepts numeric scale factors (e.g., `1.2`) or string values (e.g., `"1.5"`).
   * Automatically converts numeric values to string format.
   * Overwrites any existing `transform` style — use with care if combining multiple transforms.
   *
   * @param x - Horizontal scale factor as a number or string.
   * @return This instance for chaining.
   */
  scaleX(x: string | number): this {
    const xVal = typeof x === "number" ? x.toString() : x;
    return this.setStyleProp("transform", `scaleX(${xVal})`);
  }

  /**
   * Sets the `transform` style to a `scaleY(y)` value.
   * Scales the element vertically. Accepts numeric scale factors (e.g., `0.8`) or string values (e.g., `"1.25"`).
   * Automatically converts numeric values to string format.
   * Overwrites any existing `transform` style — use with care if combining multiple transforms.
   *
   * @param y - Vertical scale factor as a number or string.
   * @return This instance for chaining.
   */
  scaleY(y: string | number): this {
    const yVal = typeof y === "number" ? y.toString() : y;
    return this.setStyleProp("transform", `scaleY(${yVal})`);
  }

  /**
   * Sets the `transform` style to a `rotate(angle)` value.
   * Rotates the element clockwise by the specified angle.
   * Accepts either a number (interpreted as degrees) or a full CSS angle string (e.g., `"45deg"`, `"0.5turn"`).
   * Automatically appends `"deg"` to numeric values.
   * Overwrites any existing `transform` style — use with care if combining multiple transforms.
   *
   * @param angle - Rotation angle as a number (degrees) or CSS string.
   * @return This instance for chaining.
   */
  rotate(angle: string | number): this {
    const val = typeof angle === "number" ? `${angle}deg` : angle;
    return this.setStyleProp("transform", `rotate(${val})`);
  }

  /**
   * Sets the `transform` style to a `rotateX(angle)` value.
   * Rotates the element around the X-axis in 3D space.
   * Accepts either a number (degrees) or a full CSS angle string (e.g., `"45deg"`, `"1rad"`).
   * Automatically appends `"deg"` to numeric values.
   * Overwrites any existing `transform` style — use with care if combining multiple transforms.
   *
   * @param angle - Rotation angle as a number or CSS string.
   * @return This instance for chaining.
   */
  rotateX(angle: string | number): this {
    const val = typeof angle === "number" ? `${angle}deg` : angle;
    return this.setStyleProp("transform", `rotateX(${val})`);
  }

  /**
   * Sets the `transform` style to a `rotateY(angle)` value.
   * Rotates the element around the Y-axis in 3D space.
   * Accepts either a number (degrees) or a full CSS angle string (e.g., `"90deg"`, `"0.5turn"`).
   * Automatically appends `"deg"` to numeric values.
   * Overwrites any existing `transform` style — use with care if combining multiple transforms.
   *
   * @param angle - Rotation angle as a number or CSS string.
   * @return This instance for chaining.
   */
  rotateY(angle: string | number): this {
    const val = typeof angle === "number" ? `${angle}deg` : angle;
    return this.setStyleProp("transform", `rotateY(${val})`);
  }

  /**
   * Sets the `transform` style to a `rotateZ(angle)` value.
   * Rotates the element around the Z-axis in 3D space (same as 2D rotation).
   * Accepts either a number (degrees) or a full CSS angle string (e.g., `"30deg"`, `"1rad"`).
   * Automatically appends `"deg"` to numeric values.
   * Overwrites any existing `transform` style — use with care if combining multiple transforms.
   *
   * @param angle - Rotation angle as a number or CSS string.
   * @return This instance for chaining.
   */
  rotateZ(angle: string | number): this {
    const val = typeof angle === "number" ? `${angle}deg` : angle;
    return this.setStyleProp("transform", `rotateZ(${val})`);
  }

  /**
   * Sets the `transform-origin` style of the element.
   * Defines the pivot point for CSS transforms such as rotation, scaling, or skewing.
   * Accepts any valid CSS origin string (e.g., `"center"`, `"top left"`, `"50% 50%"`), or `undefined` to remove it.
   *
   * @param value - The transform origin to apply, or `undefined` to remove the style.
   * @return This instance for chaining.
   */
  transformOrigin(value: Property.TransformOrigin | undefined) {
    return this.setStyleProp("transformOrigin", value);
  }

  /**
   * Sets the `transition` style of the element.
   * Defines how style changes are animated over time, including duration, timing function, and delay.
   * Accepts any valid CSS transition string (e.g., `"opacity 0.3s ease"`, `"all 200ms linear"`), or `undefined` to remove it.
   *
   * @param value - The transition string to apply, or `undefined` to remove the style.
   * @return This instance for chaining.
   */
  transition(value: Property.Transition | undefined) {
    return this.setStyleProp("transition", value);
  }

  /**
   * Sets the `will-change` style of the element.
   * Provides a hint to the browser about which properties are likely to change,
   * allowing it to optimize rendering and performance ahead of time.
   * Accepts any valid CSS property name or list (e.g., `"transform"`, `"opacity, left"`), or `undefined` to remove it.
   *
   * @param value - The will-change hint to apply, or `undefined` to remove the style.
   * @return This instance for chaining.
   */
  willChange(value: Property.WillChange | undefined) {
    return this.setStyleProp("willChange", value);
  }

  /**
   * Sets the `box-shadow` style of the element.
   * Applies shadow effects around the element's frame, supporting offsets, blur radius, spread, and color.
   * Accepts any valid CSS box-shadow string (e.g., `"0 2px 4px rgba(0,0,0,0.1)"`), or `undefined` to remove it.
   *
   * @param value - The box-shadow value to apply, or `undefined` to remove the style.
   * @return This instance for chaining.
   */
  boxShadow(value: Property.BoxShadow | undefined) {
    return this.setStyleProp("boxShadow", value);
  }

  /**
   * Sets the `box-sizing` style of the element.
   * Controls how the element’s total width and height are calculated — either including or excluding padding and border.
   * Accepts any valid CSS box-sizing value (e.g., `"border-box"`, `"content-box"`), or `undefined` to remove it.
   *
   * @param value - The box-sizing value to apply, or `undefined` to remove the style.
   * @return This instance for chaining.
   */
  boxSizing(value: Property.BoxSizing | undefined): this {
    return this.setStyleProp("boxSizing", value);
  }

  /**
   * Sets the `background` shorthand style of the element.
   * Accepts any valid CSS background value, including colors, gradients, images, positions, and repeat modes.
   * Useful for applying complex background styles in a single declaration.
   * Passing `undefined` removes the background style.
   *
   * @param value - The background value to apply (e.g., "#fff", "linear-gradient(...)", "url(...)", "center/cover"), or `undefined` to remove it.
   * @return This instance for chaining.
   */
  background(value: Property.Background | undefined): this {
    return this.setStyleProp("background", value);
  }

  /**
   * Sets the `outline` shorthand property of the element.
   * Controls the outline's width, style, and color in a single call.
   * Unlike borders, outlines do not affect layout and can extend beyond element bounds.
   * Passing `undefined` removes the outline.
   *
   * @param value - A valid CSS outline shorthand (e.g. "2px dashed red"), or `undefined` to remove it.
   * @return This instance for chaining.
   */
  outline(value: Property.Outline | undefined): this {
    return this.setStyleProp("outline", value);
  }

  /**
   * Sets the `outline-width` of the element.
   * Controls the thickness of the outline. Accepts any valid CSS length or a number (interpreted as pixels).
   * Passing `undefined` removes the outline width.
   *
   * @param value - The outline width to apply, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  outlineWidth(value: Property.OutlineWidth | number | undefined): this {
    const val = typeof value === "number" ? `${value}px` : value;
    return this.setStyleProp("outlineWidth", val);
  }

  /**
   * Sets the `outline-style` of the element.
   * Controls the visual style of the outline (e.g., solid, dashed, dotted).
   * Passing `undefined` removes the outline style.
   *
   * @param value - The outline style to apply, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  outlineStyle(value: Property.OutlineStyle | undefined): this {
    return this.setStyleProp("outlineStyle", value);
  }

  /**
   * Sets the `outline-color` of the element.
   * Controls the color of the outline. Accepts named colors, hex codes, RGB/RGBA values, or CSS variables.
   * Passing `undefined` removes the outline color.
   *
   * @param value - The outline color to apply, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  outlineColor(value: Property.OutlineColor | undefined): this {
    return this.setStyleProp("outlineColor", value);
  }

  /**
   * Sets the `outline-offset` style of the element.
   * Controls the space between the outline and the element's edge.
   * Accepts length units (e.g. px, em, rem) or CSS variables.
   * Passing `undefined` removes the outline-offset style.
   *
   * @param value - The offset distance to apply, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  outlineOffset(value: Property.OutlineOffset | number | undefined): this {
    return this.setStyleProp("outlineOffset", value);
  }

  /**
   * Sets the `line-height` of the element.
   * Controls vertical spacing between lines of text. Accepts unitless numbers, length units, percentages, or CSS variables.
   * Passing `undefined` removes the line-height style.
   *
   * @param value - The line-height to apply, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  lineHeight(value: Property.LineHeight | undefined): this {
    return this.setStyleProp("lineHeight", value);
  }

  /**
   * Sets the `word-wrap` style of the element.
   * Controls how long words or URLs break and wrap within the container.
   * Accepts values like `"normal"`, `"break-word"`, or CSS variables.
   * Passing `undefined` removes the word-wrap style.
   *
   * @param value - The word-wrap value to apply, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  wordWrap(value: Property.WordWrap | undefined): this {
    return this.setStyleProp("wordWrap", value);
  }

  /**
   * Sets the `tab-size` style of the element.
   * Controls the visual width of tab characters in spaces. Accepts unitless numbers or CSS variables.
   * Passing `undefined` removes the tab-size style.
   *
   * @param value - The tab size to apply, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  tabSize(value: Property.TabSize | undefined): this {
    return this.setStyleProp("tabSize", value);
  }

  /**
   * Sets the `resize` style of the element.
   * Controls whether and how the element is resizable by the user.
   * Accepts values like `"none"`, `"both"`, `"horizontal"`, `"vertical"`, or CSS variables.
   * Passing `undefined` removes the resize style.
   *
   * @param value - The resize behavior to apply, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  resize(value: Property.Resize | undefined): this {
    return this.setStyleProp("resize", value);
  }

  /**
   * Sets the `border-collapse` style of the element.
   * Controls whether table borders are collapsed or separated.
   * Accepts values like `"collapse"`, `"separate"`, or CSS variables.
   * Passing `undefined` removes the border-collapse style.
   *
   * @param value - The border-collapse behavior to apply, or `undefined` to remove it.
   * @return This instance for chaining.
   */
  borderCollapse(value: Property.BorderCollapse | undefined): this {
    return this.setStyleProp("borderCollapse", value);
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
   * Sets the `background` style to a linear gradient.
   * Accepts a direction and one or more color stops to construct a valid CSS `linear-gradient(...)` string.
   * Automatically joins color stops and applies the full gradient string to `background`.
   *
   * @param direction - The gradient direction (e.g., `"to right"`, `"45deg"`).
   * @param stops - An array of color stops (e.g., `"#0ea5e9"`, `"#3b82f6 50%"`, `"rgba(0,0,0,0.2)"`).
   * @return This instance for chaining.
   */
  linearGradient(direction: LinearGradientDirection, ...stops: string[]): this {
    const gradient = `linear-gradient(${direction}, ${stops.join(", ")})`;
    return this.setStyleProp("background", gradient);
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
