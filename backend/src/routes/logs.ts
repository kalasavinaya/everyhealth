import { Router } from "express";
import { getLogs, uploadLogs } from "../controllers/logcontroller.js";

const router = Router();

router.get("/", getLogs); // fetch log data with filters
router.post("/upload", uploadLogs); // upload JSON data

export default router;