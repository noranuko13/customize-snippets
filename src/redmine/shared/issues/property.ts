import { IntAttr, TrackerAttr } from "./attrs";

export class Property {
  static boxInner() {
    const div = document.querySelector<HTMLDivElement>("div#all_attributes");
    if (!div) {
      console.error("プロパティの変更のdiv要素が取得できませんでした", div);
      throw new ReferenceError();
    }
    return div;
  }

  static tracker(): TrackerAttr {
    const p = this.boxInner().querySelector<HTMLParagraphElement>(
      "p:has(#issue_tracker_id)",
    );
    if (!p) {
      console.error("段落要素が取得できませんでした", this.boxInner());
      throw new ReferenceError();
    }
    return new TrackerAttr(p);
  }

  static intCustomFields(): IntAttr[] {
    return Array.from(
      this.boxInner().querySelectorAll<HTMLParagraphElement>("p:has(.int_cf)"),
    ).map((customField) => new IntAttr(customField));
  }
}
