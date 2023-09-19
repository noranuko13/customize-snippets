import { DueDateAttr, IntAttr, TrackerAttr } from "./attrs";

export class Property {
  static boxInner() {
    return document.querySelector<HTMLDivElement>("div#all_attributes")!;
  }

  static tracker(): TrackerAttr {
    const p = this.boxInner().querySelector<HTMLParagraphElement>("p:has(#issue_tracker_id)");
    return new TrackerAttr(p!);
  }

  static dueDate(): DueDateAttr {
    const p = this.boxInner().querySelector<HTMLParagraphElement>("p:has(#issue_due_date)");
    return new DueDateAttr(p!);
  }

  static intCustomFields(): IntAttr[] {
    const ps = this.boxInner().querySelectorAll<HTMLParagraphElement>("p:has(.int_cf)");
    return Array.from(ps).map((customField) => new IntAttr(customField));
  }
}
