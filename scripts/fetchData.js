import get from "axios";
import { writeFileSync } from "fs";
import process from "process";
import { parse } from 'node-html-parser';

// const options = { mode: 'same-origin' as RequestMode } // no-cors, *cors, same-origin

const urlBase = "https://www.cars.com/shopping/results/?";
// dealer_id=
// &keyword=
// &list_price_max=
// &list_price_min=
// &makes[]=volvo
// &maximum_distance=all
// &mileage_max=
// &models[]=volvo-s60&models[]=volvo-s60_hybrid&models[]=volvo-s60_inscription&models[]=volvo-s60_recharge_plug_in_hybrid
// &page_size=20
// &sort=list_price
// &stock_type=all
// &trims[]=volvo-s60-t8_inscription
// &trims[]=volvo-s60_recharge_plug_in_hybrid-t8_black_edition_r_design_extended_range
// &trims[]=volvo-s60_recharge_plug_in_hybrid-t8_inscription_extended_range
// &trims[]=volvo-s60_recharge_plug_in_hybrid-t8_plus_black_edition
// &trims[]=volvo-s60_recharge_plug_in_hybrid-t8_plus_dark_theme
// &trims[]=volvo-s60_recharge_plug_in_hybrid-t8_r_design_extended_range
// &trims[]=volvo-s60_recharge_plug_in_hybrid-t8_ultimate_black_edition
// &trims[]=volvo-s60_recharge_plug_in_hybrid-t8_ultimate_bright_theme
// &year_max=
// &year_min=2022
// &zip=27599'
const params = {
  dealer_id: "",
  keyword: "",
  list_price_max: "",
  list_price_min: "",
  makes: ["volvo"],
  maximum_distance: "all",
  mileage_max: "",
  models: [
    "volvo-s60",
    "volvo-s60_hybrid",
    "volvo-s60_inscription",
    "volvo-s60_recharge_plug_in_hybrid",
  ],
  page_size: 200,
  sort: "list_price",
  stock_type: "all",
  trims: [
    "volvo-s60-t8_inscription",
    "volvo-s60_recharge_plug_in_hybrid-t8_black_edition_r_design_extended_range",
    "volvo-s60_recharge_plug_in_hybrid-t8_inscription_extended_range",
    "volvo-s60_recharge_plug_in_hybrid-t8_plus_black_edition",
    "volvo-s60_recharge_plug_in_hybrid-t8_plus_dark_theme",
    "volvo-s60_recharge_plug_in_hybrid-t8_r_design_extended_range",
    "volvo-s60_recharge_plug_in_hybrid-t8_ultimate_black_edition",
    "volvo-s60_recharge_plug_in_hybrid-t8_ultimate_bright_theme",
  ],
  year_max: "",
  year_min: 2022,
  zip: 27599,
};

function buildUrl(base, params) {
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
  return base + fullParams.slice(1);
}

const url = buildUrl(urlBase, params);

const data = await get(url).then(res => res.data);

const root = parse(data)
console.log(root.querySelector('.price-section'));

// const dateTime = new Date().toLocaleString();
// const formattedDateTime = dateTime.replaceAll('/', '-').replaceAll(',', '_').replaceAll(' ', '');

// writeFileSync(`${process.cwd()}/data/${formattedDateTime}.html`, data);
// writeFileSync(`${process.cwd()}/src/data/cars.html`, data);
