import { sortReportsByLength, carsNotInBoth, carIsInReport } from "../utils/utils.js";

export function getNew(oldReport, newReport) {
  const [smallerReport, largerReport] = sortReportsByLength(
    oldReport,
    newReport
  );

  const uniqueCars = carsNotInBoth(smallerReport, largerReport);

  const newCars = uniqueCars.filter((car) => carIsInReport(car, newReport));

  return newCars;
}
