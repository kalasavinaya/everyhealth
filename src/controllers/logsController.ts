import type {Request ,Response } from "express";
import { saveLogs } from "../services/logservice.js";
import { fetchLogs } from "../services/logservice.js";

interface LogEntry {
  timestamp: string;
  source: string;
  severity: "info" | "warning" | "error";
  message: string;
  patient_id?: string;
}

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
  const { severity, from, to, page = "1", limit = "5"} = req.query;
  const logs = await fetchLogs({ severity: severity as string, from: from as string, to: to as string ,page: Number(page),limit: Number(limit)});
  res.json(logs);
}
///function to fetch the data///////////

///function to update the json to db table///////////
export async function uploadLogs(req: Request, res: Response) {
  const json = req.body;

  if (!Array.isArray(json)) {
    return res.status(400).json({ error: "JSON must be an array of logs" });
  }

  try {
    const validLogs = json.filter(isValidLog);
    const insertedLogs = await saveLogs(validLogs); // <-- use saveLogs from service

    res.json({
      message: `${insertedLogs.length} logs processed successfully`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to process logs" });
  }
}
///function to update the json to db table///////////
