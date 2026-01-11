import type {Request ,Response } from "express";
import { saveLogs } from "../services/logservice.js";
import { fetchLogs } from "../services/logservice.js";
import { logger } from "../utils/logger.js";
interface LogEntry {
  timestamp: string;
  source: string;
  severity: "info" | "warning" | "error";
  message: string;
  patient_id?: string;
}
///patient_id is not manditory because to handle the log data coming from other sources (application logs,cong,auth etc)
///function to verify validte data/////

function isValidLog(log: any): log is LogEntry {
  return (
    typeof log.timestamp === "string" &&
    typeof log.source === "string" &&
    ["info", "warning", "error"].includes(log.severity) &&
    typeof log.message === "string"
  );
}
///function to verify validte data/////

///function to fetch the data///////////
export async function getLogs(req: Request, res: Response) {
  try{
  const { severity, from, to, page = "1", limit = "5"} = req.query;
  const logs = await fetchLogs({ severity: severity as string, from: from as string, to: to as string ,page: Number(page),limit: Number(limit)});
  logger.info(`Fetched ${logs.total} logs`);
  res.status(200).json(logs);
  } catch (err) {
    logger.error(`Error fetching logs: ${(err as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }

}
///function to fetch the data///////////

///function to update the json to db table///////////
export async function uploadLogs(req: Request, res: Response) {
  const json = req.body;

  if (!Array.isArray(json)) {
     logger.warn("Upload failed: body is not an array");
    return res.status(400).json({ error: "JSON must be an array of logs" });
  }

  try {
    const validLogs = json.filter(isValidLog);
    const insertedLogs = await saveLogs(validLogs); // <-- use saveLogs from service
    logger.info(`Saved ${insertedLogs.length} logs`);

    res.json({
      message: `${insertedLogs.length} logs processed successfully`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to process logs" });
  }
}
///function to update the json to db table///////////
