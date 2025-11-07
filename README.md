# neptune3d/dom

Helper classes and functions for fluent DOM manipulation, styling, and event handling.

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
const pop = $("div")
  .text("Popover content")
  .popover("manual")
  .css("", { padding: "1rem", background: "#222", color: "#fff" });

$body().add(pop);

// Show/hide programmatically
pop.showPopover();
pop.hidePopover();
```

## 🎨 Stylesheet Rules

```ts
import { StyleSheet } from "neptune3d/dom";

const sheet = StyleSheet.getSheet();

// Insert a global rule
const rule = sheet.cssRule(".list-item");
rule.p("0.5rem").style({
  borderBottom: "1px solid #ccc",
});

// Insert a media query block
const media = sheet.mediaRule("screen and (max-width: 600px)");
media.cssRule(".list-item").style({
  background: "#f0f0f0",
});
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
