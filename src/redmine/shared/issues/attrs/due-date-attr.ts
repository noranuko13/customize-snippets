export class DueDateAttr {
  private readonly _p: HTMLParagraphElement;

  constructor(div: HTMLDivElement) {
    this._p = div.querySelector<HTMLParagraphElement>("p:has(> #issue_due_date)")!;
  }

  p(): HTMLParagraphElement {
    return this._p;
  }

  input(): HTMLInputElement {
    return this._p.querySelector<HTMLInputElement>("input")!;
  }
}
