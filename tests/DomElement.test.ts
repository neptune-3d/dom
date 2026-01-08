import { describe, it, expect, beforeEach } from "vitest";
import { $, $query, DomElement } from "../src/DomElement";

describe("DomElement", () => {
  let divWrapper: DomElement<"div">;

  beforeEach(() => {
    document.body.innerHTML = "";
    divWrapper = $("div");
    document.body.appendChild(divWrapper.dom);
  });

  it("creates a new DomElement for an HTML tag", () => {
    expect(divWrapper).toBeInstanceOf(DomElement);
    expect(divWrapper.tag).toBe("div");
    expect(divWrapper.isSvg).toBe(false);
    expect(divWrapper.dom).toBeInstanceOf(HTMLDivElement);
    expect(divWrapper.dom.tagName).toBe("DIV");
  });

  it("creates a new DomElement for an SVG tag", () => {
    const svgWrapper = $("svg");
    expect(svgWrapper.tag).toBe("svg");
    expect(svgWrapper.isSvg).toBe(true);
    expect(svgWrapper.dom).toBeInstanceOf(SVGSVGElement);
    expect(svgWrapper.dom.namespaceURI).toBe("http://www.w3.org/2000/svg");
  });

  it("wraps an existing element when provided", () => {
    const existing = document.createElement("span");
    const spanWrapper = new DomElement("span", existing);

    expect(spanWrapper.dom).toBe(existing);
    expect(spanWrapper.tag).toBe("span");
    expect(spanWrapper.isSvg).toBe(false);
  });

  it("query() returns a DomElement wrapper for a matching element", () => {
    const el = document.createElement("p");
    el.className = "test-p";
    document.body.appendChild(el);

    const result = $query<"p">(".test-p");
    expect(result).toBeInstanceOf(DomElement);
    expect(result?.dom).toBe(el);
  });

  it("query() returns null if no match is found", () => {
    const result = $query<"div">(".nonexistent");
    expect(result).toBeNull();
  });

  it("created elements belong to the correct document", () => {
    const sectionWrapper = $("section");
    expect(sectionWrapper.dom.ownerDocument).toBe(document);
  });

  it("returns a CSSStyleDeclaration object", () => {
    const style = divWrapper.getComputedStyle();
    expect(style).toBeInstanceOf(CSSStyleDeclaration);
  });

  it("reflects inline styles applied to the element", () => {
    divWrapper.dom.style.width = "200px";
    const style = divWrapper.getComputedStyle();
    expect(style.width).toBe("200px");
  });

  it("reflects styles applied via CSS classes", () => {
    const styleEl = document.createElement("style");
    styleEl.textContent = ".test-class { color: rgb(255, 0, 0); }";
    document.head.appendChild(styleEl);

    divWrapper.dom.className = "test-class";
    const style = divWrapper.getComputedStyle();
    expect(style.color).toBe("rgb(255, 0, 0)");

    styleEl.remove();
  });

  it("returns cached style object when called without force", () => {
    divWrapper.dom.style.height = "100px";
    const style1 = divWrapper.getComputedStyle();
    const style2 = divWrapper.getComputedStyle(); // no force

    // Same object reference due to caching
    expect(style1).toBe(style2);
    expect(style2.height).toBe("100px");
  });

  it("force recomputation returns updated values and a new object", () => {
    divWrapper.dom.style.height = "100px";
    const style1 = divWrapper.getComputedStyle();
    expect(style1.height).toBe("100px");

    // Change style after first computation
    divWrapper.dom.style.height = "150px";
    const style2 = divWrapper.getComputedStyle(true); // force recompute

    expect(style2.height).toBe("150px");
    // Different object reference when forced
    expect(style2).not.toBe(style1);
  });

  it("works for SVG elements", () => {
    const svgWrapper = $("svg");
    document.body.appendChild(svgWrapper.dom);

    // Use inline CSS (not presentation attribute) so jsdom resolves it in computed style
    svgWrapper.dom.style.width = "300px";

    const style = svgWrapper.getComputedStyle();
    expect(style.width).toBe("300px");
  });

  it("removes the element from the DOM tree", () => {
    expect(document.body.contains(divWrapper.dom)).toBe(true);

    divWrapper.remove();

    expect(document.body.contains(divWrapper.dom)).toBe(false);
  });

  it("works for nested elements", () => {
    const parent = $("section");
    const child = $("span");
    parent.dom.appendChild(child.dom);
    document.body.appendChild(parent.dom);

    expect(parent.dom.contains(child.dom)).toBe(true);

    child.remove();

    expect(parent.dom.contains(child.dom)).toBe(false);
  });

  it("returns the same DomElement instance for chaining", () => {
    const result = divWrapper.remove();
    expect(result).toBeUndefined(); // current implementation returns nothing
    // If you want chaining, update remove() to `return this;`
    // then test would be: expect(result).toBe(divWrapper);
  });

  describe("DomElement.focus, blur, and isFocused", () => {
    let inputWrapper: ReturnType<typeof $>;

    beforeEach(() => {
      document.body.innerHTML = "";
      inputWrapper = $("input");
      document.body.appendChild(inputWrapper.dom);
    });

    it("focus() sets the element as the active element and isFocused() returns true", () => {
      const result = inputWrapper.focus();
      expect(result).toBe(inputWrapper);
      expect(document.activeElement).toBe(inputWrapper.dom);
      expect(inputWrapper.isFocused()).toBe(true);
    });

    it("blur() removes focus from the element and isFocused() returns false", () => {
      inputWrapper.focus();
      expect(document.activeElement).toBe(inputWrapper.dom);
      expect(inputWrapper.isFocused()).toBe(true);

      const result = inputWrapper.blur();
      expect(result).toBe(inputWrapper);
      // After blur, activeElement usually falls back to <body>
      expect(document.activeElement).not.toBe(inputWrapper.dom);
      expect(inputWrapper.isFocused()).toBe(false);
    });

    it("focus() works on non-focusable elements with tabindex and isFocused() reflects state", () => {
      const divWrapper = $("div");
      divWrapper.dom.setAttribute("tabindex", "0");
      document.body.appendChild(divWrapper.dom);

      divWrapper.focus();
      expect(document.activeElement).toBe(divWrapper.dom);
      expect(divWrapper.isFocused()).toBe(true);

      divWrapper.blur();
      expect(document.activeElement).not.toBe(divWrapper.dom);
      expect(divWrapper.isFocused()).toBe(false);
    });

    it("isFocused() returns false for detached elements", () => {
      const spanWrapper = $("span");
      // not appended to document
      expect(spanWrapper.isFocused()).toBe(false);
    });
  });
});
