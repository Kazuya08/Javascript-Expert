const https = require("https");
class Service {
  async makeRequest(url) {
    return new Promise((resolve, reject) => {
      https.get(url, (response) => {
        response.on("data", (data) => resolve(JSON.parse(data)));
        response.on("error", reject);
      });
    });
  }
  async getPlanets(url) {
    const result = await this.makeRequest(url);

    return {
      name: result.name,
      surface_water: result.surface_water,
      appearedIn: result.films.length,
    };
  }
}

// (async () => {
//   const response = await new Service().makeRequest(
//     "https://swapi.dev/api/planets/1/"
//   );
//   console.log("response", response);
// })();

module.exports = Service;
