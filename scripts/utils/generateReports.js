import { writeFileSync, mkdirSync, existsSync } from "fs";
import path from "path";
import process from "process";

import { buildUrl, fetchData } from "./index.js";

function writeReport(data, carName) {
  const dateTime = new Date().toLocaleString();
  const formattedDateTime = dateTime
    .replaceAll("/", "-")
    .replaceAll(",", "_")
    .replaceAll(" ", "");
  const outputPathBase = path.join(process.cwd(), 'backend', "data", carName);

  if (!existsSync(outputPathBase)) {
    mkdirSync(outputPathBase);
  }

  writeFileSync(
    path.join(outputPathBase, `${formattedDateTime}.json`),
    JSON.stringify(data)
  );

  console.log(`report written for ${carName}`)
}

export async function generateReports(carParameters) {
  Object.keys(carParameters).forEach((car) => {
    const url = buildUrl(carParameters[car]);
    fetchData(url).then((data) => writeReport(data, car));
  });
}
