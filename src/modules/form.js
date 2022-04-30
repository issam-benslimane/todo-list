import { transitionEnded } from "../helpers/utility";
import { pubSub } from "./pubsub";

const Form = function (form) {
  function getFormData() {
    const title = this.querySelector(".create-todo__title").value;
    const desc = this.querySelector(".create-todo__desc").value;
    const date = this.querySelector('input[type="date"]').value;
    const priority = this.querySelector('input[type="radio"]:checked').value;
    const project = this.querySelector("select").value;

    return { title, desc, date, priority, project };
  }

  return { showForm, hideForm };
};

const createForm = Form(document.querySelector(".form--create"));
const editForm = Form(document.querySelector(".form--edit"));

// const createForm = document.querySelector(".form--create");
// const editForm = document.querySelector(".form--edit");
// const showBtn = document.querySelector(".add");
// const closeBtn = document.querySelector(".close-btn");
// const backdrop = document.querySelector(".backdrop");
// const initListeners = () => {
//   createForm.addEventListener("submit", handleCreateForm);
//   editForm.addEventListener("submit", handleEditForm);
//   showBtn.addEventListener("click", showForm);
//   closeBtn.addEventListener("click", hideForm);
// };
// // initListeners();
// const showForm = () => {
//   form.removeAttribute("hidden");
//   form.classList.add("popup--show");
//   backdrop.classList.add("backdrop--active");
// };

// const hideForm = async () => {
//   form.classList.remove("popup--show");
//   backdrop.classList.remove("backdrop--active");
//   await transitionEnded(form);
//   form.setAttribute("hidden", "");
// };

function handleCreateForm(ev) {
  ev.preventDefault();
  pubSub.publish("addTodo", getFormData.call(this));
  formController.hideForm(this);
  this.reset();
}

function handleEditForm() {}

export default formController;
