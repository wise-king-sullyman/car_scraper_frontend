import React from "react";
import { Selector } from "./components/selector";
import { ReportsView, partialInfoCar } from "./components/reportsView";

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

function App() {
  const [selectedMake, setSelectedMake] = React.useState<string>("");
  const [reportIndex, setReportIndex] = React.useState<string[]>([]);
  const [report, setReport] = React.useState<string[]>([]);

  const makes = ["tesla", "volvo"];
  function handleMakeSelect(_event: any, itemId: any) {
    setSelectedMake(itemId);
  }

  async function handleReportSelect(_event: any, itemId: any) {
    const reportNumber = reportIndex.findIndex((reportName) =>
      reportName.includes(itemId)
    );
    const report = await getReport(selectedMake, reportNumber);
    setReport(JSON.parse(report));
  }

  React.useEffect(() => {
    if (selectedMake) {
      getIndex(selectedMake).then((text) => setReportIndex(JSON.parse(text)));
    }
  }, [selectedMake]);

  return (
    <div className="App">
      Select make:
      {<Selector onSelect={handleMakeSelect}>{makes}</Selector>}
      Select report date:
      {<Selector onSelect={handleReportSelect}>{reportIndex}</Selector>}
      {<ReportsView>{report as unknown as partialInfoCar[]}</ReportsView>}
    </div>
  );
}

export default App;
