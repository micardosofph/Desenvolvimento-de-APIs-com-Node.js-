const fs = require('fs');
const path = require('path');
const { createTask } = require("../models/taskModel.js");

// Define o caminho onde o arquivo JSON será salvo (na raiz do projeto)
const FILE_PATH = path.join(__dirname, '../tasks.json');

// Função auxiliar para ler as tarefas do arquivo
function loadTasks() {
  try {
    // Se o arquivo não existir, cria um arquivo com um array vazio
    if (!fs.existsSync(FILE_PATH)) {
      fs.writeFileSync(FILE_PATH, JSON.stringify([]));
    }
    const data = fs.readFileSync(FILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Erro ao ler o arquivo de tarefas:", error);
    return [];
  }
}

// Função auxiliar para salvar as tarefas no arquivo
function saveTasks(tasks) {
  // O JSON.stringify com (tasks, null, 2) deixa o arquivo formatado e bonito
  fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2));
}

function addTask(title) {
  const tasks = loadTasks();
  
  // Descobre qual é o próximo ID baseado no maior ID existente
  const nextId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
  
  const task = createTask(nextId, title);
  tasks.push(task);
  
  saveTasks(tasks); // Salva no arquivo
  return task;
}

const getTasks = () => loadTasks();

function updateTask(id, data) {
  const tasks = loadTasks();
  const task = tasks.find(t => t.id === id);
  
  if (!task) return null;

  // Se o usuário mandou um novo título, atualiza
  if (data.title !== undefined) {
    task.title = data.title;
  }
  
  // Se o usuário mandou um novo status de completed (true ou false), atualiza
  if (data.completed !== undefined) {
    task.completed = data.completed;
  }

  saveTasks(tasks);
  return task;
}

function deleteTask(id) {
  const tasks = loadTasks();
  const index = tasks.findIndex(t => t.id === id);
  
  if (index === -1) return false;

  tasks.splice(index, 1);
  saveTasks(tasks); // Salva a remoção no arquivo
  return true;
}

module.exports = {
  addTask,
  getTasks,
  updateTask,
  deleteTask
};