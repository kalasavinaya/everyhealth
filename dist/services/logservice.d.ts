import sqlite3 from "sqlite3";
export declare function connectDb(): Promise<import("sqlite").Database<sqlite3.Database, sqlite3.Statement>>;
export declare function initDb(): Promise<import("sqlite").Database<sqlite3.Database, sqlite3.Statement>>;
export declare function fetchLogs(filters: {
    severity?: string;
    from?: string;
    to?: string;
    page?: number;
    limit?: number;
}): Promise<any[]>;
export declare function saveLogs(logs: any[]): Promise<{
    timestamp: any;
    source: any;
    severity: any;
    message: any;
    log_hash: string;
}[]>;
//# sourceMappingURL=logservice.d.ts.map