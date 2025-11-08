# neptune3d/dom

Helper classes and functions for fluent DOM manipulation, styling, and event handling.

[![NPM Version](https://img.shields.io/npm/v/%40neptune3d%2Fdom)](https://www.npmjs.com/package/@neptune3d/dom)

## 🚀 Getting Started

Install the package:

```bash
npm install neptune3d/dom
```

## ✨ Create Elements

```ts
import { $, $body } from "neptune3d/dom";

const div = $("div")
  .text("Hello world")
  .px("1rem")
  .bgColor("#eee")
  .title("Click me")
  .on("click", () => console.log("Clicked!"));

$body().add(div);
```

## 🖼 SVG Support

```ts
const circle = $("circle")
  .attr("cx", "50")
  .attr("cy", "50")
  .attr("r", "40")
  .attr("fill", "red");

const svg = $("svg").attr("width", "100").attr("height", "100").add(circle);

$body().add(svg);
```

## 📋 Input Helpers

```ts
import { $input } from "neptune3d/dom";

const checkbox = $input("checkbox").on("change", (e) => {
  console.log("Checked:", checkbox.getChecked());
});

$body().add(checkbox);
```

## 🎯 Popover API

```ts
const popup = $("div")
  .text("Popover content")
  .popover("manual")
  .style({ padding: "1rem", background: "#222", color: "#fff" });

$body().add(popup);

// Show/hide programmatically
popup.showPopover();
popup.hidePopover();
```

## 🎨 CSS Stylesheet

```ts
import { StyleSheet } from "neptune3d/dom";

const sheet = StyleSheet.getSheet();

// insert a css rule
const rule = sheet.cssRule(".list-item");
rule.p("0.5rem").bb("1px solid #ccc");

// insert a media rule
const media = sheet.mediaRule("screen and (max-width: 600px)");

// insert a css rule into the media rule
media.cssRule(".list-item").textAlign("center").fontSize(24);

// extend a css rule
rule.extend("> div.child").opacity(0.6);

// predefined extensions for common pseudo selectors / elements

rule.hover().bgColor("red");

rule.focus().outline("1px dashed blue");
```

## 🌍 Global Event Wrappers

```ts
import { $window, $document } from "neptune3d/dom";

$window().on("resize", (e) => console.log("Window resized"));
$document().on("visibilitychange", () => console.log("Visibility changed"));
```

## 📦 Features

- Chainable DOM manipulation
- Typed input element helpers
- Popover API support
- Scoped and global CSS rule injection
- Media query management
- Window and document event wrappers
- SVG and HTML element abstraction
