import { animate } from "../animates";
import { IntAttr } from "./attrs";
import { FormulaOption } from "./formula-option";
import { Property } from "./property";

export class Formula {
  private readonly option: FormulaOption;
  private readonly intAttrs: IntAttr[];

  constructor(option: FormulaOption) {
    this.option = option;
    this.intAttrs = Property.intCustomFields();
    this.decorate();
    this.normalize();
  }

  execute() {
    const numbers = this.factors().map((factor) =>
      Number(factor.input().value),
    );
    this.result().input().value = this.option.calc(numbers).toString();
    animate(this.targets().map((target) => target.p));
  }

  factors(): IntAttr[] {
    const re = new RegExp(`${this.option.nameKey}$`);
    return this.intAttrs.filter((attr) => {
      return re.test(attr.name());
    });
  }

  private result(): IntAttr {
    const re = new RegExp(`［${this.option.nameKey}］$`);
    const intAttrs = this.intAttrs.filter((intAttr) => re.test(intAttr.name()));
    if (intAttrs.length !== 1) {
      console.error(
        `［${this.option.nameKey}］が複数設定されています`,
        intAttrs,
      );
      throw new ReferenceError();
    }
    return intAttrs[0];
  }

  private targets(): IntAttr[] {
    return [...this.factors(), this.result()];
  }

  private decorate() {
    // 対象属性に装飾用クラスを付与
    this.targets().forEach((target) => {
      target.p.classList.add(`cs-${this.option.key}-target`);
    });
    // 計算結果を非活性化
    this.result().input().readOnly = true;
    this.result().input().classList.add(`cs-${this.option.key}-effect`);
  }

  private normalize() {
    this.factors().map((cause) => {
      if (!/^-?([1-9]\d*|0)$/.test(cause.input().value)) {
        cause.input().value = "0";
      }
    });
  }
}
