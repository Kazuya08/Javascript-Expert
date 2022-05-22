const { describe, it, before } = require("mocha");
const CarService = require("./../../src/service/carService");

const { join } = require("path");

const carsDatabase = join(__dirname, "./../../database/", "cars.json");

describe("CarService Suite Tests", () => {
  let carService = {};
  before(() => {
    carService = new CarService({
      cars: carsDatabase,
    });
  });
  it("given a carCategory it should return available car", async () => {
    const result = await carService.test(
      "b5b484d3-b451-462d-a7de-486a9ae7d15d"
    );
    console.log("result", result);
  });
});
