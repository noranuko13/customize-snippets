export class StatusAttr {
  private readonly _p: HTMLParagraphElement;

  constructor(div: HTMLDivElement) {
    this._p = div.querySelector<HTMLParagraphElement>("p:has(> #issue_status_id)")!;
  }

  select(): HTMLSelectElement {
    return this._p.querySelector<HTMLSelectElement>("select")!;
  }
}
