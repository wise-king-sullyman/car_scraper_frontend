import React from "react";
import { Selector } from "../components/selector";
import { ReportsView, partialInfoCar } from "../components/reportsView";

export const Main: React.FunctionComponent = () => {
  const [selectedMake, setSelectedMake] = React.useState<string>("");
  const [reportIndex, setReportIndex] = React.useState<string[]>([]);
  const [firstReportDate, setFirstReportDate] = React.useState<string>();
  const [secondReportDate, setSecondReportDate] = React.useState<string>();
  const [secondReportOptions, setSecondReportOptions] = React.useState<
    string[]
  >([]);
  const [firstReport, setFirstReport] = React.useState<string[]>([]);
  const [secondReport, setSecondReport] = React.useState<string[]>([]);

  const serverAddress = "http://162.243.172.239";
  // const serverAddress = 'http://localhost:3001/'

  function getIndex(make: string) {
    return fetch(`${serverAddress}/${make}`).then((res) => res.text());
  }

  function getReport(make: string, reportNumber: number) {
    return fetch(`${serverAddress}/${make}/${reportNumber}`).then((res) =>
      res.text()
    );
  }

  const makes = ["tesla", "volvo"];
  function handleMakeSelect(_event: any, itemId: any) {
    setSelectedMake(itemId);
  }

  async function handleReportSelect(
    itemId: any,
    setReportDateCB: (report: string) => void,
    setReportCB: (report: string[]) => void
  ) {
    setReportDateCB(itemId);
    const reportNumber = reportIndex.findIndex((reportName) =>
      reportName.includes(itemId)
    );
    const report = await getReport(selectedMake, reportNumber);
    setReportCB(JSON.parse(report));
  }

  React.useEffect(() => {
    if (selectedMake) {
      getIndex(selectedMake).then((text) => setReportIndex(JSON.parse(text)));
    }
  }, [selectedMake]);

  React.useEffect(() => {
    if (!firstReportDate) {
      return setSecondReportOptions([]);
    }

    const unselectedReports = reportIndex.filter(
      (reportName) => !reportName.includes(firstReportDate)
    );

    setSecondReportOptions(unselectedReports);
  }, [firstReportDate, reportIndex]);

  return (
    <div className="App">
      Select make:
      {<Selector onSelect={handleMakeSelect}>{makes}</Selector>}
      Select first report date:
      {
        <Selector
          onSelect={(_event, itemId) =>
            handleReportSelect(itemId, setFirstReportDate, setFirstReport)
          }
        >
          {reportIndex}
        </Selector>
      }
      Select second report date:
      {
        <Selector
          onSelect={(_event, itemId) =>
            handleReportSelect(itemId, setSecondReportDate, setSecondReport)
          }
        >
          {secondReportOptions}
        </Selector>
      }
    </div>
  );
};
