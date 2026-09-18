import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "50mb" }));

  const DB_FILE = path.join(process.cwd(), "db.json");

  // Endpoint to fetch data
  app.get("/api/data", (req, res) => {
    if (fs.existsSync(DB_FILE)) {
      try {
        const data = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
        res.json(data);
      } catch (e) {
        res.status(500).json({ error: "Failed to parse database" });
      }
    } else {
      res.status(404).json({ error: "No data found" });
    }
  });

  // Endpoint to save data
  app.post("/api/data", (req, res) => {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(req.body, null, 2));
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: "Failed to save data" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
