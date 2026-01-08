# @neptune3d/dom

Helper classes and functions for fluent DOM manipulation, styling, and event handling.

[![NPM Version](https://img.shields.io/npm/v/%40neptune3d%2Fdom)](https://www.npmjs.com/package/@neptune3d/dom)

```bash
npm install @neptune3d/dom
```

> ⚠️ While this library's API is mostly stable, some parts may still change without warning.

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

head.add(style);

const sheet = $sheet(style);

sheet.cssRule(".shown").display("block");

sheet.cssRule(".hidden").display("none");

const title = $("h1").text("Hello World").fontSize(24).color("blue");

let isToggledVisible = true;

const toggled = $("div").className("shown").text("I am visible");

const button = $btn()
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
- Symmetrical styling API for both inline styles and css with chaining.
- Separate class for unique elements like iframe, canvas, form input, select, text area ..etc elements.
- Fully written in Typescript.
