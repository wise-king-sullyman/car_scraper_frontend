import { sortReportsByLength, carsNotInBoth } from "../utils/utils.js";

export function getNew(oldReport, newReport) {
  const [smallerReport, largerReport] = sortReportsByLength(
    oldReport,
    newReport
  );

  const uniqueCars = carsNotInBoth(smallerReport, largerReport);

  const newCars = uniqueCars.filter((car) => newReport.includes(car));

  return newCars;
}
