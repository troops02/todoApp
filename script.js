'use strict';

const todoInput = document.getElementById('todo-input-field');
const todoInputAdd = document.querySelector('.todo-input-add');
const todoListSection = document.querySelector('.todo-list');
const taskItemAdd = document.querySelector('.task-item-add');

// Data being pushed;
const todoListData = [];

const createTodoElement = function (value) {
  const html = `<div class="todo-items">
      <div class="todo-items-task">
        <p>${value}</p>
      </div>
      <div class="todo-showcase">
        <div>
          <p class="todo-time">1s ago</p>
        </div>
        <div>
          <button class="task-item-edit">Edit</button>
          <button class="task-item-delete">Delete</button>
        </div>
      </div>
    </div>`;
  todoListSection.insertAdjacentHTML('beforeend', html);

  // Add the new todo item into the DOM
  todoInput.value = '';
};

todoInputAdd.addEventListener('click', function () {
  const todoInputValue = todoInput.value.trim();

  if (!todoInputValue) {
    alert('Add Todo');
    return;
  }

  createTodoElement(todoInputValue);
  todoListData.push(todoInputValue);
  console.log(todoListData);
});

todoListSection.addEventListener('click', function (e) {
  if (e.target.classList.contains('task-item-delete')) {
    const todoItem = e.target.closest('.todo-items');
    if (!todoItem) return;
    e.currentTarget.removeChild(todoItem);
  }
});
