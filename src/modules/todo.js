import { createElement, randomId } from "../helpers/utility";
import format from "date-fns/format";

const Todo = function (details) {
  const todo = { ...details, id: randomId() };

  const update = (key, value) => (todo[key] = value);

  const view = todoView(todo);

  return { todo, view, update };
};

const todoView = function (todo) {
  const { title, id, priority, date } = todo;
  const li = createElement("li", { class: "todo" });
  const input = createElement("input", {
    class: "todo__checkbox",
    type: "checkbox",
  });
  const text = createElement("p", { class: "todo__text", text: title });
  const time = createElement("time", {
    class: "todo__time",
    datetime: date,
    text: format(new Date(date), "MMM do"),
  });
  const detailsBtn = createElement("button", {
    class: "btn todo__btn",
    text: "details",
  });
  const editBtn = createElement("button", { class: "todo__icon" });
  const editIcon = createElement("i", { class: "fa-solid fa-pen-to-square" });
  const deleteBtn = createElement("button", { class: "todo__icon" });
  const deleteIcon = createElement("i", { class: "fa-solid fa-trash-can" });

  editBtn.append(editIcon);
  deleteBtn.append(deleteIcon);
  li.append(input, text, detailsBtn, time, editBtn, deleteBtn);
  li.dataset.id = id;
  li.style.setProperty("--priority-clr", getPriorityClr(priority));

  return li;
};

function getPriorityClr(key) {
  return {
    low: "green",
    medium: "orange",
    high: "red",
  }[key];
}

export default Todo;
