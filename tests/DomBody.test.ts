import { describe, expect, it } from "vitest";
import { $body } from "../src/DomBody";

describe("DomBody", () => {
  it("wraps document.body by default", () => {
    const body = $body();
    expect(body.dom).toBe(document.body);
  });

  it("wraps a provided body element", () => {
    const customBody = document.createElement("body");
    const body = $body(customBody);
    expect(body.dom).toBe(customBody);
  });
});
