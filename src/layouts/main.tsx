import React from "react";
import { ReportSelector } from "../components";
import { ReportsView, partialInfoCar } from "../components/reportsView";

export const Main: React.FunctionComponent = () => {

  function onReportsSelected(firstReport: string[], secondReport: string[]) {
    console.log(firstReport);
    console.log(secondReport);
  }

  return (
    <div>
      <ReportSelector onReportsSelected={onReportsSelected} />
    </div>
  );
};
