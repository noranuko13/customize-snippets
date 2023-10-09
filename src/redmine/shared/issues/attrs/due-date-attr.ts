import { WarnNoTargetError } from "../../errors";
import { IAttr } from "./i-attr";

export class DueDateAttr implements IAttr {
  private readonly _p: HTMLParagraphElement;

  constructor(div: HTMLDivElement) {
    const p = div.querySelector<HTMLParagraphElement>("p:has(> #issue_due_date)");
    if (!p) {
      throw new WarnNoTargetError("期日が設定されていません", div);
    }
    this._p = p;
  }

  p(): HTMLParagraphElement {
    return this._p;
  }

  input(): HTMLInputElement {
    return this._p.querySelector<HTMLInputElement>("input")!;
  }
}
