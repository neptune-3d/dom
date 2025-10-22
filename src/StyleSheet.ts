export class StyleSheet {
  constructor(el: HTMLStyleElement) {
    this._dom = el;
  }

  protected _dom;

  get dom() {
    return this._dom;
  }

  get sheet() {
    return this.dom.sheet!;
  }

  get length() {
    return this.sheet.cssRules.length;
  }

  insert(index: number, rule: string) {
    return this.sheet.insertRule(rule, index);
  }

  delete(index: number) {
    this.sheet.deleteRule(index);
  }

  static getSheet() {
    const res = document.head.querySelector(`#${StyleSheet.ID}`);

    if (res == null) {
      const style = document.createElement("style");
      style.id = StyleSheet.ID;
      style.setAttribute("type", "text/css");
      document.head.append(style);
      return new StyleSheet(style);
    }
    //
    else {
      return new StyleSheet(res as HTMLStyleElement);
    }
  }

  static ID = "__neptune__";
}
