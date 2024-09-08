import { Router } from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { randomUsers } from "../constants.js";
const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.route("/").get((req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "public", "index.html"));
});

router.route("/api/v1/users").get((req, res) => {
  res.json(randomUsers);
});

export { router };
export { __dirname };
