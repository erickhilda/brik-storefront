import { PrismaClient } from "@prisma/client";
import express from "express";
import routes from "./routes";

const PORT = process.env.PORT || 3001;

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

const server = app.listen(PORT, () =>
  console.log(`🚀 Server ready at: http://localhost:${PORT}`)
);
