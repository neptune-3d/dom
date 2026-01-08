import { beforeEach, describe, expect, it } from "vitest";
import { CssRule } from "../src/CssRule";
import { $sheet } from "../src/StyleSheet";

describe("CssRule", () => {
  let styleEl: HTMLStyleElement;
  let sheetWrapper: ReturnType<typeof $sheet>;
  let rule: CssRule;

  beforeEach(() => {
    styleEl = document.createElement("style");
    document.head.appendChild(styleEl);
    sheetWrapper = $sheet(styleEl);
    rule = sheetWrapper.cssRule(".test");
  });

  it("exposes the underlying CSSStyleRule", () => {
    expect(rule.rule).toBeInstanceOf(CSSStyleRule);
    expect(rule.selectorText).toBe(".test");
  });

  it("tracks its index within the stylesheet", () => {
    expect(rule.index).toBe(0);
    // add another rule and check index
    const second = sheetWrapper.cssRule(".second");
    expect(second.index).toBe(1);
  });

  it("allows style manipulation via BaseStyle methods", () => {
    rule.color("red");
    expect(rule.rule.style.color).toBe("red");
  });

  it("removes itself from the stylesheet", () => {
    expect(sheetWrapper.length).toBe(1);
    rule.remove();
    expect(sheetWrapper.length).toBe(0);
  });

  it("can extend selector with pseudo-classes", () => {
    const hoverRule = rule.hover();
    expect(hoverRule.selectorText).toBe(".test:hover");

    const focusRule = rule.focus();
    expect(focusRule.selectorText).toBe(".test:focus");

    const activeRule = rule.active();
    expect(activeRule.selectorText).toBe(".test:active");

    const disabledRule = rule.disabled();
    expect(disabledRule.selectorText).toBe(".test:disabled");
  });

  it("can extend selector with combinators", () => {
    // Descendant combinator
    const descendant = rule.extend(" .child");
    expect(descendant.selectorText).toBe(".test .child");

    // Direct child combinator
    const directChild = rule.extend(" > .child");
    expect(directChild.selectorText).toBe(".test > .child");

    // Adjacent sibling combinator
    const adjacent = rule.extend(" + .sibling");
    expect(adjacent.selectorText).toBe(".test + .sibling");

    // General sibling combinator
    const generalSibling = rule.extend(" ~ .sibling");
    expect(generalSibling.selectorText).toBe(".test ~ .sibling");

    // No space = class conjunction (same element)
    const conjunction = rule.extend(".another");
    expect(conjunction.selectorText).toBe(".test.another");
  });

  it("returns a StyleSheet wrapper for the parent stylesheet", () => {
    const parentSheet = rule.getSheet();

    // Exists and wraps the same native CSSStyleSheet
    expect(parentSheet).not.toBeNull();
    expect(parentSheet?.sheet).toBe(styleEl.sheet);

    // Behaves like a StyleSheet: can insert rules and reports length
    const initialLen = parentSheet!.length;
    parentSheet!.cssRule(".another");
    expect(parentSheet!.length).toBe(initialLen + 1);
    expect(
      (parentSheet!.sheet.cssRules[parentSheet!.length - 1] as CSSStyleRule)
        .selectorText
    ).toBe(".another");
  });

  it("allows inserting new rules via the returned StyleSheet", () => {
    const parentSheet = rule.getSheet();
    parentSheet?.cssRule(".another");
    expect(parentSheet?.length).toBe(2);
    expect((parentSheet?.sheet.cssRules[1] as CSSStyleRule).selectorText).toBe(
      ".another"
    );
  });

  it("returns null if the rule has no parent stylesheet", () => {
    // Create and attach <style> so it has a sheet
    const orphanStyleEl = document.createElement("style");
    document.head.appendChild(orphanStyleEl);

    const orphanSheet = orphanStyleEl.sheet as CSSStyleSheet;
    expect(orphanSheet).toBeInstanceOf(CSSStyleSheet);

    // Insert a rule, capture the CSSStyleRule, then delete it from the sheet
    const index = orphanSheet.insertRule(".orphan{}", 0);
    const orphanRule = orphanSheet.cssRules[index] as CSSStyleRule;

    orphanSheet.deleteRule(index);

    // At this point, the rule is no longer in a sheet. In jsdom, parentStyleSheet becomes null.
    const wrapper = new CssRule(index, orphanRule);
    expect(wrapper.getSheet()).toBeNull();
  });

  describe("CssRule.remove", () => {
    let styleEl: HTMLStyleElement;
    let sheetWrapper: ReturnType<typeof $sheet>;
    let rule: CssRule;

    beforeEach(() => {
      styleEl = document.createElement("style");
      document.head.appendChild(styleEl);
      sheetWrapper = $sheet(styleEl);
      rule = sheetWrapper.cssRule(".remove-me");
    });

    it("removes the rule from its parent stylesheet", () => {
      expect(sheetWrapper.length).toBe(1);

      rule.remove();
      expect(sheetWrapper.length).toBe(0);
    });

    it("is idempotent: calling remove twice does not throw", () => {
      rule.remove();
      expect(sheetWrapper.length).toBe(0);

      // Second call should be safe
      expect(() => rule.remove()).not.toThrow();
      expect(sheetWrapper.length).toBe(0);
    });

    it("getSheet() returns null after removal", () => {
      rule.remove();
      expect(rule.getSheet()).toBeNull();
    });

    it("removing one rule does not affect others", () => {
      const another = sheetWrapper.cssRule(".another");
      expect(sheetWrapper.length).toBe(2);

      rule.remove();
      expect(sheetWrapper.length).toBe(1);
      expect(another.getSheet()).not.toBeNull();
      expect(another.selectorText).toBe(".another");
    });
  });

  describe("CssRule.extend", () => {
    let styleEl: HTMLStyleElement;
    let sheetWrapper: ReturnType<typeof $sheet>;
    let rule: CssRule;

    beforeEach(() => {
      styleEl = document.createElement("style");
      document.head.appendChild(styleEl);
      sheetWrapper = $sheet(styleEl);
      rule = sheetWrapper.cssRule(".base");
    });

    it("extends with a pseudo-class", () => {
      const hoverRule = rule.extend(":hover");
      expect(hoverRule.selectorText).toBe(".base:hover");
      expect(sheetWrapper.length).toBe(2);
    });

    it("extends with a direct child combinator", () => {
      const childRule = rule.extend(" > span");
      expect(childRule.selectorText).toBe(".base > span");
      expect(sheetWrapper.length).toBe(2);
    });

    it("extends with an adjacent sibling combinator", () => {
      const siblingRule = rule.extend(" + .sibling");
      expect(siblingRule.selectorText).toBe(".base + .sibling");
    });

    it("extends with a general sibling combinator", () => {
      const generalSiblingRule = rule.extend(" ~ .sibling");
      expect(generalSiblingRule.selectorText).toBe(".base ~ .sibling");
    });

    it("extends with an attribute selector", () => {
      const attrRule = rule.extend("[data-active]");
      expect(attrRule.selectorText).toBe(".base[data-active]");
    });

    it("inserts the extended rule into the same stylesheet", () => {
      const extended = rule.extend(":focus");
      expect(extended.getSheet()?.sheet).toBe(sheetWrapper.sheet);
    });

    it("throws an error if the rule is detached", () => {
      // Remove the rule from the sheet
      rule.remove();
      expect(() => rule.extend(":hover")).toThrowError(
        /Cannot extend selector ".base"/
      );
    });
  });

  describe("CssRule convenience methods", () => {
    let styleEl: HTMLStyleElement;
    let sheetWrapper: ReturnType<typeof $sheet>;
    let baseRule: CssRule;

    beforeEach(() => {
      styleEl = document.createElement("style");
      document.head.appendChild(styleEl);
      sheetWrapper = $sheet(styleEl);
      baseRule = sheetWrapper.cssRule(".base");
    });

    it("hover() creates a :hover rule", () => {
      const hoverRule = baseRule.hover();
      expect(hoverRule).toBeInstanceOf(CssRule);
      expect(hoverRule.selectorText).toBe(".base:hover");
      expect(hoverRule.getSheet()?.sheet).toBe(sheetWrapper.sheet);
    });

    it("focus() creates a :focus rule", () => {
      const focusRule = baseRule.focus();
      expect(focusRule.selectorText).toBe(".base:focus");
    });

    it("focusWithin() creates a :focus-within rule", () => {
      const focusWithinRule = baseRule.focusWithin();
      expect(focusWithinRule.selectorText).toBe(".base:focus-within");
    });

    it("active() creates an :active rule", () => {
      const activeRule = baseRule.active();
      expect(activeRule.selectorText).toBe(".base:active");
    });

    it("disabled() creates a :disabled rule", () => {
      const disabledRule = baseRule.disabled();
      expect(disabledRule.selectorText).toBe(".base:disabled");
    });

    it("each convenience method inserts the rule into the same stylesheet", () => {
      const initialLen = sheetWrapper.length;
      baseRule.hover();
      baseRule.focus();
      baseRule.focusWithin();
      baseRule.active();
      baseRule.disabled();

      expect(sheetWrapper.length).toBe(initialLen + 5);
    });
  });
});
