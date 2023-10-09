import { flashBg } from "../shared/animates";
import { Property } from "../shared/issues";
import { handler, wait } from "../shared/processes";
import { isIssueNew, isIssueShow } from "../shared/routes";
import { isDate } from "../shared/sanitizers";
import { ScriptQuery } from "./script-query";

{
  const query = new ScriptQuery();
  const execute = () => {
    const property = new Property();
    const dueDateStr = () => {
      const value = property.dueDate().input().value;
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
    property.dueDate().p().append(div);
    flashBg([property.dueDate().p()]);
  };

  if (isIssueShow() || isIssueNew()) {
    window.addEventListener("load", () => {
      handler(() => {
        execute();
      });
    });
    new Property().div().addEventListener("change", async (event) => {
      await wait(400);
      handler(() => {
        const e = event.target as Element;
        const property = new Property();
        if (
          property.dueDate().input().id === e.id ||
          property.tracker().select().id === e.id ||
          property.status().select().id === e.id
        ) {
          execute();
        }
      });
    });
  }
}
