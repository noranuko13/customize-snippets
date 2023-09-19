import { Attr } from "./attr";

export class DueDateAttr implements Attr {
  readonly p: HTMLParagraphElement;

  constructor(p: HTMLParagraphElement) {
    this.p = p;
  }

  input(): HTMLInputElement {
    return this.p.querySelector<HTMLInputElement>("input")!;
  }
}
