import { sortReportsByLength, isSameCar } from "../utils/utils.js";

export function getChangedPrices(oldReport, newReport) {
  const [smallerReport, largerReport] = sortReportsByLength(
    oldReport,
    newReport
  );

  const changedPrices = largerReport.filter((largerReportCar) => {
    return smallerReport.some(
      (smallerReportCar) =>
        isSameCar(largerReportCar, smallerReportCar) &&
        largerReportCar.price !== smallerReportCar.price
    );
  });

  const changedPriceReport = changedPrices.map((car) => {
    const smallerReportCar = smallerReport.find((smallerReportCar) =>
      isSameCar(car, smallerReportCar)
    );

    const oldPrice = oldReport.includes(car)
      ? car.price
      : smallerReportCar.price;
    const newPrice = oldReport.includes(car)
      ? smallerReportCar.price
      : car.price;

    return {
      title: car.title,
      oldPrice,
      newPrice,
      diff: newPrice - oldPrice,
      mileage: car.mileage,
      distance: car.distance,
      link: car.link,
    };
  });

  return changedPriceReport;
}