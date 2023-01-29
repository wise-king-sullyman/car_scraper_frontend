import { writeFileSync } from "fs";
import process from "process";

import s60Params from "./volvo.js";
import buildUrl from "./buildUrl.js";
import fetchData from "./fetchData.js";

const url = buildUrl(s60Params);

console.log(await fetchData(url));
// const dateTime = new Date().toLocaleString();
// const formattedDateTime = dateTime.replaceAll('/', '-').replaceAll(',', '_').replaceAll(' ', '');

// writeFileSync(`${process.cwd()}/data/${formattedDateTime}.html`, data);
// writeFileSync(`${process.cwd()}/src/data/cars.html`, data);
