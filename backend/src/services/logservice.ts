import sqlite3 from "sqlite3";
import { open }  from "sqlite";
import { createHash } from "node:crypto";
import { CREATE_LOGS_TABLE, INSERT_LOG, SELECT_LOGS,COUNT_LOGS } from "../queries/queries.js";
import { logger } from "../utils/logger.js";
import { DatabaseConnection } from "../db/database.js";

const db = await DatabaseConnection.getConnection();
/* ///Data base connections/////

export async function connectDb(){
return open({
    filename:"./logs.db",
    driver:sqlite3.Database
});
}
export async function initDb(){
    const db=await connectDb();
    await db.exec(CREATE_LOGS_TABLE);
    return db;
}
///Data base connections///// */

///fetch the data from db/////

export async function fetchLogs(filters: { severity?: string; from?: string; to?: string; page?: number; limit?: number }) {
   const db = await DatabaseConnection.getConnection();

  const page = filters.page ?? 1;
  const limit = filters.limit ?? 5;
  const offset = (page - 1) * limit;

  // Params for filters only
  const filterParams: any[] = [];
  if (filters.severity) filterParams.push(filters.severity);
  if (filters.from) filterParams.push(filters.from);
  if (filters.to) filterParams.push(filters.to);

  // Count total
  const totalRow = await db.get(COUNT_LOGS(filters), filterParams);
  const total = totalRow?.total_count ?? 0;

  // Logs with pagination
  const logs = await db.all(SELECT_LOGS(filters), [...filterParams, limit, offset]);

  logger.info(`Fetched ${total} logs`, { filters });

  return { logs, total };
}

///fetch the data from db/////

///save the data to db/////

export async function saveLogs(logs: any[]) {
   const db = await DatabaseConnection.getConnection();

  const logsWithId = logs.map(log => {
 
    /*remove patientid///
    const { patient_id, ...sanitizedLog } = log;
    const logString = `${sanitizedLog.timestamp}|${sanitizedLog.source}|${sanitizedLog.severity}|${sanitizedLog.message}`;*/
   
   
    // Generate logid based on content ///
    const logString = `${log.timestamp}|${log.source}|${log.severity}|${log.message}|${log.patient_id}`;
    ////////////it is one way hash so patient_id cannot be reconstructed///////
    const log_hash = createHash("sha256").update(logString).digest("hex");
     return {
    timestamp: log.timestamp,
    source: log.source,
    severity: log.severity,
    message: log.message,
    log_hash
  };
    //return { ...sanitizedLog, log_hash };
  });

  // Insert logs ignoring duplicates using data base log_hash unique key/////
  for (const log of logsWithId) {
    await db.run(INSERT_LOG,
      log.timestamp,
      log.source,
      log.severity,
      log.message,
      log.log_hash
    );
     // Log based on severity
    switch (log.severity.toLowerCase()) {
      case "info":
        logger.info(log.message, { log });
        break;
      case "warning":
        logger.warn(log.message, { log });
        break;
      case "error":
        logger.error(log.message, { log });
        break;
      default:
        logger.info(log.message, { log });
        break;
    }
  }

  return logsWithId;
}
///save the data to db/////
