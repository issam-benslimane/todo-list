import { uniqueId } from "../helpers/utils";

function model(todos) {
  const getTodos = () => todos;
  const getTodo = (id) => todos.find((e) => e.id == id);
  const addTodo = (data) => (
    todos.push({ completed: false, id: uniqueId(), ...data }), todos
  );
  const updateTodo = (id, data) =>
    (todos = todos.map((e) => (e.id == id ? { id, ...data } : e)));
  const deleteTodo = (id) => (todos = todos.filter((e) => e.id != id));

  return { getTodos, addTodo, updateTodo, deleteTodo, getTodo };
}

export default model;
