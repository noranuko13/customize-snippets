import { IAttr } from "./i-attr";

export class TrackerAttr implements IAttr {
  private readonly _p: HTMLParagraphElement;

  constructor(div: HTMLDivElement) {
    this._p = div.querySelector<HTMLParagraphElement>("p:has(> #issue_tracker_id)")!;
  }

  select(): HTMLSelectElement {
    return this._p.querySelector<HTMLSelectElement>("select")!;
  }
}
