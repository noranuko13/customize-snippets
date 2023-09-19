import { Formula, FormulaOption, Property } from "../shared/issues";

{
  const option: FormulaOption = {
    key: "mcf",
    nameKey: "＊",
    calc: (numbers) => {
      return numbers.reduce((acc, cur) => acc * cur, 1);
    },
  };

  // 初期表示
  new Formula(option).execute();

  // 変更検知
  new Property().div().addEventListener("change", (event) => {
    const e = event.target as Element;

    // 計算因子が変更された場合
    const formula = new Formula(option);
    if (formula.factors().some((factor) => factor.input().isEqualNode(e))) {
      formula.execute();
    }

    // トラッカーが変更された場合
    if (new Property().tracker().select().isEqualNode(e)) {
      setTimeout(() => new Formula(option).execute(), 700);
    }
  });
}
