export class IntAttr {
  private readonly _p: HTMLParagraphElement;

  constructor(p: HTMLParagraphElement) {
    this._p = p;
  }

  p(): HTMLParagraphElement {
    return this._p;
  }

  name(): string {
    const span =
      this._p.querySelector<HTMLSpanElement>("label span.field-description") ||
      this._p.querySelector<HTMLSpanElement>("label span");

    const name = span?.textContent || "";
    if (name === "") {
      console.warn("属性名が取得できませんでした", this._p);
    }
    return name;
  }

  input(): HTMLInputElement {
    return this._p.querySelector<HTMLInputElement>("input")!;
  }
}
