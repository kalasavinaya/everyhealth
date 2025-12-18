### ********************************************************************************************
### Every Health - Log Tracker

### A lightweight web application to monitor logs. Upload JSON logs, view logs in a table, and filter by severity and timestamp.
### *********************************************************************************************

### Prerequisites

Node.js ≥ 22.x
npm ≥ 8.x

### *********************************************************************************************
### Setup

### Backend

### **********************************************************************************************
1. Unzip the file and navigate to the backend folder

`cd everyhealth/backend`

2. install dependencies

`npm install`

3. Build

`npm run build`

4. Start the API server

`npm start`

### Backend will run on http://localhost:5000

### ************************************************************************************************
### Front end

1. navigate to the frontend folder

`cd everyhealth/frontend`

2. install dependencies

`npm install`

3. Start the React server

`npm start`

### Frontend will run on http://localhost:3000

### ******************************************************************************************
### Usage

Open `http://localhost:3000` in your browser

The appliation will load with two tabs

1) Logs
2) Upload

## API Endpoints

1) ### POST: `/logs/upload`  (Upload an array of log JSON objects sample provided in the zip)

2) ### GET:  `/logs`        (Fetch logs, supports query params)
### ************************************************************************************************

### GET and POST Samples

GET `http://localhost:5000/logs?severity=error&from=2025-01-01&to=2025-10-05`

POST request JSON

```json
[
  {
    "timestamp": "2025-03-01T14:25:43Z",
    "source": "medication-service",
    "severity": "error",
    "message": "User XYZ failed medication eligibility check",
    "patient_id": "abc123"
  }
]



  




