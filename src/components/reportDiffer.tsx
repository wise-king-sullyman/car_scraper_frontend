import React from "react";
import { partialInfoCar, ReportsView } from ".";
import { getChangedPrices, getNew, getSold } from "./reportAnalysis";
import { Tabs, Tab, TabTitleText } from "@patternfly/react-core";

export interface ReportDifferProps {
  reports: partialInfoCar[][];
}

export const ReportDiffer: React.FunctionComponent<ReportDifferProps> = ({
  reports,
}: ReportDifferProps) => {
  const [mode, setMode] = React.useState<string>("Changed prices");
  const [oldReport, newReport] = reports;
  const modeOptions = ["Changed prices", "New listings", "Removed listings"]

  function getReport(mode: string) {
    switch (mode) {
      case (modeOptions[0]):
        return(getChangedPrices(oldReport, newReport))
      case (modeOptions[1]):
        return(getNew(oldReport, newReport))
      case (modeOptions[2]):
        return(getSold(oldReport, newReport))
    }
  }

  const tabs = modeOptions.map((mode) => (
    <Tab eventKey={mode} title={<TabTitleText>{mode}</TabTitleText>}>
      <ReportsView>{getReport(mode)}</ReportsView>
    </Tab>
  ))

  return (
    <div>
      <Tabs activeKey={mode} onSelect={(_event, key) => setMode(key.toString())}>{tabs}</Tabs>
    </div>
  );
};
