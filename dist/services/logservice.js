import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { createHash } from "node:crypto";
import { CREATE_LOGS_TABLE, INSERT_LOG, SELECT_LOGS } from "../queries/queries.js";
///Data base connections/////
export async function connectDb() {
    return open({
        filename: "./logs.db",
        driver: sqlite3.Database
    });
}
export async function initDb() {
    const db = await connectDb();
    await db.exec(CREATE_LOGS_TABLE);
    return db;
}
///Data base connections/////
///fetch the data from db/////
export async function fetchLogs(filters) {
    const db = await connectDb();
    const params = [];
    const page = filters.page ?? 1;
    const limit = filters.limit ?? 5;
    const offset = (page - 1) * limit;
    let query = SELECT_LOGS(filters);
    if (filters.severity)
        params.push(filters.severity);
    if (filters.from)
        params.push(filters.from);
    if (filters.to)
        params.push(filters.to);
    params.push(limit, offset);
    const logs = await db.all(query, params);
    //console.log(query);
    //console.log(params);
    await db.close();
    return logs;
}
///fetch the data from db/////
///save the data to db/////
export async function saveLogs(logs) {
    const db = await initDb();
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
        await db.run(INSERT_LOG, log.timestamp, log.source, log.severity, log.message, log.log_hash);
    }
    await db.close();
    return logsWithId;
}
///save the data to db/////
//# sourceMappingURL=logservice.js.map