export class ScriptQuery {
  params: URLSearchParams;

  constructor() {
    const src = (document.currentScript as HTMLScriptElement).src;
    this.params = new URLSearchParams(new URL(src).search);
  }

  week(): number {
    const weekStr = this.params.get("week") || "2";
    if (!/^-?([1-9]\d*|0)$/.test(weekStr)) {
      console.error("指定できるのは半角数字とマイナス符号のみです");
      throw new ReferenceError();
    }
    return Number(weekStr);
  }

  text(): string {
    const textKey = this.params.get("textKey") || "staging";
    if (!["staging", "merge", "week"].includes(textKey)) {
      console.error("指定できるのは staging, merge, week のみです");
      throw new ReferenceError();
    }
    switch (textKey) {
      case "staging":
        return "ステージング目安";
      case "merge":
        return "マージ期限";
      case "week":
        return `${this.week()}週間前`;
      default:
        return "";
    }
  }
}
