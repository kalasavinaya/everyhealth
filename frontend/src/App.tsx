import React, { useState } from "react";
import UploadLogs from "./components/UploadJsonFile";
import LogList from "./components/LogList";

function App() {
  const [activeTab, setActiveTab] = useState<"upload" | "logs">("logs");
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => setRefresh(prev => !prev);

  return (
    <div style={{ padding: "10px" }}>
      {/* header */}
      <div  className="App-header">
        Logs Tracker
      </div>

      {/* tabs */}
      <div className="tab-container">
        <button className={`tab-button ${activeTab === "logs" ? "active" : ""}`}  onClick={() => setActiveTab("logs")} > Logs   </button>
        <button className={`tab-button ${activeTab === "upload" ? "active" : ""}`}onClick={() => setActiveTab("upload")} > Upload </button>
      </div>

      {/* Tab Content */}
      {activeTab === "logs" && (
        <LogList key={refresh ? "refresh1" : "refresh0"} />
      )}

      {activeTab === "upload" && (
        <UploadLogs onUploadSuccess={triggerRefresh} />
      )}
    </div>
  );
}

export default App;




/*import React, { useState } from "react";
import UploadLogs from "./components/UploadJsonFile";
import LogList from "./components/LogList";


function App() {
 const [activeTab, setActiveTab] = useState<"upload" | "logs">("logs");
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => setRefresh(prev => !prev);

  return (
    <div style={{ padding: "5px" }}>
      <div style={{  width: "100%",  backgroundColor: "#ffffff",  padding: "2px",  textAlign: "center",  fontSize: "22px",  fontWeight: "bold",  color: "#003366" }}><h3>Logs Tracker</h3></div>
        <UploadLogs onUploadSuccess={triggerRefresh} />
      <LogList key={refresh ? "refresh1" : "refresh0"} />
    </div>
  );
}

export default App;


//{{backgroundColor:"gray",padding:"2px",marginBottom:"30px"}}*/