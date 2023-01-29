import { writeFileSync } from "fs";
import process from "process";

import * as cars from "./searchParameters/index.js";
import { buildUrl, fetchData } from './utils/index.js'

const url = buildUrl(cars.volvo);

console.log(await fetchData(url));
// const dateTime = new Date().toLocaleString();
// const formattedDateTime = dateTime.replaceAll('/', '-').replaceAll(',', '_').replaceAll(' ', '');

// writeFileSync(`${process.cwd()}/data/${formattedDateTime}.html`, data);
// writeFileSync(`${process.cwd()}/src/data/cars.html`, data);
