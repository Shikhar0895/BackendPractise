import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Express from "express";
import connectDB from "./db/index.js";

config();

const app = Express();

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

connectDB().then().catch();
app.listen(process.env.PORT || 5000, () => {
  console.log(`App is listening at port: http://localhost:${process.env.PORT}`);
});

app.use(Express.static(path.join(__dirname, "..", "public")));

app.get("/api/users", (req, res) => {
  const randomUsers = [
    {
      firstName: "John",
      lastName: "Doe",
      gender: "male",
      city: "New York",
      age: 25,
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      gender: "female",
      city: "Los Angeles",
      age: 32,
    },
    {
      firstName: "Bob",
      lastName: "Johnson",
      gender: "male",
      city: "London",
      age: 21,
    },
    {
      firstName: "Alice",
      lastName: "Williams",
      gender: "female",
      city: "Paris",
      age: 29,
    },
    {
      firstName: "Charlie",
      lastName: "Brown",
      gender: "male",
      city: "Tokyo",
      age: 18,
    },
    {
      firstName: "Eva",
      lastName: "Miller",
      gender: "female",
      city: "New York",
      age: 35,
    },
    {
      firstName: "David",
      lastName: "Clark",
      gender: "male",
      city: "Los Angeles",
      age: 27,
    },
    {
      firstName: "Sophia",
      lastName: "Anderson",
      gender: "female",
      city: "London",
      age: 24,
    },
    {
      firstName: "Samuel",
      lastName: "Thomas",
      gender: "male",
      city: "Paris",
      age: 31,
    },
    {
      firstName: "Olivia",
      lastName: "Martin",
      gender: "female",
      city: "Tokyo",
      age: 22,
    },
  ];

  res.json(randomUsers);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});
