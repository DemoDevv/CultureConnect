import { stopDao } from "../dao/stopDao.mjs";
import { distanceInKmBetweenEarthCoordinates } from "../helpers/coords.mjs";

const stopController = {
  getAllStopsAroundMuseum: async (museum) => {
    const stops = stopDao.getByCity(museum.city);
    const nearestStops = stops.filter((stop) => {
      const distance = distanceInKmBetweenEarthCoordinates(
        museum.coordinates,
        stop.coordinates,
      );
      return distance < 50;
    });
    return nearestStops;
  },
};

export default stopController;
