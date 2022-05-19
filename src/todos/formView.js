import {
  addClass,
  on,
  qs,
  qsa,
  removeChildren,
  removeClass,
} from "../helpers/dom";
import {
  curry,
  flatMap,
  pipe,
  reduce,
  reverseArgs,
} from "../helpers/fp-helpers";

const form = qs("form");
const backdrop = qs(".backdrop");
const closeBtn = qs(".close-btn", form);
const fields = ["input", "select", "textarea"];

const showForm = () => {
  addClass(form, "popup--show");
  addClass(backdrop, "backdrop--active");
};

const hideForm = () => {
  removeClass(form, "popup--show");
  removeClass(backdrop, "backdrop--active");
};

const getFormData = (form) =>
  pipe(
    flatMap(pipe(curry(reverseArgs(qsa), 2)(form), Array.from)),
    reduce((obj, field) => ((obj[field.name] = field.value), obj))({})
  )(fields);

function handleForm(action, ev) {
  ev.preventDefault();
  action(getFormData(this));
  hideForm();
  this.reset();
}

const bind = (type, handler) => {
  if (type === "form") {
    on(form, "submit", handleForm.bind(form, handler));
  }
  if (type === "close") {
    on(closeBtn, "click", hideForm);
  }
};

export default function view() {
  return { showForm, hideForm, bind };
}
