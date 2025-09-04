const http = require("http");
const next = require("next");

const port = 3000; // HTTP portu
const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  http.createServer((req, res) => {
    handle(req, res);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Next.js server running on http://localhost:${port}`);
  });
});
