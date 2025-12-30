import { describe, it, expect, vi } from 'vitest';
import { uploadLogs } from '../controllers/logcontroller.js';

describe("Log Controller", () => {
  it("should validate logs array for upload", async () => {
    const req: any = { body: "invalid" };

    const res: any = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    await uploadLogs(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "JSON must be an array of logs",
    });
  });
});
