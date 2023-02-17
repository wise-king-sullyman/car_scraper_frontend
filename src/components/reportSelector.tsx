import React from "react";
import { Selector } from "../components/selector";

export interface ReportSelectorProps {
  onReportsSelected: (firstReport: string[], secondReport: string[]) => any;
}

export const ReportSelector: React.FunctionComponent<ReportSelectorProps> = ({
  onReportsSelected,
}: ReportSelectorProps) => {
  const [makes, setMakes] = React.useState<string[]>([]);
  const [models, setModels] = React.useState<string[]>([]);
  const [selectedMake, setSelectedMake] = React.useState<string>("");
  const [selectedModel, setSelectedModel] = React.useState<string>("");
  const [reportIndex, setReportIndex] = React.useState<string[]>([]);
  const [firstReportDate, setFirstReportDate] = React.useState<string>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [secondReportDate, setSecondReportDate] = React.useState<string>();
  const [secondReportOptions, setSecondReportOptions] = React.useState<
    string[]
  >([]);
  const [firstReport, setFirstReport] = React.useState<string[]>([]);
  const [secondReport, setSecondReport] = React.useState<string[]>([]);

  const serverAddress = "https://scrapi.bullcitysoftware.com";
  // const serverAddress = 'http://localhost:3001/'

  async function getMakes() {
    fetch(serverAddress)
      .then((res) => res.text())
      .then((makes) => setMakes(JSON.parse(makes)));
  }

  function getModels(make: string) {
    return fetch(`${serverAddress}/${make}`).then((res) => res.text());
  }

  function getIndex(make: string, model: string) {
    return fetch(`${serverAddress}/${make}/${model}`).then((res) => res.text());
  }

  function getReport(make: string, model: string, reportNumber: number) {
    return fetch(`${serverAddress}/${make}/${model}/${reportNumber}`).then((res) =>
      res.text()
    );
  }

  function handleMakeSelect(_event: any, itemId: any) {
    setSelectedMake(itemId);
  }

  function handleModelSelect(_event: any, itemid: any) {
    setSelectedModel(itemid)
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
    const report = await getReport(selectedMake, selectedModel, reportNumber);
    setReportCB(JSON.parse(report));
  }

  React.useEffect(() => {
    getMakes();
  }, []);

  React.useEffect(() => {
    if (selectedMake) {
      getModels(selectedMake).then((text) => setModels(JSON.parse(text)));
    }
  }, [selectedMake]);

  React.useEffect(() => {
    if (selectedModel && selectedModel) {
      getIndex(selectedMake, selectedModel).then((text) => setReportIndex(JSON.parse(text)));
    }
  }, [selectedMake, selectedModel]);

  React.useEffect(() => {
    if (!firstReportDate) {
      return setSecondReportOptions([]);
    }

    const unselectedReports = reportIndex.filter(
      (reportName) => !reportName.includes(firstReportDate)
    );

    setSecondReportOptions(unselectedReports);
  }, [firstReportDate, reportIndex]);

  React.useEffect(() => {
    if (firstReport.length && secondReport.length) {
      onReportsSelected(firstReport, secondReport);
    }
  }, [firstReport, secondReport, onReportsSelected]);

  return (
    <div className="App">
      Select make:
      {<Selector onSelect={handleMakeSelect}>{makes}</Selector>}
      Select model:
      {<Selector onSelect={handleModelSelect}>{models}</Selector>}
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
