import { Attr } from "./attr";

export class TrackerAttr implements Attr {
  readonly p: HTMLParagraphElement;

  constructor(p: HTMLParagraphElement) {
    this.p = p;
  }

  select(): HTMLSelectElement {
    const select = this.p.querySelector<HTMLSelectElement>("select");
    if (!select) {
      console.error("セレクト要素が取得できませんでした", this.p);
      throw new ReferenceError();
    }
    return select;
  }
}
