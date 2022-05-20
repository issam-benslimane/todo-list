import {
  addClass,
  deleteAttr,
  getAttr,
  on,
  qs,
  qsa,
  removeClass,
  setAttr,
  setDOMElement,
} from "../helpers/dom";
import {
  curry,
  each,
  filterIn,
  flatMap,
  pipe,
  reduce,
  reverseArgs,
} from "../helpers/fp-helpers";

const form = qs("form");
const heading = qs("h2", form);
const submitBtn = qs('[type = "submit"]', form);
const backdrop = qs(".backdrop");
const closeBtn = qs(".close-btn", form);
const fields = Object.freeze(["input", "select", "textarea"]);

const changeFormView = (type) => {
  setAttr(form, "data-form", type);
  if (type === "add") {
    setDOMElement(heading, "add todo...");
    setDOMElement(submitBtn, "add todo");
  } else {
    setDOMElement(heading, "edit todo...");
    setDOMElement(submitBtn, "edit todo");
  }
};

const showForm = (type) => {
  changeFormView(type);
  addClass(form, "popup--show");
  addClass(backdrop, "backdrop--active");
};

const hideForm = () => {
  removeClass(form, "popup--show");
  removeClass(backdrop, "backdrop--active");
  resetForm();
};

function editForm(data) {
  pipe(
    flatMap(pipe(curry(reverseArgs(qsa), 2)(form), Array.from)),
    each(curry(fillField)(data))
  )(fields);
}

const getFormData = (form) =>
  pipe(
    flatMap(pipe(curry(reverseArgs(qsa), 2)(form), Array.from)),
    filterIn(getProperInputValue),
    reduce((obj, field) => ((obj[field.name] = field.value), obj))({})
  )(fields);

function fillField(data, field) {
  const tag = field.tagName.toLowerCase();
  const val = data[field.name];
  if (tag === "textarea") field.textContent = val;
  if (tag === "select") field.value = val;
  if (tag === "input") {
    switch (field.type) {
      case "radio":
        val === field.value
          ? field.setAttribute("checked", "")
          : deleteAttr(field, "checked");
        break;

      default:
        field.value = val;
        break;
    }
  }
}

function getProperInputValue(field) {
  if (field.tagName === "INPUT") {
    if (field.type === "radio") return field.checked;
  }
  return true;
}

function handleForm(action, ev) {
  ev.preventDefault();
  action(getAttr("data-form", this), getFormData(this));
  hideForm();
}

function resetForm() {
  form.reset();
  pipe(
    curry(reverseArgs(qsa), 2)(form),
    each(curry(reverseArgs(setDOMElement), 2)(""))
  )("textarea");
  pipe(
    curry(reverseArgs(qsa), 2)(form),
    each((f) =>
      f.value === "low" ? setAttr(f, "checked", "") : deleteAttr(f, "checked")
    )
  )('[type="radio"]');
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
  return { showForm, hideForm, editForm, bind };
}
