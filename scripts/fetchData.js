import get from "axios";
import { writeFileSync } from "fs";
import process from "process";
import { parse } from 'node-html-parser';

import s60Params from './volvo.js';
import buildUrl from './buildUrl.js'

const url = buildUrl(s60Params);

const data = await get(url).then(res => res.data);

console.log(url)
// const root = parse(data)
// console.log(root.querySelector('.price-section'));

// const dateTime = new Date().toLocaleString();
// const formattedDateTime = dateTime.replaceAll('/', '-').replaceAll(',', '_').replaceAll(' ', '');

// writeFileSync(`${process.cwd()}/data/${formattedDateTime}.html`, data);
// writeFileSync(`${process.cwd()}/src/data/cars.html`, data);
