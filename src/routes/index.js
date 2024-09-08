// import express, { Router } from "express";
// import { registerUser } from "../controllers/user.controller.js";
// import { dirname, join } from "path";
// import { fileURLToPath } from "url";

// const router = Router();

// //user routes
// router.route("/v1/users/register").post(registerUser);

// //home route
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// router.route("/").get((req, res) => {
//   res.sendFile(join(__dirname, "..", "..", "public", "index.html"));
// });

// export default router;

import { router as userRoute } from "./user.routes.js";
import { router as homeRoute } from "./home.routes.js";

export { userRoute, homeRoute };
