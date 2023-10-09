import { Formula, FormulaOption, Property } from "../shared/issues";
import { handler, wait } from "../shared/processes";
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
    window.addEventListener("load", () => {
      handler(() => {
        new Formula(option).execute();
      });
    });
    new Property().div().addEventListener("change", async (event) => {
      await wait(400);
      handler(() => {
        const e = event.target as Element;
        const property = new Property();
        const formula = new Formula(option);
        if (
          formula.factors().some((factor) => factor.input().id === e.id) ||
          property.tracker().select().id === e.id ||
          property.status().select().id === e.id
        ) {
          formula.execute();
        }
      });
    });
  }
}
