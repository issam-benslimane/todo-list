const Projects = (function () {
  const projects = [];

  const getProject = (id) => projects.find((p) => p.id === id);

  const addProject = (project) => {
    projects.push(project);
    ProjectsView.render(projects);
  };

  const deleteProject = (id) => {
    const idx = projects.findIndex((p) => p.id === id);
    projects.splice(idx, 1);
    ProjectsView.render(projects);
  };

  const updateProject = (id, title) => {
    const project = getTodo(id);
    project.title = title;
    ProjectsView.render(projects);
  };

  return { projects, addProject, deleteProject, updateProject, getProject };
})();

const ProjectsView = (function () {
  const container = document.querySelector(".projects");

  const render = (projects) => {
    container.innerHTML = "";
    if (projects.length > 0) renderList(projects);
    else renderEmptyList();
  };

  const renderList = (list) => {
    const ul = createElement("ul", { class: "projects__list" });
    for (const item of list) {
      ul.appendChild(item.view);
    }
    container.appendChild(ul);
  };

  const renderEmptyList = () => {};

  return { render };
})();

export default Projects;
