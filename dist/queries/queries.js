///Will hold all the database Quires///////
export const CREATE_LOGS_TABLE = `
  CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT,
    source TEXT,
    severity TEXT,
    message TEXT,
    log_hash TEXT UNIQUE
  )`;
export const INSERT_LOG = `
  INSERT OR IGNORE INTO logs (timestamp, source, severity, message, log_hash)
  VALUES (?, ?, ?, ?, ?)`;
export function SELECT_LOGS(filters) {
    let query = "SELECT id, timestamp, source, severity, message FROM logs WHERE 1=1";
    if (filters.severity)
        query += " AND severity = ?";
    if (filters.from)
        query += " AND timestamp >= ?";
    if (filters.to)
        query += " AND timestamp <= ?";
    query += `  ORDER BY timestamp DESC  LIMIT ? OFFSET ?  `;
    return query;
}
//# sourceMappingURL=queries.js.map