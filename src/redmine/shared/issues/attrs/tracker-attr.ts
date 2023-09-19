import { Attr } from "./attr";

export class TrackerAttr implements Attr {
  readonly p: HTMLParagraphElement;

  constructor(p: HTMLParagraphElement) {
    this.p = p;
  }

  select(): HTMLSelectElement {
    return this.p.querySelector<HTMLSelectElement>("select")!;
  }
}
