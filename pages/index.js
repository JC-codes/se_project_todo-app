import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";

import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const { name, date } = inputValues;
    let todoDate = "";
    if (date) {
      const dateObj = new Date(date);
      dateObj.setMinutes(dateObj.getMinutes() + dateObj.getTimezoneOffset());
      todoDate = dateObj.toISOString();
    }

    const id = uuidv4();

    const values = { id, name, date: todoDate };
    section.items.push(values);
    const todo = generateTodo(values);
    todosList.append(todo);
    todoCounter.updateTotal(true);
    addTodoPopup.close();
  },
});

addTodoPopup.setEventListeners();

function handleTodoCheck() {
  const checkboxes = document.querySelectorAll(".todo__completed");
  const completedCount = Array.from(checkboxes).filter(
    (checkbox) => checkbox.checked
  ).length;
  todoCounter.updateCompleted(completedCount);
}

function handleTodoDelete() {
  todoCounter.updateTotal(false);
}

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = new Todo(
      item,
      "#todo-template",
      handleTodoCheck,
      handleTodoDelete
    );
    return todo.getView();
  },
  containerSelector: ".todos__list",
});

section.renderItems();

const generateTodo = (data) => {
  const todo = new Todo(
    data,
    "#todo-template",
    handleTodoCheck,
    handleTodoDelete
  );
  const todoElement = todo.getView();
  return todoElement;
};

addTodoButton.addEventListener("click", () => {
  addTodoForm.reset();
  newTodoValidator.resetValidation();
  addTodoPopup.open();
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
