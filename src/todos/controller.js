import model from "./model";
import todoView from "./todoView";
import formView from "./formView";
import { curry, pipe, trace } from "../helpers/fp-helpers";
import { getAttr, getParent } from "../helpers/dom";

const defaultData = [
  {
    id: 1,
    title: "gym",
    date: "Apr 18",
  },
];

function controller(model, view) {
  const { todoView, formView } = view;
  function init() {
    todoView.render(model.getTodos());
    todoView.bind("delegate", handleTodo);
    todoView.bind("add", formView.showForm);
    formView.bind("form", addTodo);
    formView.bind("close");
  }

  function handleTodo(target) {
    const action = getAttr("data-action", target);
    if (action === "edit") editTodo(target);
    if (action === "delete") deleteTodo(target);
    if (action === "details") showTodoDetails();
  }

  const addTodo = pipe(model.addTodo, todoView.render);

  const deleteTodo = pipe(
    getParent,
    curry(getAttr)("data-id"),
    model.deleteTodo,
    todoView.render
  );

  const editTodo = 0;

  init();
}

export default controller(model(defaultData), {
  todoView: todoView(),
  formView: formView(),
});
