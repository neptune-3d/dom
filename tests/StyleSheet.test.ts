import { beforeEach, describe, expect, it } from "vitest";
import { CssRule } from "../src/CssRule";
import { MediaRule } from "../src/MediaRule";
import { $sheet, StyleSheet } from "../src/StyleSheet";

describe("StyleSheet", () => {
  let styleEl: HTMLStyleElement;
  let sheetWrapper: StyleSheet;

  beforeEach(() => {
    // fresh <style> element for each test
    styleEl = document.createElement("style");
    document.head.appendChild(styleEl);
    sheetWrapper = $sheet(styleEl);
  });

  it("wraps an existing <style> element’s stylesheet", () => {
    expect(sheetWrapper.sheet).toBeInstanceOf(CSSStyleSheet);
    expect(sheetWrapper.length).toBe(0);
  });

  it("cssRule inserts a new CSS rule", () => {
    const rule = sheetWrapper.cssRule(".test");
    expect(rule).toBeInstanceOf(CssRule);
    expect(sheetWrapper.length).toBe(1);
    expect(sheetWrapper.sheet.cssRules[0].cssText).toBe(".test { }");
  });

  it("mediaRule inserts a new @media rule", () => {
    const rule = sheetWrapper.mediaRule("screen and (max-width: 600px)");
    expect(rule).toBeInstanceOf(MediaRule);
    expect(sheetWrapper.length).toBe(1);

    const mediaRule = sheetWrapper.sheet.cssRules[0] as CSSMediaRule;
    // Normalize away outer parentheses for jsdom vs browser differences
    const normalized = mediaRule.conditionText.replace(/^\(|\)$/g, "");
    expect(normalized).toBe("screen and (max-width: 600px)");
  });

  it("mediaMinWidth inserts a @media (min-width: …) rule", () => {
    const rule = sheetWrapper.mediaMinWidth(768);
    expect(rule).toBeInstanceOf(MediaRule);
    expect(
      (sheetWrapper.sheet.cssRules[0] as CSSMediaRule).conditionText
    ).toContain("min-width");
  });

  it("mediaMaxWidth inserts a @media (max-width: …) rule", () => {
    const rule = sheetWrapper.mediaMaxWidth("40em");
    expect(rule).toBeInstanceOf(MediaRule);
    expect(
      (sheetWrapper.sheet.cssRules[0] as CSSMediaRule).conditionText
    ).toContain("max-width");
  });

  it("removeRule deletes a specific rule", () => {
    const rule = sheetWrapper.cssRule(".remove-me");
    expect(sheetWrapper.length).toBe(1);

    sheetWrapper.removeRule(rule);
    expect(sheetWrapper.length).toBe(0);
  });

  it("clear removes all rules", () => {
    sheetWrapper.cssRule(".a");
    sheetWrapper.cssRule(".b");
    expect(sheetWrapper.length).toBe(2);

    sheetWrapper.clear();
    expect(sheetWrapper.length).toBe(0);
  });

  it("throws if getSheet is called on a <style> without a sheet", () => {
    const orphan = document.createElement("style");
    // not appended to document, so no sheet
    expect(() => $sheet(orphan)).toThrow();
  });
});
