import { createElement } from "../helpers/utility";
import { pubSub } from "./pubsub";
import Todo from "./todo";

const Todos = (function () {
  const todos = [];

  const getTodo = (id) => todos.find((todo) => todo.id === id);

  const addTodo = (todo) => {
    todos.push(todo);
    todosView.render(todos);
  };

  const deleteTodo = (id) => {
    const idx = todos.findIndex((todo) => todo.id === id);
    todos.splice(idx, 1);
    todosView.render(todos);
  };

  const updateTodo = (id, ...details) => {
    const todo = getTodo(id);
    for (let [key, value] of details) {
      todo.update(key, value);
    }
    todosView.render(todos);
  };

  return { todos, addTodo, deleteTodo, updateTodo, getTodo };
})();

const todosView = (function () {
  const container = document.querySelector(".todos");

  const render = (todos) => {
    container.innerHTML = "";
    if (todos.length > 0) renderList(todos);
    else renderEmptyList();
  };

  const renderList = (list) => {
    const ul = createElement("ul", { class: "todos__list" });
    for (const item of list) {
      ul.appendChild(item.view);
    }
    container.appendChild(ul);
  };

  const renderEmptyList = () => {};

  return { render };
})();

const todosController = (function () {
  pubSub.subscribe("addTodo", (details) => {
    console.log("here");
    const todo = Todo(details);
    Todos.addTodo(todo);
  });
})();

export default Todos;
