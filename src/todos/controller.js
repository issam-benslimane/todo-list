import model from "./model";
import todoView from "./todoView";
import formView from "./formView";
import { curry, partial, pipe } from "../helpers/fp-helpers";
import { getAttr, getParent } from "../helpers/dom";
import dummyData from "./dummy-data.json";

function controller(model, view) {
  const { todoView, formView } = view;

  function init() {
    todoView.render(model.getTodos());
    todoView.bind("delegate", handleTodo);
    todoView.bind("add", curry(formView.showForm, 2)("add"));
    formView.bind("form", handleForm);
    formView.bind("close");
  }

  function handleForm(type, data) {
    type === "add"
      ? pipe(model.addTodo, todoView.render)(data)
      : pipe(curry(model.updateTodo)(handleForm.id), todoView.render)(data);
  }

  function handleTodo(target) {
    const action = getAttr("data-action", target);
    if (action === "edit") editTodo(target);
    if (action === "delete") deleteTodo(target);
    if (action === "details") showTodoDetails();
  }

  const deleteTodo = pipe(
    getParent,
    curry(getAttr)("data-id"),
    model.deleteTodo,
    todoView.render
  );

  const editTodo = (target) => {
    const id = pipe(getParent, curry(getAttr)("data-id"))(target);
    handleForm.id = id;
    pipe(model.getTodo, formView.editForm)(id);
    formView.showForm("edit");
  };

  init();
}

export default controller(model(dummyData), {
  todoView: todoView(),
  formView: formView(),
});
