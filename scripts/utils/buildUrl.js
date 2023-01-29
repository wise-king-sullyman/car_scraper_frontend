const urlBase = "https://www.cars.com/shopping/results/?";

export function buildUrl(params) {
  const fullParams = Object.keys(params).reduce((acc, param) => {
    const value = params[param];
    if (typeof value === "object") {
      const arrayValue = value.reduce(
        (valueAcc, subParam) => `${valueAcc}&${param}[]=${subParam}`,
        ""
      );
      return `${acc}&${param}=${arrayValue}`;
    } else {
      return `${acc}&${param}=${value}`;
    }
  }, "");
  return urlBase + fullParams.slice(1);
}
