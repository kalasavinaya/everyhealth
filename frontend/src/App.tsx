import React, { useState } from "react";
import UploadLogs from "./components/UploadJsonFile";
import LogList from "./components/LogList";
import "./App.css";

function App() {
  const [activeView, setActiveView] = useState<"upload" | "logs">("logs");
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => setRefresh(prev => !prev);

  return (
     <div className="app-root">
          {/* header */}
      <div  className="app-header">
         Logs Tracker
       </div>
    <div className="app-container">
    
      {/* Left Panel */}
      <aside className="sidebar">
        <button
          className={`nav-button ${activeView === "logs" ? "active" : ""}`}
          onClick={() => setActiveView("logs")}
        >
          View Logs
        </button>

        <button
          className={`nav-button ${activeView === "upload" ? "active" : ""}`}
          onClick={() => setActiveView("upload")}
        >
          Upload Logs
        </button>
      </aside>

      {/* Main Content */}
      <main className="content">
        {activeView === "logs" && (
          <LogList key={refresh ? "refresh1" : "refresh0"} />
        )}

        {activeView === "upload" && (
          <UploadLogs onUploadSuccess={triggerRefresh} />
        )}
      </main>
    </div>
     </div>
  );
}

export default App;






// import React, { useState } from "react";
// import UploadLogs from "./components/UploadJsonFile";
// import LogList from "./components/LogList";

// function App() {
//   const [activeTab, setActiveTab] = useState<"upload" | "logs">("logs");
//   const [refresh, setRefresh] = useState(false);

//   const triggerRefresh = () => setRefresh(prev => !prev);

//   return (
//     <div style={{ padding: "10px" }}>
//       {/* header */}
//       <div  className="App-header">
//         Logs Tracker
//       </div>

//       {/* tabs */}
//       <div className="tab-container">
//         <button className={`tab-button ${activeTab === "logs" ? "active" : ""}`}  onClick={() => setActiveTab("logs")} > Logs   </button>
//         <button className={`tab-button ${activeTab === "upload" ? "active" : ""}`}onClick={() => setActiveTab("upload")} > Upload </button>
//       </div>

//       {/* Tab Content */}
//       {activeTab === "logs" && (
//         <LogList key={refresh ? "refresh1" : "refresh0"} />
//       )}

//       {activeTab === "upload" && (
//         <UploadLogs onUploadSuccess={triggerRefresh} />
//       )}
//     </div>
//   );
// }

// export default App;


