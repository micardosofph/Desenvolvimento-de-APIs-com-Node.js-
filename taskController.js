const service = require("./taskService");

function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

function getBody(req) {
  return new Promise((resolve) => {
    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {
      resolve(body ? JSON.parse(body) : {});
    });
  });
}

async function handleGetTasks(req, res) {
  sendJSON(res, 200, service.getAllTasks());
}

async function handlePostTask(req, res) {
  const body = await getBody(req);

  if (!body.title) {
    return sendJSON(res, 400, { message: "Título obrigatório" });
  }

  const task = service.addTask(body.title);
  sendJSON(res, 201, task);
}

async function handlePutTask(req, res, id) {
  const body = await getBody(req);
  const task = service.updateTask(id, body);

  if (!task) {
    return sendJSON(res, 404, { message: "Tarefa não encontrada" });
  }

  sendJSON(res, 200, task);
}

async function handleDeleteTask(req, res, id) {
  const ok = service.deleteTask(id);

  if (!ok) {
    return sendJSON(res, 404, { message: "Tarefa não encontrada" });
  }

  sendJSON(res, 200, { message: "Removida" });
}

module.exports = {
  handleGetTasks,
  handlePostTask,
  handlePutTask,
  handleDeleteTask
};