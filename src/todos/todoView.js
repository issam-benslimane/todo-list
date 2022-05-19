import {
  appendDOMChild,
  createElement,
  delegate,
  getAttr,
  on,
  qs,
  removeChildren,
} from "../helpers/dom";
import {
  curry,
  map,
  pipe,
  partial,
  prop,
  reverseArgs,
} from "../helpers/fp-helpers";

const todosContainer = qs(".todos");
const addTodoBtn = qs(".add");
const getClass = curry(getAttr)("class");

function render(list) {
  removeChildren(todosContainer);
  if (list.length < 1) {
    appendDOMChild(todosContainer, createEmptyListText());
  } else {
    pipe(
      map(createTodo),
      createList,
      curry(appendDOMChild)(todosContainer)
    )(list);
  }
}

function createList(children) {
  return createElement("ul", { attr: [["class", "todo__list"]], children });
}

function createEmptyListText() {
  return createElement("p", { content: "No Todos, No Work" });
}

function createTodo(data) {
  const { id, title, date } = data;
  const li = () =>
    createElement("li", {
      attr: [
        ["class", "todo"],
        ["data-id", id],
      ],
      children: [checkbox, p, detailsBtn, time, editBtn, deleteBtn],
    });
  const checkbox = () =>
    createElement("input", {
      attr: [
        ["class", "todo__checkbox"],
        ["type", "checkbox"],
      ],
    });
  const p = () =>
    createElement("p", {
      attr: [["class", "todo__title"]],
      content: title,
    });
  const detailsBtn = () =>
    createElement("button", {
      attr: [
        ["class", "btn todo__btn"],
        ["data-action", "details"],
      ],
      content: "details",
    });
  const time = () =>
    createElement("time", { attr: [["class", "todo__date"]], content: date });
  const editBtn = () =>
    createElement("button", {
      attr: [
        ["class", "todo__icon"],
        ["data-action", "edit"],
      ],
      children: [editIcon],
    });
  const editIcon = () =>
    createElement("i", { attr: [["class", "fa-solid fa-pen-to-square"]] });
  const deleteBtn = () =>
    createElement("button", {
      attr: [
        ["class", "todo__icon"],
        ["data-action", "delete"],
      ],
      children: [deleteIcon],
    });
  const deleteIcon = () =>
    createElement("i", { attr: [["class", "fa-solid fa-trash-can"]] });

  return li;
}

const getPriorityClr = curry(
  reverseArgs(prop),
  2
)({
  low: "green",
  medium: "blue",
  high: "red",
});

const bind = (type, handler) => {
  if (type === "add") {
    on(addTodoBtn, "click", handler);
  }
  if (type === "delegate") {
    delegate(todosContainer, "[data-action]", "click", handler);
  }
};

function view() {
  return { render, bind };
}

export default view;
