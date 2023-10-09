import { flashBg } from "../../animates";
import { WarnNoTargetError } from "../../errors";
import { sanitizeWithOne } from "../../sanitizers";
import { IntAttr } from "../attrs";
import { Property } from "../property";
import { FormulaOption } from "./formula-option";

export class Formula {
  private readonly option: FormulaOption;
  private readonly intAttrs: IntAttr[];

  constructor(option: FormulaOption) {
    this.option = option;
    this.intAttrs = new Property().intCustomFields();
    this.decorate();
    this.normalize();
  }

  execute() {
    const numbers = this.factors().map((factor) => Number(factor.input().value));
    this.result().input().value = this.option.calc(numbers).toString();
    flashBg(this.targets().map((target) => target.p()));
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
    if (intAttrs.length === 0) {
      throw new WarnNoTargetError(`［${this.option.nameKey}］が設定されていません`, intAttrs);
    }
    if (intAttrs.length !== 1) {
      throw new WarnNoTargetError(`［${this.option.nameKey}］が複数設定されています`, intAttrs);
    }
    return intAttrs[0];
  }

  private targets(): IntAttr[] {
    return [...this.factors(), this.result()];
  }

  private decorate() {
    this.targets().forEach((target) => {
      target.p().classList.add(`cs-${this.option.key}-target`);
    });
    this.result().input().readOnly = true;
    this.result().input().classList.add(`cs-${this.option.key}-effect`);
  }

  private normalize() {
    const inputs = this.factors().map((cause) => cause.input());
    sanitizeWithOne(inputs);
  }
}
