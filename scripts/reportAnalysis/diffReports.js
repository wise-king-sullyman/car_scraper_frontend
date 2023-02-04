import rawOldCarSet from "../../src/data/volvo/1-29-2023_4:54:26PM.json" assert { type: "json" };
import rawNewCarSet from "../../src/data/volvo/2-1-2023_5:30:16PM.json" assert { type: "json" };
import { sanitizeReport } from "../utils/utils.js"
import { getChangedPrices, getSold, getNew } from "./index.js"

const oldCarSet = sanitizeReport(rawOldCarSet);
const newCarSet = sanitizeReport(rawNewCarSet);

console.log(getSold(oldCarSet, newCarSet))