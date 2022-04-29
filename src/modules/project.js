import { createElement, randomId } from "../helpers/utility";

const Project = function (title) {
  const project = { title, id: randomId(), todos: [] };

  const addTodo = (todo) => project.todos.push(todo);

  const view = projectView(project);

  return { project, addTodo };
};

const projectView = function ({ title, id }) {
  const li = createElement("li");
  const project = createElement("btn", { class: "btn", text: title });

  li.dataset.id = id;
  li.appendChild(project);

  return li;
};

export default Project;
