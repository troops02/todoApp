'use strict';

const todoInput = document.getElementById('todo-input-field');
const todoInputAdd = document.querySelector('.todo-input-add');
const todoListSection = document.querySelector('.todo-list');
const taskItemAdd = document.querySelector('.task-item-add');
const overlayEl = document.querySelector('.overlay');
const editTaskBtn = document.querySelector('.change-task');
const editInput = document.querySelector('#edit-input-field');
const textFieldCon = document.querySelector('.text-field');

const todoListData = [];
let taskId = 0;

const createTodoElement = function (value) {
  const input = value.replace(value[0], value[0].toUpperCase());
  const html = `<div class="todo-items" data-id='${taskId}'>
      <div class="todo-items-task">
        <p>${input}</p>
      </div>
      <div class="todo-showcase">
        <div>
          <button class="task-item-edit">Edit</button>
          <button class="task-item-delete">Delete</button>
        </div>
      </div>
    </div>`;
  todoListSection.insertAdjacentHTML('beforeend', html);

  todoInput.value = '';
};

todoInputAdd.addEventListener('click', function () {
  const todoInputValue = todoInput.value.trim();

  if (!todoInputValue) {
    alert('Add Todo');
    return;
  }
  taskId++;
  createTodoElement(todoInputValue);
  todoListData.push(todoInputValue);
  console.log(todoListData);
});

const toggleOverlay = () => {
  overlayEl.classList.toggle('hidden');
  textFieldCon.classList.toggle('hidden');
};

todoListSection.addEventListener('click', function (e) {
  if (e.target.classList.contains('task-item-delete')) {
    const todoItem = e.target.closest('.todo-items');
    if (!todoItem) return;
    e.currentTarget.removeChild(todoItem);
  }

  if (e.target.classList.contains('task-item-edit')) {
    const todoItem = e.target.closest('.todo-items');
    if (!todoItem) return;

    toggleOverlay();

    const taskTextEl = todoItem.querySelector('.todo-items-task p');
    if (!taskTextEl) return;

    if (taskTextEl && editInput) {
      editInput.value = taskTextEl.textContent;
      editInput.dataset.editingId = todoItem.dataset.id || '';
    }
  }
});

editTaskBtn.addEventListener('click', function () {
  const newText = editInput.value.trim();
  console.log(newText);
  if (!newText) {
    alert('Eidit task');
    return;
  }

  const editingId = editInput.dataset.editingId;
  if (editingId) {
    const todoItem = document.querySelector(
      `.todo-items[data-id="${editingId}"]`
    );
    const taskTextEl = todoItem?.querySelector('.todo-items-task p');
    if (taskTextEl) {
      taskTextEl.textContent = newText;
    }
  }

  toggleOverlay();
});
