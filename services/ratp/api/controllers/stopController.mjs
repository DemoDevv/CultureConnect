import { stopDao } from "../dao/stopDao.mjs";
import { distanceInKmBetweenEarthCoordinates } from "../helpers/coords.mjs";

const stopController = {
  getAllStopsAroundMuseum: async (museum) => {
    const stops = await stopDao.getByCity(museum.city);

    if (!stops) return [];

    // Filter stops within 0.5 km of the museum
    const nearestStops = stops.filter((stop) => {
      const distance = distanceInKmBetweenEarthCoordinates(
        museum.coordinates,
        stop.coordinates,
      );

      return distance < 0.5;
    });
    return nearestStops;
  },
};

export default stopController;
