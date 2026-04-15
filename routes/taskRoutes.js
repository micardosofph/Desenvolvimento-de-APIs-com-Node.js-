const controller = require("../controllers/taskController.js");

function routes(req, res) {
  const url = req.url;
  const method = req.method;

  if (method === "GET" && url === "/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "API funcionando! Acesse /tasks para ver a to-do list." }));
  }

  if (method === "GET" && url === "/tasks") {
    return controller.listTasks(req, res);
  }

  if (method === "POST" && url === "/tasks") {
    return controller.createTask(req, res);
  }

  if (method === "PUT" && url.startsWith("/tasks/")) {
    const id = Number(url.split("/")[2]);
    return controller.updateTask(req, res, id);
  }

  if (method === "DELETE" && url.startsWith("/tasks/")) {
    const id = Number(url.split("/")[2]);
    return controller.deleteTask(req, res, id);
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Rota não encontrada" }));
}

module.exports = routes;