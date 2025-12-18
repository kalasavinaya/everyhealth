import express from "express";
import cors from "cors";
import logRouter from "./routes/logs.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/logs", logRouter);
export default app;
//# sourceMappingURL=app.js.map