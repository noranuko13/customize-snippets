import { Formula, FormulaOption, Property } from "../shared/issues";
import { isIssueNew, isIssueShow } from "../shared/routes";

{
  const option: FormulaOption = {
    key: "mcf",
    nameKey: "＊",
    calc: (numbers) => {
      return numbers.reduce((acc, cur) => acc * cur, 1);
    },
  };

  if (isIssueShow() || isIssueNew()) {
    new Formula(option).execute();
    new Property().div().addEventListener("change", (event) => {
      const e = event.target as Node;
      const formula = new Formula(option);
      if (formula.factors().some((factor) => factor.input().isEqualNode(e))) {
        formula.execute();
      }
      if (new Property().tracker().select().isEqualNode(e)) {
        setTimeout(() => new Formula(option).execute(), 700);
      }
    });
  }
}
