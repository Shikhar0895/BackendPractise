import { config } from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

config();

connectDB().then().catch();

app.listen(process.env.PORT || 5000, () => {
  console.log(`App is listening at port: http://localhost:${process.env.PORT}`);
});
