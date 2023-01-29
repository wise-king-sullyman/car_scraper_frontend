import get from "axios";
import { parse } from "node-html-parser";

function extractDetailedInfo(detail) {
  function getByQuerySelector(selector) {
    const node = detail.querySelector(selector);

    switch (selector) {
      case ".mileage":
        return node?.textContent.split(' ')[0].replace(',', '')
      case ".miles-from":
        return node?.textContent?.split(" ")[6].replace(",", "");
      case ".vehicle-card-link":
        return "https://cars.com" + node?.attrs.href;
      case ".primary-price":
        if (node?.textContent?.includes("$")) {
          return node?.textContent?.slice(1).replace(",", "");
        }
        break;
      default:
        return node?.textContent;
    }
  }

  const title = getByQuerySelector(".title");
  const type = getByQuerySelector(".stock-type");
  const mileage = getByQuerySelector(".mileage");
  const price = getByQuerySelector(".primary-price");
  const distance = getByQuerySelector(".miles-from");
  const link = getByQuerySelector(".vehicle-card-link");

  return { title, type, mileage, price, distance, link };
}

export async function fetchData(url) {
  const data = await get(url).then((res) => res.data);

  const root = parse(data);

  const details = root.querySelectorAll(".vehicle-details");

  const aggregated_info = details.map((detail) => extractDetailedInfo(detail));

  return aggregated_info;
}
