import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

interface Props {
  onUploadSuccess: () => void;
}

const UploadJsonFile: React.FC<Props> = ({ onUploadSuccess }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
   if (!file) {
        alert("Please select a file containg JSON");
        return;
      }
    try {
      
      const file_content = await file.text();
      let jsonData;
      try {
        jsonData = JSON.parse(file_content);
      } catch (parseErr) {
        alert("Invalid JSON.");
        return;
      }
      let url = `${API_BASE_URL}/logs`;
      await axios.post(url+"/upload", jsonData);
      alert("File Uploaded");
      onUploadSuccess();
    } catch (err) {
      alert("Error please try again" + err);
    }
  };

   return (
    <div>
      <input  type="file" accept=".json" onChange={handleFileChange} />
      <button className="global-btn" onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadJsonFile;