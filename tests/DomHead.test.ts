import { beforeEach, describe, expect, it } from "vitest";
import { DomElement } from "../src/DomElement";
import { $head } from "../src/DomHead";

describe("DomHead", () => {
  beforeEach(() => {
    // Reset document.head contents before each test
    document.head.innerHTML = "";
  });

  it("wraps document.head by default", () => {
    const head = $head();
    expect(head.dom).toBe(document.head);
  });

  it("wraps a provided head element", () => {
    const customHead = document.createElement("head");
    const head = $head(customHead);
    expect(head.dom).toBe(customHead);
  });

  it("title() creates a <title> element if missing", () => {
    const head = $head();
    expect(document.head.querySelector("title")).toBeNull();

    head.title("My Page Title");

    const titleEl = document.head.querySelector("title");
    expect(titleEl).not.toBeNull();
    expect(titleEl?.textContent).toBe("My Page Title");
    expect(document.title).toBe("My Page Title");
  });

  it("title() updates existing <title> element", () => {
    const titleEl = document.createElement("title");
    titleEl.textContent = "Old Title";
    document.head.appendChild(titleEl);

    const head = $head();
    head.title("New Title");

    const updatedTitleEl = document.head.querySelector("title");
    expect(updatedTitleEl).not.toBeNull();
    expect(updatedTitleEl?.textContent).toBe("New Title");
    expect(document.title).toBe("New Title");
  });

  it("title() returns this for chaining", () => {
    const head = $head();
    const result = head.title("Chainable Title");
    expect(result).toBe(head);
  });

  // --- Charset tests ---
  it("charset() creates a <meta charset> element if missing", () => {
    const head = $head();
    expect(document.head.querySelector("meta[charset]")).toBeNull();

    head.charset("UTF-8");

    const metaEl = document.head.querySelector("meta[charset]");
    expect(metaEl).not.toBeNull();
    expect(metaEl?.getAttribute("charset")).toBe("UTF-8");
  });

  it("charset() updates existing <meta charset> element", () => {
    const metaEl = document.createElement("meta");
    metaEl.setAttribute("charset", "ISO-8859-1");
    document.head.appendChild(metaEl);

    const head = $head();
    head.charset("UTF-8");

    const updatedMetaEl = document.head.querySelector("meta[charset]");
    expect(updatedMetaEl).not.toBeNull();
    expect(updatedMetaEl?.getAttribute("charset")).toBe("UTF-8");
  });

  it("charset() ensures only one <meta charset> element exists", () => {
    const head = $head();
    head.charset("UTF-8");
    head.charset("UTF-16");

    const metaEls = document.head.querySelectorAll("meta[charset]");
    expect(metaEls.length).toBe(1);
    expect(metaEls[0].getAttribute("charset")).toBe("UTF-16");
  });

  it("charset() returns this for chaining", () => {
    const head = $head();
    const result = head.charset("UTF-8");
    expect(result).toBe(head);
  });

  // --- viewport tests ---
  it("viewport() creates a <meta name='viewport'> element if missing", () => {
    const head = $head();
    expect(document.head.querySelector("meta[name='viewport']")).toBeNull();

    head.viewport("width=device-width, initial-scale=1");

    const metaEl = document.head.querySelector("meta[name='viewport']");
    expect(metaEl).not.toBeNull();
    expect(metaEl?.getAttribute("content")).toBe(
      "width=device-width, initial-scale=1"
    );
  });

  it("viewport() updates existing <meta name='viewport'> element", () => {
    const metaEl = document.createElement("meta");
    metaEl.setAttribute("name", "viewport");
    metaEl.setAttribute("content", "old-content");
    document.head.appendChild(metaEl);

    const head = $head();
    head.viewport("width=device-width, initial-scale=2");

    const updatedMetaEl = document.head.querySelector("meta[name='viewport']");
    expect(updatedMetaEl).not.toBeNull();
    expect(updatedMetaEl?.getAttribute("content")).toBe(
      "width=device-width, initial-scale=2"
    );
  });

  it("viewport() ensures only one <meta name='viewport'> element exists", () => {
    const head = $head();
    head.viewport("width=device-width, initial-scale=1");
    head.viewport("width=device-width, initial-scale=3");

    const metaEls = document.head.querySelectorAll("meta[name='viewport']");
    expect(metaEls.length).toBe(1);
    expect(metaEls[0].getAttribute("content")).toBe(
      "width=device-width, initial-scale=3"
    );
  });

  it("viewport() returns this for chaining", () => {
    const head = $head();
    const result = head.viewport("width=device-width, initial-scale=1");
    expect(result).toBe(head);
  });

  // --- httpEquiv tests ---
  it("httpEquiv() creates a <meta http-equiv> element if missing", () => {
    const head = $head();
    expect(
      document.head.querySelector('meta[http-equiv="refresh"]')
    ).toBeNull();

    head.httpEquiv("refresh", "5; url=https://example.com");

    const metaEl = document.head.querySelector('meta[http-equiv="refresh"]');
    expect(metaEl).not.toBeNull();
    expect(metaEl?.getAttribute("content")).toBe("5; url=https://example.com");
  });

  it("httpEquiv() updates existing <meta http-equiv> element", () => {
    const metaEl = document.createElement("meta");
    metaEl.setAttribute("http-equiv", "refresh");
    metaEl.setAttribute("content", "old-content");
    document.head.appendChild(metaEl);

    const head = $head();
    head.httpEquiv("refresh", "10; url=https://new.com");

    const updatedMetaEl = document.head.querySelector(
      'meta[http-equiv="refresh"]'
    );
    expect(updatedMetaEl).not.toBeNull();
    expect(updatedMetaEl?.getAttribute("content")).toBe(
      "10; url=https://new.com"
    );
  });

  it("httpEquiv() ensures only one <meta http-equiv> element exists per directive", () => {
    const head = $head();
    head.httpEquiv("X-UA-Compatible", "IE=edge");
    head.httpEquiv("X-UA-Compatible", "IE=11");

    const metaEls = document.head.querySelectorAll(
      'meta[http-equiv="X-UA-Compatible"]'
    );
    expect(metaEls.length).toBe(1);
    expect(metaEls[0].getAttribute("content")).toBe("IE=11");
  });

  it("httpEquiv() allows multiple distinct http-equiv directives", () => {
    const head = $head();
    head.httpEquiv("refresh", "5");
    head.httpEquiv("X-UA-Compatible", "IE=edge");

    const refreshMeta = document.head.querySelector(
      'meta[http-equiv="refresh"]'
    );
    const compatMeta = document.head.querySelector(
      'meta[http-equiv="X-UA-Compatible"]'
    );

    expect(refreshMeta).not.toBeNull();
    expect(compatMeta).not.toBeNull();
    expect(refreshMeta?.getAttribute("content")).toBe("5");
    expect(compatMeta?.getAttribute("content")).toBe("IE=edge");
  });

  it("httpEquiv() returns this for chaining", () => {
    const head = $head();
    const result = head.httpEquiv("refresh", "5");
    expect(result).toBe(head);
  });

  // --- csp tests ---
  it("csp() creates a <meta http-equiv='Content-Security-Policy'> element if missing", () => {
    const head = $head();
    expect(
      document.head.querySelector('meta[http-equiv="Content-Security-Policy"]')
    ).toBeNull();

    head.csp({ "default-src": "'self'" });

    const metaEl = document.head.querySelector(
      'meta[http-equiv="Content-Security-Policy"]'
    );
    expect(metaEl).not.toBeNull();
    expect(metaEl?.getAttribute("content")).toBe("default-src 'self'");
  });

  it("csp() updates existing CSP element", () => {
    const metaEl = document.createElement("meta");
    metaEl.setAttribute("http-equiv", "Content-Security-Policy");
    metaEl.setAttribute("content", "default-src *");
    document.head.appendChild(metaEl);

    const head = $head();
    head.csp({
      "default-src": "'self'",
      "script-src": "'self' https://cdn.example.com",
    });

    const updatedMetaEl = document.head.querySelector(
      'meta[http-equiv="Content-Security-Policy"]'
    );
    expect(updatedMetaEl).not.toBeNull();
    expect(updatedMetaEl?.getAttribute("content")).toBe(
      "default-src 'self'; script-src 'self' https://cdn.example.com"
    );
  });

  it("csp() ensures only one CSP element exists", () => {
    const head = $head();
    head.csp({ "default-src": "'self'" });
    head.csp({ "default-src": "'none'" });

    const metaEls = document.head.querySelectorAll(
      'meta[http-equiv="Content-Security-Policy"]'
    );
    expect(metaEls.length).toBe(1);
    expect(metaEls[0].getAttribute("content")).toBe("default-src 'none'");
  });

  it("csp() serializes multiple directives correctly", () => {
    const head = $head();
    head.csp({
      "default-src": "'self'",
      "script-src": "'self' https://cdn.example.com",
      "style-src": "'self' 'unsafe-inline'",
      "frame-src": "https://trusted.com",
    });

    const metaEl = document.head.querySelector(
      'meta[http-equiv="Content-Security-Policy"]'
    );
    expect(metaEl).not.toBeNull();
    expect(metaEl?.getAttribute("content")).toBe(
      "default-src 'self'; script-src 'self' https://cdn.example.com; style-src 'self' 'unsafe-inline'; frame-src https://trusted.com"
    );
  });

  it("csp() returns this for chaining", () => {
    const head = $head();
    const result = head.csp({ "default-src": "'self'" });
    expect(result).toBe(head);
  });

  // --- description tests ---
  it("description() creates a <meta name='description'> element if missing", () => {
    const head = $head();
    expect(document.head.querySelector("meta[name='description']")).toBeNull();

    head.description("This is a test description");

    const metaEl = document.head.querySelector("meta[name='description']");
    expect(metaEl).not.toBeNull();
    expect(metaEl?.getAttribute("content")).toBe("This is a test description");
  });

  it("description() updates existing <meta name='description'> element", () => {
    const metaEl = document.createElement("meta");
    metaEl.setAttribute("name", "description");
    metaEl.setAttribute("content", "Old description");
    document.head.appendChild(metaEl);

    const head = $head();
    head.description("Updated description");

    const updatedMetaEl = document.head.querySelector(
      "meta[name='description']"
    );
    expect(updatedMetaEl).not.toBeNull();
    expect(updatedMetaEl?.getAttribute("content")).toBe("Updated description");
  });

  it("description() ensures only one <meta name='description'> element exists", () => {
    const head = $head();
    head.description("First description");
    head.description("Second description");

    const metaEls = document.head.querySelectorAll("meta[name='description']");
    expect(metaEls.length).toBe(1);
    expect(metaEls[0].getAttribute("content")).toBe("Second description");
  });

  it("description() returns this for chaining", () => {
    const head = $head();
    const result = head.description("Chainable description");
    expect(result).toBe(head);
  });

  // --- keywords tests ---
  it("keywords() creates a <meta name='keywords'> element if missing", () => {
    const head = $head();
    expect(document.head.querySelector("meta[name='keywords']")).toBeNull();

    head.keywords("html, css, javascript");

    const metaEl = document.head.querySelector("meta[name='keywords']");
    expect(metaEl).not.toBeNull();
    expect(metaEl?.getAttribute("content")).toBe("html, css, javascript");
  });

  it("keywords() updates existing <meta name='keywords'> element", () => {
    const metaEl = document.createElement("meta");
    metaEl.setAttribute("name", "keywords");
    metaEl.setAttribute("content", "old, keywords");
    document.head.appendChild(metaEl);

    const head = $head();
    head.keywords("new, keywords, list");

    const updatedMetaEl = document.head.querySelector("meta[name='keywords']");
    expect(updatedMetaEl).not.toBeNull();
    expect(updatedMetaEl?.getAttribute("content")).toBe("new, keywords, list");
  });

  it("keywords() ensures only one <meta name='keywords'> element exists", () => {
    const head = $head();
    head.keywords("first, set");
    head.keywords("second, set");

    const metaEls = document.head.querySelectorAll("meta[name='keywords']");
    expect(metaEls.length).toBe(1);
    expect(metaEls[0].getAttribute("content")).toBe("second, set");
  });

  it("keywords() returns this for chaining", () => {
    const head = $head();
    const result = head.keywords("chainable, test");
    expect(result).toBe(head);
  });

  // --- link tests ---
  it("link() creates a <link> element with given rel and href if missing", () => {
    const head = $head();
    expect(document.head.querySelector('link[rel="stylesheet"]')).toBeNull();

    head.link("stylesheet", "/styles.css");

    const linkEl = document.head.querySelector('link[rel="stylesheet"]');
    expect(linkEl).not.toBeNull();
    expect(linkEl?.getAttribute("href")).toBe("/styles.css");
  });

  it("link() updates existing <link> element with same rel", () => {
    const linkEl = document.createElement("link");
    linkEl.setAttribute("rel", "stylesheet");
    linkEl.setAttribute("href", "/old.css");
    document.head.appendChild(linkEl);

    const head = $head();
    head.link("stylesheet", "/new.css");

    const updatedLinkEl = document.head.querySelector('link[rel="stylesheet"]');
    expect(updatedLinkEl).not.toBeNull();
    expect(updatedLinkEl?.getAttribute("href")).toBe("/new.css");
  });

  it("link() ensures only one <link> element exists per rel", () => {
    const head = $head();
    head.link("icon", "/favicon1.ico");
    head.link("icon", "/favicon2.ico");

    const linkEls = document.head.querySelectorAll('link[rel="icon"]');
    expect(linkEls.length).toBe(1);
    expect(linkEls[0].getAttribute("href")).toBe("/favicon2.ico");
  });

  it("link() allows multiple distinct rel values", () => {
    const head = $head();
    head.link("stylesheet", "/styles.css");
    head.link("icon", "/favicon.ico");

    const stylesheetLink = document.head.querySelector(
      'link[rel="stylesheet"]'
    );
    const iconLink = document.head.querySelector('link[rel="icon"]');

    expect(stylesheetLink).not.toBeNull();
    expect(iconLink).not.toBeNull();
    expect(stylesheetLink?.getAttribute("href")).toBe("/styles.css");
    expect(iconLink?.getAttribute("href")).toBe("/favicon.ico");
  });

  it("link() applies additional attributes", () => {
    const head = $head();
    head.link("stylesheet", "/print.css", { media: "print", type: "text/css" });

    const linkEl = document.head.querySelector('link[rel="stylesheet"]');
    expect(linkEl).not.toBeNull();
    expect(linkEl?.getAttribute("media")).toBe("print");
    expect(linkEl?.getAttribute("type")).toBe("text/css");
  });

  it("link() returns this for chaining", () => {
    const head = $head();
    const result = head.link("manifest", "/manifest.json");
    expect(result).toBe(head);
  });

  // query

  it("returns a DomElement wrapper for a matching descendant", () => {
    const div = document.createElement("div");
    div.className = "test-div";
    document.head.appendChild(div);

    const head = $head();
    const result = head.query<"div">(".test-div");

    expect(result).toBeInstanceOf(DomElement);
    expect(result?.dom).toBe(div);
  });

  it("returns null when no match is found", () => {
    const head = $head();
    const result = head.query<"span">(".nonexistent");
    expect(result).toBeNull();
  });

  it("works with nested descendants", () => {
    const section = document.createElement("section");
    const span = document.createElement("span");
    span.className = "nested-span";
    section.appendChild(span);
    document.head.appendChild(section);

    const head = $head();
    const result = head.query<"span">(".nested-span");

    expect(result).toBeInstanceOf(DomElement);
    expect(result?.dom).toBe(span);
  });

  it("supports different tag types via generic", () => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/styles.css";
    document.head.appendChild(link);

    const head = $head();
    const result = head.query<"link">("link[rel='stylesheet']");

    expect(result).toBeInstanceOf(DomElement);
    expect(result?.dom).toBe(link);
    expect(result?.dom.getAttribute("href")).toBe("/styles.css");
  });
});
