import { describe, it, expect, vi } from 'vitest';
import { saveLogs, fetchLogs } from '../services/logservice.js';
export type Severity = "info" | "warning" | "error";

describe("Log Service", () => {
  it("should save logs and generate a hash", async () => {
    const logs = [
      {
        message: "Test log",
        severity: "info",
        timestamp: new Date().toISOString(),
      },
    ];

    const saved = await saveLogs(logs);

    expect(saved.length).toBeGreaterThan(0);
    expect(saved[0]).toHaveProperty("log_hash");
  });

  it("should fetch logs based on severity", async () => {
    const logs = await fetchLogs({severity: "info"});

    expect(Array.isArray(logs)).toBe(true);
  });
});
