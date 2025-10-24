export class MediaRule {
  constructor(rule: CSSMediaRule) {
    this._rule = rule;
    this.cssMap = new Map<string, number>();
  }

  protected _rule;
  protected cssMap;

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
