import { Attr } from "./attr";

export class IntAttr implements Attr {
  readonly p: HTMLParagraphElement;

  constructor(p: HTMLParagraphElement) {
    this.p = p;
  }

  name(): string {
    // 必須・任意で構造に違いあり
    const span =
      this.p.querySelector<HTMLSpanElement>("label span.field-description") ||
      this.p.querySelector<HTMLSpanElement>("label span");

    const name = span?.textContent || "";
    if (name === "") {
      console.warn("属性名が取得できませんでした", this.p);
    }
    return name;
  }

  input(): HTMLInputElement {
    const input = this.p.querySelector<HTMLInputElement>("input");
    if (!input) {
      console.error("インプット要素が取得できませんでした", this.p);
      throw new ReferenceError();
    }
    return input;
  }
}
