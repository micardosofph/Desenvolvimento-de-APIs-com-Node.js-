const controller = require("./taskController");

function routes(req, res) {
  const url = req.url;
  const method = req.method;

  if (method === "GET" && url === "/tasks") {
    return controller.handleGetTasks(req, res);
  }

  if (method === "POST" && url === "/tasks") {
    return controller.handlePostTask(req, res);
  }

  if (method === "PUT" && url.startsWith("/tasks/")) {
    const id = Number(url.split("/")[2]);
    return controller.handlePutTask(req, res, id);
  }

  if (method === "DELETE" && url.startsWith("/tasks/")) {
    const id = Number(url.split("/")[2]);
    return controller.handleDeleteTask(req, res, id);
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Rota não encontrada" }));
}

module.exports = routes;