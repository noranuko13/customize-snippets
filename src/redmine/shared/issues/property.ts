import { WarnNoTargetError } from "../errors";
import { DueDateAttr, IntAttr, StatusAttr, TrackerAttr } from "./attrs";

export class Property {
  private readonly _div: HTMLDivElement;

  constructor() {
    const div = document.querySelector<HTMLDivElement>("div#all_attributes");
    if (!div) {
      throw new WarnNoTargetError("チケットの編集画面ではありません", document);
    }
    this._div = div;
  }

  div(): HTMLDivElement {
    return this._div;
  }

  tracker(): TrackerAttr {
    return new TrackerAttr(this._div);
  }

  status() {
    return new StatusAttr(this._div);
  }

  dueDate(): DueDateAttr {
    return new DueDateAttr(this._div);
  }

  intCustomFields(): IntAttr[] {
    const ps = this._div.querySelectorAll<HTMLParagraphElement>("p:has(> .int_cf)");
    return Array.from(ps).map((customField) => new IntAttr(customField));
  }
}
