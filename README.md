# neptune3d/dom

Helper classes and functions for the DOM.

## 🚀 Getting Started

Install the package:

```bash
npm install neptune3d/dom
```

Import and create elements:

```ts
import { $, $body } from "neptune3d/dom";

const div = $("div")
  .text("Hello world")
  .css("", { padding: "1rem", background: "#eee" })
  .on("click", () => console.log("Clicked!"));

const body = $body();

body.append(div.dom);
```

Use SVG elements:

```ts
const circle = $("circle")
  .attr("cx", "50")
  .attr("cy", "50")
  .attr("r", "40")
  .attr("fill", "red");

const svg = $("svg").attr("width", "100").attr("height", "100").add(circle);

body.append(svg.dom);
```

Define global styles:

```ts
import { StyleSheet } from "neptune3d/dom";

StyleSheet.getSheet().globalCss(".list-item", {
  padding: "0.5rem",
  borderBottom: "1px solid #ccc",
});
```

## 📦 Features

- Chainable DOM manipulation
- Scoped and global CSS rule injection
- Media query support
- Event listener helpers
