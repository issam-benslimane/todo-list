import { uniqueId } from "../helpers/utils";

const defaultState = [];
function model(todos = defaultState) {
  const getTodos = () => todos;
  const addTodo = (data) => (todos.push({ ...data, id: uniqueId() }), todos);
  const updateTodo = ({ id, ...data }) =>
    (todos = todos.map((e) => (e.id == id ? { id, ...data } : e)));
  const deleteTodo = (id) => (todos = todos.filter((e) => e.id != id));

  return { getTodos, addTodo, updateTodo, deleteTodo };
}

export default model;
