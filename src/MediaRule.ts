export class MediaRule {
  constructor(index: number, rule: CSSMediaRule) {
    this._index = index;
    this._rule = rule;
    this.cssMap = new Map<string, number>();
  }

  protected _index;
  protected _rule;
  protected cssMap;

  get index() {
    return this._index;
  }

  get rule() {
    return this._rule;
  }

  get length() {
    return this._rule.cssRules.length;
  }

  getCssRule(selector: string) {
    let index = this.cssMap.get(selector);

    if (index == null) {
      index = this._rule.insertRule(`${selector}{}`, this.length);
    }

    return this._rule.cssRules.item(index) as CSSStyleRule;
  }

  delete(index: number) {
    this._rule.deleteRule(index);
  }
}
