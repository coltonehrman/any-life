import { Car } from "./car.model.js";
import { Chance } from "chance";
import { Money } from "../items/money.model.js";

const chance = new Chance();

const brands = [
  "Ford",
  "Chevrolet",
  "Toyota",
  "Honda",
  "BMW",
  "Mercedes",
  "Audi",
  "Lamborghini",
  "Ferrari",
  "Porsche",
];

const models = [
  "Sedan",
  "SUV",
  "Coupe",
  "Convertible",
  "Hatchback",
  "Truck",
  "Van",
  "Sports Car",
  "Luxury Car",
];

const carNames = {
  Ford: ["Mustang", "Focus", "Explorer"],
  Chevrolet: ["Camaro", "Malibu", "Tahoe"],
  Toyota: ["Corolla", "Camry", "RAV4"],
  Honda: ["Civic", "Accord", "CR-V"],
  BMW: ["3 Series", "X5", "Z4"],
  Mercedes: ["C-Class", "GLC", "SLS"],
  Audi: ["A4", "Q5", "R8"],
  Lamborghini: ["Aventador", "Huracan", "Gallardo"],
  Ferrari: ["488", "Portofino", "Roma"],
  Porsche: ["911", "Cayenne", "Panamera"],
};

function generateRandomCar() {
  const brand = chance.pickone(brands);
  const model = chance.pickone(models);
  const name = chance.pickone(carNames[brand]);

  const car = {
    name: name,
    brand: brand,
    model: model,
    acceleration: chance.floating({ min: 2.5, max: 10.0, fixed: 1 }),
    topSpeed: chance.integer({ min: 100, max: 250 }),
    condition: chance.integer({ min: 50, max: 100 }),
    handling: chance.floating({ min: 1.0, max: 10.0, fixed: 1 }),
    value: Money.random({ min: 5000, max: 100000 }),
  };

  return car;
}

export function generateRandomCars(count) {
  const cars = [];
  for (let i = 0; i < count; i++) {
    cars.push(new Car(generateRandomCar()));
  }
  return cars;
}

export let cars = generateRandomCars(20);
export const getCarById = (id) => cars.find((c) => c.id === id);
export const removeCarById = (id) => (cars = cars.filter((c) => c.id !== id));
