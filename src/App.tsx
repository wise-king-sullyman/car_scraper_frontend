import React from "react";
import volvos from "./data/volvo/1-29-2023_4:54:26PM.json";
import teslas from "./data/tesla/1-29-2023_4:54:29PM.json";

interface partialInfoCar {
  title: string;
  type: string;
  mileage?: string;
  price?: string;
  distance?: string;
  link: string;
}

interface car extends partialInfoCar {
  mileage: string;
  price: string;
  distance: string;
}

function filtercars(cars: partialInfoCar[]) {
  return cars.filter((car): car is car =>
    car.mileage && car.price && car.distance ? true : false
  );
}

function getAveragePrice(cars: car[]) {
  const sum = cars.reduce((acc, car) => acc + parseInt(car.price), 0);
  return sum / cars.length;
}

function getMeanPrice(cars: car[]) {
  const mean = Math.round(cars.length / 2)
  return cars[mean].price
}

function getMake(cars: car[]) {
  const isTesla = cars.find((car) => car.title.includes("Tesla"));
  return isTesla ? "Tesla" : "Volvo";
}

function formatInfo(cars: partialInfoCar[]) {
  const filteredCars = filtercars(cars);
  const count = filteredCars.length
  const lowPrice = parseInt(filteredCars[0].price)
  const highPrice = parseInt(filteredCars[count - 1].price)
  const priceRange = highPrice - lowPrice

  return (
    <div>
      <h3>{getMake(filteredCars)}</h3>
      <p>total samples: {filteredCars.length}</p>
      <p>average price: {getAveragePrice(filteredCars)}</p>
      <p>mean price: {getMeanPrice(filteredCars)}</p>
      <p>low price: {lowPrice}</p>
      <p>high price: {highPrice}</p>
      <p>price range: {priceRange}</p>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      {formatInfo(volvos)}
      <br />
      <br />
      {formatInfo(teslas)}
    </div>
  );
}

export default App;
