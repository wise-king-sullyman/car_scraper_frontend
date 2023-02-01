import { sortReportsByLength, carsNotInBoth, carIsInReport } from "../utils/utils.js";

export function getSold(oldReport, newReport) {
  const [smallerReport, largerReport] = sortReportsByLength(
    oldReport,
    newReport
  );

  const uniqueCars = carsNotInBoth(smallerReport, largerReport);

  const soldCars = uniqueCars.filter((car) => carIsInReport(car, oldReport));

  return soldCars;
}