import express from "express";
import path from "path";
import process from "process";
import { readdirSync } from "fs";

const app = express();
const port = 3000;

// app.use(express.static(path.join(process.cwd(), 'backend/data')))

// const reports = readdirSync(path.join(process.cwd(), "backend/data/tesla"))

function getReportIndex(make) {
  return readdirSync(path.join(process.cwd(), `backend/data/${make}`));
}

function getReport({ make, reportId }) {
  const reportName = getReportIndex(make)[reportId]
  return path.join(process.cwd(), `backend/data/${make}/${reportName}`);
}

app.get("/:make", (req, res) => {
  res.send(getReportIndex(req.params.make));
});

// app.get("/tesla/0", (req, res) => {
//   res.sendFile(
//     path.join(process.cwd(), "backend/data/tesla/1-29-2023_4:54:29PM.json")
//   );
// });

app.get("/:make/:reportId", (req, res) => {
  res.sendFile(getReport(req.params));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
