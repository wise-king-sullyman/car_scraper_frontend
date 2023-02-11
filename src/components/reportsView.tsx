import React from "react";
import { Card, CardTitle, CardBody } from "@patternfly/react-core";

export interface partialInfoCar {
  title: string;
  type: string;
  mileage?: string;
  price?: string;
  distance?: string;
  link: string;
}

export interface car extends partialInfoCar {
  mileage: string;
  price: string;
  distance: string;
}

const CarCard = (car: partialInfoCar) => {
  return (
    <Card>
      <CardTitle>{car.title}</CardTitle>
      <CardBody>{car.price}</CardBody>
      <CardBody>{car.mileage}</CardBody>
      <CardBody>{car.distance}</CardBody>
      <CardBody>
        <a href={car.link}>{car.link}</a>
      </CardBody>
    </Card>
  );
};

export interface ReportsViewProps {
  children?: partialInfoCar[];
}

export const ReportsView: React.FunctionComponent<ReportsViewProps> = ({
  children,
}: ReportsViewProps) => {
  // function filtercars(cars: partialInfoCar[]) {
  //   return cars.filter((car): car is car =>
  //     car.mileage && car.price && car.distance ? true : false
  //   );
  // }

  // function getAveragePrice(cars: car[]) {
  //   const sum = cars.reduce((acc, car) => acc + parseInt(car.price), 0);
  //   return sum / cars.length;
  // }

  // function getMeanPrice(cars: car[]) {
  //   const mean = Math.round(cars.length / 2);
  //   return cars[mean].price;
  // }

  // function formatInfo(cars: partialInfoCar[]) {
  //   const filteredCars = filtercars(cars);
  //   const count = filteredCars.length;
  //   const lowPrice = parseInt(filteredCars[0].price);
  //   const highPrice = parseInt(filteredCars[count - 1].price);
  //   const priceRange = highPrice - lowPrice;

  //   return (
  //     <div>
  //       <h3>{"foo"}</h3>
  //       <p>total samples: {filteredCars.length}</p>
  //       <p>average price: {getAveragePrice(filteredCars)}</p>
  //       <p>mean price: {getMeanPrice(filteredCars)}</p>
  //       <p>low price: {lowPrice}</p>
  //       <p>high price: {highPrice}</p>
  //       <p>price range: {priceRange}</p>
  //     </div>
  //   );
  // }

  const cards = children?.map((car) => CarCard(car));

  return <div>{cards}</div>;
};
