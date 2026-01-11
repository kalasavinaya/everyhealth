import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { CREATE_LOGS_TABLE } from "../queries/queries.js";

export class DatabaseConnection {
  private static db: Database | null = null;

  static async getConnection(): Promise<Database> {
    if (!this.db) {
      this.db = await open({
        filename: "./logs.db",
        driver: sqlite3.Database
      });

      await this.db.exec(CREATE_LOGS_TABLE);
    }

    return this.db;
  }

  static async close(): Promise<void> {
    if (this.db) {
      await this.db.close();
      this.db = null;
    }
  }
}
