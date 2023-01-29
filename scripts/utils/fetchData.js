import get from "axios";
import { parse } from "node-html-parser";

function extractDetailedInfo(detail) {
  function getByQuerySelector(selector, type) {
    const node = detail.querySelector(selector);

    switch (type) {
      case "distance":
        return node?.textContent?.split(" ")[6];
      case "link":
        return 'https://cars.com' + node?.attrs.href;
      default:
        return node?.textContent;
    }
  }

  const title = getByQuerySelector(".title");
  const type = getByQuerySelector(".stock-type");
  const mileage = getByQuerySelector(".mileage");
  const price = getByQuerySelector(".primary-price");
  const distance = getByQuerySelector(".miles-from", "distance");
  const link = getByQuerySelector(".vehicle-card-link", "link");

  return { title, type, mileage, price, distance, link };
}

export async function fetchData(url) {
  const data = await get(url).then((res) => res.data);

  const root = parse(data);

  const details = root.querySelectorAll(".vehicle-details");

  const aggregated_info = details.map((detail) => extractDetailedInfo(detail));

  return aggregated_info;
}
