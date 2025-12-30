import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

// Log item type
interface LogEntry {
  id: number;
  timestamp: string;
  source: string;
  severity: string;
  message: string;
}

// API response type
interface LogResponse {
  logs: LogEntry[];
  total: number;
}

const LogList: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [severity, setSeverity] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchLogs = async (pageNumber: number = 1) => {
    setLoading(true);
    try {
      let url = `${API_BASE_URL}/logs?`;
      if (severity) url += `severity=${severity}&`;
      if (fromDate) url += `from=${fromDate}&`;
      if (toDate) url += `to=${toDate}&`;
      url += `page=${pageNumber}&limit=${limit}`;

      const res = await axios.get<LogResponse>(url);

      setLogs(res.data.logs);   // logs for current page
      setTotal(res.data.total); // total logs matching filters
      setPage(pageNumber);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs(1);
  }, [severity, fromDate, toDate]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <div className="filter-bar">
        <label className="total-label"><b>Total ({total})</b></label>
        <label>
          Severity
          <select className="global-select" value={severity} onChange={e => setSeverity(e.target.value)}>
            <option value="">All</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label>
          From
          <input type="date" className="global-date" value={fromDate} onChange={e => setFromDate(e.target.value)} />
        </label>
        <label>
          To
          <input type="date" className="global-date" value={toDate} onChange={e => setToDate(e.target.value)} />
        </label>
        <button className="global-btn fix" onClick={() => fetchLogs(1)}>Fetch Logs</button>
      </div>

      <table className="logs-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Timestamp</th>
            <th>Source</th>
            <th>Severity</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.timestamp}</td>
              <td>{log.source}</td>
              <td>{log.severity}</td>
              <td>{log.message}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-bar">
        <button
          className="global-btn"
          disabled={page === 1 || loading}
          onClick={() => fetchLogs(page - 1)}
        >
          Previous
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {page} of {totalPages}
        </span>

        <button
          className="global-btn"
          disabled={page === totalPages || loading}
          onClick={() => fetchLogs(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LogList;
