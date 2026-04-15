const { createTask } = require("../models/taskModel.js");

let tasks = [];
let idCounter = 1;

function addTask(title) {
  const task = createTask(idCounter++, title);
  tasks.push(task);
  return task;
}

const getTasks = () => tasks;

function updateTask(id, title) {
  const task = tasks.find(t => t.id === id);
  if (!task) return null;

  task.title = title;
  return task;
}

function deleteTask(id) {
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return false;

  tasks.splice(index, 1);
  return true;
}

module.exports = {
  addTask,
  getTasks,
  updateTask,
  deleteTask
};