import express from "express";
import createTask from "../controllers/createTask.js";
import getTasks from "../controllers/getTasks.js";
import updateTask from "../controllers/updateTask.js";
import deleteTask from "../controllers/deleteTask.js";

const router = express.Router();

router.post("/",createTask);
router.get("/",getTasks);
router.put("/:id",updateTask);
router.delete("/:id",deleteTask);

export default router;
