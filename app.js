const http = require("http");
const routes = require("./taskRoutes");

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'aplication/json')
  routes(req, res);
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});