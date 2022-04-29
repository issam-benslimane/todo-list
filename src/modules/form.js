import { transitionEnded } from "../helpers/utility";
import { pubSub } from "./pubsub";

const formController = (function () {
  const form = document.querySelector("form");
  const showBtn = document.querySelector(".add");
  const closeBtn = document.querySelector(".close-btn");
  const backdrop = document.querySelector(".backdrop");

  const showForm = () => {
    form.removeAttribute("hidden");
    form.classList.add("create-todo--show");
    backdrop.classList.add("backdrop--active");
  };

  const hideForm = async () => {
    form.classList.remove("create-todo--show");
    backdrop.classList.remove("backdrop--active");
    await transitionEnded(form);
    form.setAttribute("hidden", "");
  };

  const initListeners = () => {
    form.addEventListener("submit", handleForm);
    showBtn.addEventListener("click", showForm);
    closeBtn.addEventListener("click", hideForm);
  };
  initListeners();

  return { showForm, hideForm };
})();

function handleForm(ev) {
  ev.preventDefault();
  pubSub.publish("addTodo", getFormData.call(this));
  formController.hideForm();
  this.reset();
}

function getFormData() {
  const title = this.querySelector(".create-todo__title").value;
  const desc = this.querySelector(".create-todo__desc").value;
  const date = this.querySelector('input[type="date"]').value;
  const priority = this.querySelector('input[type="radio"]:checked').value;
  const project = this.querySelector("select").value;

  return { title, desc, date, priority, project };
}

export default formController;
