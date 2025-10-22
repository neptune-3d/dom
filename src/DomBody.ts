import { UNITLESS_CSS_PROPS } from "./constants";
import type { DomElement } from "./DomElement";
import type { CssProperties } from "./types";

export class DomBody {
  get dom() {
    return document.body as HTMLBodyElement;
  }

  style(obj: CssProperties) {
    for (const name in obj) {
      (this.dom.style as any)[name] = this.getStyleValue(
        name,
        (obj as any)[name]
      );
    }
    return this;
  }

  protected getStyleValue(name: string, value: string | number): string {
    if (typeof value === "number") {
      const isUnitless = !!UNITLESS_CSS_PROPS[name];

      return isUnitless ? String(value) : `${value}px`;
    }
    return value;
  }

  add(...nodes: DomElement<any>[]) {
    this.dom.append(...nodes.map((n) => n.dom));
    return this;
  }

  clear() {
    this.dom.innerHTML = "";
    return this;
  }
}
