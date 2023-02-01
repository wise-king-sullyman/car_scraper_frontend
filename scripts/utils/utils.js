export function getReportId(report) {
  let mileageSum = 0
  let priceSum = 0
  let distanceSum = 0

  report.forEach(car => {
    mileageSum += car.mileage;
    priceSum += car.price;
    distanceSum += car.distance;
  })

  return mileageSum + priceSum + distanceSum
}

export function getUsedCars(report) {
  return report.filter(car => car.type === 'Used')
}

export function sanitizeReport(report) {
  return report.filter(car => car.price && car.mileage && car.distance)
}

export function sortReportsByLength(oldReport, newReport) {
  const largerReport =
  oldReport.length > newReport.length ? oldReport : newReport;

  const smallerReport = getReportId(oldReport) === getReportId(largerReport) ? newReport : oldReport;

  return [smallerReport, largerReport]
}

export function isSameCar(carOne, carTwo) {
  return (
    carOne.mileage === carTwo.mileage &&
    carOne.link === carTwo.link &&
    carOne.distance === carTwo.distance
  );
}

export function carIsInReport(car, report) {
  return report.some((reportCar) =>
  isSameCar(reportCar, car)
);
}

export function carsNotInBoth(smallerReport, largerReport) {
  return largerReport.filter((largerReportCar) => {
    return !carIsInReport(largerReportCar, smallerReport)
  });
}