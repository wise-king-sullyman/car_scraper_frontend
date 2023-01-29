import get from "axios";
import { parse } from "node-html-parser";

async function fetchData(url) {
  const data = await get(url).then((res) => res.data);

  const root = parse(data);

  const details = root.querySelectorAll(".vehicle-details");

  const aggregated_info = details.map((detail) => {
    function getContentByQuerySelector(selector) {
      const content = detail.querySelector(selector)?.textContent;
      if (content) {
        return content;
      } else {
        console.warn(`no text found for selector ${selector}`);
      }
    }

    const title = getContentByQuerySelector(".title");
    const type = getContentByQuerySelector(".stock-type");
    const mileage = getContentByQuerySelector(".mileage");
    const price = getContentByQuerySelector(".primary-price");
    const distance = getContentByQuerySelector(".miles-from").split(" ")[6];
    const link =
      "https://www.cars.com" +
      detail.querySelector(".vehicle-card-link").attrs.href;
    return { title, type, mileage, price, distance, link };
  });

  return aggregated_info;
}

export default fetchData;
