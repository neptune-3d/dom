import { beforeEach, describe, expect, it, vi } from "vitest";
import { $document, DomDocument } from "../src/DomDocument";
import { DomElement } from "../src/DomElement";

describe("DomDocument", () => {
  let docWrapper: DomDocument;

  beforeEach(() => {
    // Always start with the global document wrapper
    docWrapper = $document();
  });

  it("wraps global document by default", () => {
    expect(docWrapper.dom).toBe(document);
  });

  it("wraps a provided document instance", () => {
    const iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    const iframeDoc = iframe.contentDocument!;
    const customWrapper = $document(iframeDoc);

    expect(customWrapper.dom).toBe(iframeDoc);

    iframe.remove();
  });

  it("getWindow() returns the associated window for global document", () => {
    expect(docWrapper.getWindow()).toBe(window);
  });

  it("getWindow() returns the associated window for iframe document", () => {
    const iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    const iframeDoc = iframe.contentDocument!;
    const customWrapper = $document(iframeDoc);

    expect(customWrapper.getWindow()).toBe(iframe.contentWindow);

    iframe.remove();
  });

  it("getWindow() falls back to global window if document has no defaultView", () => {
    // Create a synthetic detached document
    const detachedDoc = document.implementation.createHTMLDocument("detached");
    // In jsdom, detached documents often have defaultView = null
    Object.defineProperty(detachedDoc, "defaultView", { value: null });

    const detachedWrapper = $document(detachedDoc);
    expect(detachedWrapper.getWindow()).toBe(window);
  });

  it("getBody() returns the global document body", () => {
    const body = docWrapper.getBody();
    expect(body).toBe(document.body);
    expect(body?.tagName).toBe("BODY");
  });

  it("getHead() returns the global document head", () => {
    const head = docWrapper.getHead();
    expect(head).toBe(document.head);
    expect(head?.tagName).toBe("HEAD");
  });

  it("getBody() and getHead() work with an iframe document", () => {
    const iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    const iframeDoc = iframe.contentDocument!;
    const iframeWrapper = $document(iframeDoc);

    expect(iframeWrapper.getBody()).toBe(iframeDoc.body);
    expect(iframeWrapper.getHead()).toBe(iframeDoc.head);

    iframe.remove();
  });

  it("getBody() returns null if document has no body", () => {
    const detachedDoc = document.implementation.createHTMLDocument("detached");
    // Remove body
    detachedDoc.body.remove();

    const detachedWrapper = $document(detachedDoc);
    expect(detachedWrapper.getBody()).toBeNull();
  });

  it("getHead() returns null if document has no head", () => {
    const detachedDoc = document.implementation.createHTMLDocument("detached");
    // Remove head
    detachedDoc.head.remove();

    const detachedWrapper = $document(detachedDoc);
    expect(detachedWrapper.getHead()).toBeNull();
  });

  it("on() attaches an event listener and handler is called", () => {
    const handler = vi.fn();

    docWrapper.on("selectionchange", handler);
    document.dispatchEvent(new Event("selectionchange"));

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0]).toBeInstanceOf(Event);
  });

  it("off() removes an event listener so handler is not called", () => {
    const handler = vi.fn();

    docWrapper.on("visibilitychange", handler);
    docWrapper.off("visibilitychange", handler);

    document.dispatchEvent(new Event("visibilitychange"));

    expect(handler).not.toHaveBeenCalled();
  });

  it("on() returns this for chaining", () => {
    const handler = vi.fn();
    const result = docWrapper.on("copy", handler);
    expect(result).toBe(docWrapper);
  });

  it("off() returns this for chaining", () => {
    const handler = vi.fn();
    docWrapper.on("copy", handler);
    const result = docWrapper.off("copy", handler);
    expect(result).toBe(docWrapper);
  });

  it("off() respects capture option", () => {
    const handler = vi.fn();

    docWrapper.on("click", handler, { capture: true });
    // Removing without capture should NOT match the original listener
    docWrapper.off("click", handler);

    document.dispatchEvent(new MouseEvent("click"));
    expect(handler).toHaveBeenCalledTimes(1);

    // Removing with capture should match and remove
    docWrapper.off("click", handler, { capture: true });
    document.dispatchEvent(new MouseEvent("click"));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("dispatch() triggers event listeners attached with on()", () => {
    const handler = vi.fn();

    docWrapper.on("visibilitychange", handler);
    docWrapper.dispatch(new Event("visibilitychange"));

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0]).toBeInstanceOf(Event);
  });

  it("dispatch() returns this for chaining", () => {
    const result = docWrapper.dispatch(new Event("selectionchange"));
    expect(result).toBe(docWrapper);
  });

  it("dispatch() does not throw if no listeners are attached", () => {
    expect(() => {
      docWrapper.dispatch(new Event("visibilitychange"));
    }).not.toThrow();
  });

  it("creates a Text node from a string", () => {
    const node = docWrapper.createTextNode("hello world");
    expect(node).toBeInstanceOf(Text);
    expect(node.nodeValue).toBe("hello world");
    expect(node.ownerDocument).toBe(document);
  });

  it("creates a Text node from a number", () => {
    const node = docWrapper.createTextNode(123);
    expect(node.nodeValue).toBe("123");
  });

  it("creates a Text node from a boolean", () => {
    const nodeTrue = docWrapper.createTextNode(true);
    const nodeFalse = docWrapper.createTextNode(false);

    expect(nodeTrue.nodeValue).toBe("true");
    expect(nodeFalse.nodeValue).toBe("false");
  });

  it("creates an empty Text node from null or undefined", () => {
    const nodeNull = docWrapper.createTextNode(null);
    const nodeUndefined = docWrapper.createTextNode(undefined);

    expect(nodeNull.nodeValue).toBe("");
    expect(nodeUndefined.nodeValue).toBe("");
  });

  it("created Text node can be appended to the document body", () => {
    const node = docWrapper.createTextNode("appended text");
    document.body.appendChild(node);

    expect(document.body.textContent).toContain("appended text");
  });

  it("creates a div element", () => {
    const el = docWrapper.createElement("div");
    expect(el).toBeInstanceOf(HTMLDivElement);
    expect(el.tagName).toBe("DIV");
    expect(el.ownerDocument).toBe(document);
  });

  it("creates a span element", () => {
    const el = docWrapper.createElement("span");
    expect(el).toBeInstanceOf(HTMLSpanElement);
    expect(el.tagName).toBe("SPAN");
  });

  it("creates a paragraph element and appends to body", () => {
    const el = docWrapper.createElement("p");
    el.textContent = "Hello paragraph";
    document.body.appendChild(el);

    expect(document.body.textContent).toContain("Hello paragraph");
  });

  it("creates multiple distinct elements", () => {
    const div = docWrapper.createElement("div");
    const span = docWrapper.createElement("span");

    expect(div.tagName).toBe("DIV");
    expect(span.tagName).toBe("SPAN");
    expect(div).not.toBe(span);
  });

  it("creates elements in a custom document (iframe)", () => {
    const iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    const iframeDoc = iframe.contentDocument!;
    const iframeWrapper = $document(iframeDoc);

    const el = iframeWrapper.createElement("section");

    // Structural assertions that are cross-realm-safe
    expect(el.nodeType).toBe(Node.ELEMENT_NODE);
    expect(el.tagName).toBe("SECTION");
    expect(el.ownerDocument).toBe(iframeDoc);

    iframe.remove();
  });

  it("creates an HTML element in the XHTML namespace", () => {
    const el = docWrapper.createElementNS(
      "http://www.w3.org/1999/xhtml",
      "div"
    );
    expect(el.tagName).toBe("DIV");
    expect(el.namespaceURI).toBe("http://www.w3.org/1999/xhtml");
    expect(el.ownerDocument).toBe(document);
  });

  it("creates an SVG element in the SVG namespace", () => {
    const svg = docWrapper.createElementNS("http://www.w3.org/2000/svg", "svg");
    const circle = docWrapper.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );

    expect(svg.tagName).toBe("svg"); // SVG tag names are lowercase in jsdom
    expect(svg.namespaceURI).toBe("http://www.w3.org/2000/svg");

    expect(circle.tagName).toBe("circle");
    expect(circle.namespaceURI).toBe("http://www.w3.org/2000/svg");

    // Append circle to svg
    svg.appendChild(circle);
    expect(svg.querySelector("circle")).toBe(circle);
  });

  it("creates multiple distinct elements in different namespaces", () => {
    const div = docWrapper.createElementNS(
      "http://www.w3.org/1999/xhtml",
      "div"
    );
    const rect = docWrapper.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );

    expect(div.namespaceURI).toBe("http://www.w3.org/1999/xhtml");
    expect(rect.namespaceURI).toBe("http://www.w3.org/2000/svg");
    expect(div).not.toBe(rect);
  });

  it("creates elements in a custom document (iframe)", () => {
    const iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    const iframeDoc = iframe.contentDocument!;
    const iframeWrapper = $document(iframeDoc);

    const el = iframeWrapper.createElementNS(
      "http://www.w3.org/1999/xhtml",
      "section"
    );

    // Cross-realm safe checks
    expect(el.nodeType).toBe(Node.ELEMENT_NODE);
    expect(el.tagName).toBe("SECTION");
    expect(el.namespaceURI).toBe("http://www.w3.org/1999/xhtml");
    expect(el.ownerDocument).toBe(iframeDoc);

    iframe.remove();
  });

  it("returns a DomElement wrapper for a matching descendant", () => {
    const div = document.createElement("div");
    div.className = "test-div";
    document.body.appendChild(div);

    const result = docWrapper.query<"div">(".test-div");

    expect(result).toBeInstanceOf(DomElement);
    expect(result?.dom).toBe(div);
  });

  it("returns null when no match is found", () => {
    const result = docWrapper.query<"span">(".nonexistent");
    expect(result).toBeNull();
  });

  it("works with nested descendants", () => {
    const section = document.createElement("section");
    const span = document.createElement("span");
    span.className = "nested-span";
    section.appendChild(span);
    document.body.appendChild(section);

    const result = docWrapper.query<"span">(".nested-span");

    expect(result).toBeInstanceOf(DomElement);
    expect(result?.dom).toBe(span);
  });

  it("supports different tag types via generic", () => {
    const link = document.createElement("a");
    link.href = "/test";
    link.className = "test-link";
    document.body.appendChild(link);

    const result = docWrapper.query<"a">("a.test-link");

    expect(result).toBeInstanceOf(DomElement);
    expect(result?.dom).toBe(link);
    expect(result?.dom.getAttribute("href")).toBe("/test");
  });
});
