import { uniqueId } from "../helpers/utils";

function model(projects) {
  const getProjects = () => projects;
  const getProject = (id) => projects.find((e) => e.id == id);
  const addProject = (data) => (
    projects.push({ id: uniqueId(), ...data }), projects
  );
  const updateProject = (id, data) =>
    (projects = projects.map((e) => (e.id == id ? { id, ...data } : e)));
  const deleteProject = (id) => (projects = projects.filter((e) => e.id != id));

  return { getProjects, addProject, updateProject, deleteProject, getProject };
}

export default model;
