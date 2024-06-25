import { stopDao } from "../dao/stopDao.mjs";
import { distanceInKmBetweenEarthCoordinates } from "../helpers/coords.mjs";

const stopController = {
  getAllStopsAroundMuseum: async (museum) => {
    const stops = await stopDao.getByCity(museum.city);

    console.log(stops.length);

    if (!stops) return [];

    const nearestStops = stops.filter((stop) => {
      const distance = distanceInKmBetweenEarthCoordinates(
        museum.coordinates,
        stop.coordinates
      );

      return distance < 0.5;
    });
    return nearestStops;
  },
};

export default stopController;
