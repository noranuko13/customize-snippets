import { Attr } from "./attr";

export class DueDateAttr implements Attr {
  readonly p: HTMLParagraphElement;

  constructor(p: HTMLParagraphElement) {
    this.p = p;
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
