import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Connection from "./config.js";
import postRouter from "./router/postRoute.js";
import dalleRouter from "./router/dalleRoute.js";

const app = express();

app.use(cors());
dotenv.config();

app.use(express.urlencoded({ extended: "true" }));
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRouter);
app.use("/api/v1/dalle", dalleRouter);

const startServer = () => {
  try {
    Connection(process.env.CONNECTION_URL);

    app.listen(5000, () => console.log("server running on port no 5000"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
