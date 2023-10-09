import { WarnNoTargetError } from "../../errors";
import { IAttr } from "./i-attr";

export class TrackerAttr implements IAttr {
  private readonly _p: HTMLParagraphElement;

  constructor(div: HTMLDivElement) {
    const p = div.querySelector<HTMLParagraphElement>("p:has(> #issue_tracker_id)");
    if (!p) {
      throw new WarnNoTargetError("期日が設定されていません", div);
    }
    this._p = p;
  }

  select(): HTMLSelectElement {
    return this._p.querySelector<HTMLSelectElement>("select")!;
  }
}
