const urlBase = "https://www.cars.com/shopping/results/?";

function buildUrl(params) {
  const fullParams = Object.keys(params).reduce((acc, param) => {
    const value = params[param];
    if (typeof value === "object") {
      return value.reduce(
        (acc, subParam) => `${acc}&${param}[]=${subParam}`,
        ""
      );
    } else {
      return `${acc}&${param}=${value}`;
    }
  }, "");
  return urlBase + fullParams.slice(1);
}

export default buildUrl
