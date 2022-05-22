const Baserepository = require("./../repository/base/baseRepository");

class CarService {
  constructor({ cars }) {
    this.carRepository = new Baserepository({ file: cars });
  }

  // test(id) {
  //   return this.carRepository.find(id);
  // }

  async getAvailableCar(carCategory) {
    return null;
  }
}

module.exports = CarService;
