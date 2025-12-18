export declare const CREATE_LOGS_TABLE = "\n  CREATE TABLE IF NOT EXISTS logs (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    timestamp TEXT,\n    source TEXT,\n    severity TEXT,\n    message TEXT,\n    log_hash TEXT UNIQUE\n  )";
export declare const INSERT_LOG = "\n  INSERT OR IGNORE INTO logs (timestamp, source, severity, message, log_hash)\n  VALUES (?, ?, ?, ?, ?)";
export declare function SELECT_LOGS(filters: {
    severity?: string;
    from?: string;
    to?: string;
    page?: number;
    limit?: number;
}): string;
//# sourceMappingURL=queries.d.ts.map