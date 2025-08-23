import express from "express";
import * as os from "node:os";

const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/", (req, res) => {
  const systemInfo = {
    hostname: os.hostname(),
    platform: os.platform(),
    arch: os.arch(),
    cpu: os.cpus(),
    totalMemory: os.totalmem(),
    freeMemory: os.freemem(),
    uptime: os.uptime(),
  };
  res.json(systemInfo);
});

app.get("/cpu", (req, res) => {
  const systemInfo = {
    cpu: os.cpus(),
  };
  res.json(systemInfo);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
