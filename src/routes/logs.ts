import { Router } from "express";
import { getLogs, uploadLogs } from "../controllers/logsController.js";

const router = Router();

router.get("/", getLogs); // fetch log data with filters
router.post("/upload", uploadLogs); // upload JSON data

export default router;