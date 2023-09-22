import { flashBg } from "../shared/animates";
import { Property } from "../shared/issues";
import { isIssueNew, isIssueShow } from "../shared/routes";
import { isDate } from "../shared/sanitizers";
import { ScriptQuery } from "./script-query";

{
  const query = new ScriptQuery();
  const execute = () => {
    const dueDateStr = () => {
      const value = new Property().dueDate().input().value;
      if (!isDate(value)) {
        return "-";
      }
      const weekSec = 7 * 1000 * 60 * 60 * 24;
      const dueDate = new Date(Date.parse(value) + weekSec * query.week());
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

  if (isIssueShow() || isIssueNew()) {
    execute();
    new Property().div().addEventListener("change", (event) => {
      const e = event.target as Node;
      if (new Property().dueDate().input().isEqualNode(e)) {
        execute();
      }
      if (new Property().tracker().select().isEqualNode(e)) {
        setTimeout(() => execute(), 700);
      }
    });
  }
}
