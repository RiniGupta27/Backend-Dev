import express from "express";
import routes from "./routes/taskRoutes.js";

const app = express();
app.use(express.json());

app.use("/tasks",routes);

app.listen(3000,()=>console.log("Server running"));
