const taskService = require("../services/taskService.js");

function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

function getRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", () => {
      resolve(body ? JSON.parse(body) : {});
    });
  });
}

const createTask = async (req, res) => {
  const body = await getRequestBody(req);
  const task = taskService.addTask(body.title);
  res.statusCode = 201;
  res.end(JSON.stringify(task));
}

const listTasks = (req, res) => {
  const tasks = taskService.getTasks();
  res.statusCode = 200;
  res.end(JSON.stringify(tasks));
}

// Atualizar tarefa
const updateTask = async (req, res, id) => {
  const body = await getRequestBody(req);
  const task = taskService.updateTask(id, body);
  if (!task) {
    res.statusCode = 404;
    return res.end(JSON.stringify({ message: "Não encontrada" }));
  }
  res.end(JSON.stringify(task));
};

const deleteTask = (req, res, id) => {
  const success = taskService.deleteTask(id);
  if (!success) {
    res.statusCode = 404;
    return res.end(JSON.stringify({ message: 'Não encontrada' }
    ));
  }
  res.end(JSON.stringify({ message: 'Tarefa apagada com sucesso' }));
};

module.exports = {
  createTask,
  listTasks,
  updateTask,
  deleteTask
};