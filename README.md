# @neptune3d/dom

Helper classes and functions for fluent DOM manipulation, styling, and event handling.

[![NPM Version](https://img.shields.io/npm/v/%40neptune3d%2Fdom)](https://www.npmjs.com/package/@neptune3d/dom)

```bash
npm install @neptune3d/dom
```

> ⚠️ While this library's API is mostly stable, some parts are still under development.

## Usage

```ts
import {
  $window,
  $document,
  $head,
  $body,
  $style,
  $sheet,
  $,
  $btn,
} from "@neptune3d/dom";

const win = $window();
const doc = $document();
const head = $head();
const body = $body();

const style = $style();

// Make sure to add the <style> element to the document
// before using its CSSStyleSheet (via our StyleSheet class).
head.add(style);

const sheet = $sheet(style);

sheet.cssRule(".shown").display("block");

sheet.cssRule(".hidden").display("none");

const btnRule = sheet.cssRule(".btn").b(0).appearance("none").bgColor("white");

// Adds a new ".btn:focus" rule — focus() is shorthand for rule.extend(":focus")
btnRule.focus().outline("2px solid orange");

const title = $("h1")
  .text("Hello World")
  // Inline styles can be set with the same fluent API as CSS rules
  .fontSize(24)
  .color("blue");

let isToggledVisible = true;

const toggled = $("div").className("shown").text("I am visible");

// $btn returns a Button instance with special button helpers
// you could still use $("button") which returns a DomElement<"button">
const button = $btn()
  .className("btn")
  .text("Click me")
  .on("click", () => {
    isToggledVisible = !isToggledVisible;

    toggled.className(isToggledVisible ? "shown" : "hidden");
  });

body.add(title, button, toggled);

const onResize = () => {
  console.log("window has resized");
};

win.on("resize", onResize);

// on cleanup

win.off("resize", onResize);
```

## Features

- Fluent, chainable DOM manipulation.
- Wrapper classes with helper methods for HTML, SVG elements ( including body and head ) as well as document and window.
- Symmetrical styling API for both inline styles and CSS rules, with chaining.
- Separate classes for unique elements such as `<iframe>`, `<canvas>`, form inputs, `<select>`, `<textarea>`, etc.
- Stateless by design — no hidden global state is kept (beyond trivial caching and references to DOM elements), making the library simple and predictable.
- Fully written in Typescript.
