import React from "react";
import { partialInfoCar, ReportDiffer, ReportSelector } from "../components";

export const Main: React.FunctionComponent = () => {
  const [reports, setReports] = React.useState<string[][]>();

  function onReportsSelected(firstReport: string[], secondReport: string[]) {
    setReports([firstReport, secondReport]);
  }

  return (
    <div>
      <ReportSelector onReportsSelected={onReportsSelected} />
      {reports &&<ReportDiffer reports={reports as unknown as partialInfoCar[][]} />}
    </div>
  );
};
