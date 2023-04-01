import express, { Router } from "express";
import TodoController from "./controllers/TodoController";
import cors from "cors";

const router = Router();

router.use(express.json());
router.use(cors());

router.get("/", (request, response) => {
	return response.status(200).json({
		message: "Main Route",
	});
});

router.post("/todos", TodoController.create);
router.get("/todos/:id", TodoController.findOne);
router.get("/todos", TodoController.findAll);
router.put("/todos/:id", TodoController.update);
router.delete("/todos/:id", TodoController.delete);

router.get("/active", TodoController.findActive);
router.get("/completed", TodoController.findCompleted);

export { router };
