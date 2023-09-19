import { flashBg } from "../shared/animates";
import { Property } from "../shared/issues";
import { ScriptQuery } from "./script-query";

{
  const query = new ScriptQuery();
  const execute = () => {
    const dueDateStr = () => {
      const unixTimeDueDate = Date.parse(new Property().dueDate().input().value);
      const weekSec = 7 * 1000 * 60 * 60 * 24;
      const dueDate = new Date(unixTimeDueDate + weekSec * query.week());
      return dueDate.toLocaleDateString("sv-SE").replaceAll("-", "/");
    };

    const id = "csNwbdd";
    const createDiv = () => {
      const div = document.createElement("div");
      div.id = id;
      return div;
    };
    const div = document.getElementById(id) || createDiv();

    div.textContent = `${query.text()}: ${dueDateStr()}`;
    new Property().dueDate().p().append(div);
    flashBg([new Property().dueDate().p()]);
  };

  // 初期表示
  execute();

  // 変更検知
  new Property().div().addEventListener("change", (event) => {
    const e = event.target as Element;

    // 期日が変更された場合
    if (new Property().dueDate().input().isEqualNode(e)) {
      execute();
    }

    // トラッカーが変更された場合
    if (new Property().tracker().select().isEqualNode(e)) {
      setTimeout(() => execute(), 700);
    }
  });
}
