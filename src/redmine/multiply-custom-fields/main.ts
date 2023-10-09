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
      const e = event.target as Element;
      const formula = new Formula(option);
      if (formula.factors().some((factor) => factor.input().id === e.id)) {
        formula.execute();
      }
      const property = new Property();
      if (property.tracker().select().id === e.id || property.status().select().id === e.id) {
        setTimeout(() => new Formula(option).execute(), 700);
      }
    });
  }
}
