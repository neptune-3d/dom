import { describe, expect, it, beforeEach } from "vitest";
import { $body } from "../src/DomBody";
import { DomElement } from "../src/DomElement";

describe("DomBody", () => {
  let bodyWrapper: ReturnType<typeof $body>;

  beforeEach(() => {
    // Reset document.body contents before each test
    document.body.innerHTML = "";
    bodyWrapper = $body();
  });

  it("wraps document.body by default", () => {
    expect(bodyWrapper.dom).toBe(document.body);
  });

  it("wraps a provided body element", () => {
    const customBody = document.createElement("body");
    const customWrapper = $body(customBody);
    expect(customWrapper.dom).toBe(customBody);
  });

  it("query returns a DomElement wrapper for a matching descendant", () => {
    const div = document.createElement("div");
    div.className = "test-div";
    document.body.appendChild(div);

    const result = bodyWrapper.query<"div">(".test-div");

    expect(result).toBeInstanceOf(DomElement);
    expect(result?.dom).toBe(div);
  });

  it("query returns null when no match is found", () => {
    const result = bodyWrapper.query<"span">(".nonexistent");
    expect(result).toBeNull();
  });

  it("query works with nested descendants", () => {
    const section = document.createElement("section");
    const span = document.createElement("span");
    span.className = "nested-span";
    section.appendChild(span);
    document.body.appendChild(section);

    const result = bodyWrapper.query<"span">(".nested-span");

    expect(result).toBeInstanceOf(DomElement);
    expect(result?.dom).toBe(span);
  });

  describe("focus, blur, and isFocused", () => {
    beforeEach(() => {
      // Ensure body is focusable
      document.body.setAttribute("tabindex", "0");
    });

    it("focus() sets body as the active element and isFocused() returns true", () => {
      const result = bodyWrapper.focus();
      expect(result).toBe(bodyWrapper);
      expect(document.activeElement).toBe(document.body);
      expect(bodyWrapper.isFocused()).toBe(true);
    });

    it("blur() followed by focusing another element makes body not focused", () => {
      bodyWrapper.focus();
      expect(bodyWrapper.isFocused()).toBe(true);

      // Blur body, then explicitly move focus to another element
      const other = document.createElement("input");
      document.body.appendChild(other);

      const result = bodyWrapper.blur();
      expect(result).toBe(bodyWrapper);

      other.focus();
      expect(document.activeElement).toBe(other);
      expect(bodyWrapper.isFocused()).toBe(false);
    });

    it("isFocused() returns false when another element is focused", () => {
      // If body has tabindex, it may be the active element by default in jsdom
      const other = document.createElement("button");
      document.body.appendChild(other);
      other.focus();

      expect(document.activeElement).toBe(other);
      expect(bodyWrapper.isFocused()).toBe(false);
    });
  });
});
