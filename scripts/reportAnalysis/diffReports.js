import rawOldCarSet from "../../src/data/tesla/1-29-2023_4:54:29PM.json" assert { type: "json" };
import rawNewCarSet from "../../src/data/tesla/1-31-2023_4:57:55PM.json" assert { type: "json" };
import { sanitizeReport } from "../utils/utils.js"
import { getChangedPrices } from "./index.js"

const oldCarSet = sanitizeReport(rawOldCarSet);
const newCarSet = sanitizeReport(rawNewCarSet);

console.log(getChangedPrices(oldCarSet, newCarSet))