function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

/**
function for calculating the distance between two points on the earth
@param {number} lat1 - latitude of the first point
@param {number} lon1 - longitude of the first point
@param {number} lat2 - latitude of the second point
@param {number} lon2 - longitude of the second point
@return {number} - distance between the two points in kilometers
source: https://stackoverflow.com/questions/365826/calculate-distance-between-2-gps-coordinates
*/
export function distanceInKmBetweenEarthCoordinates(coords1, coords2) {
  const earthRadiusKm = 6371;

  const dLat = degreesToRadians(coords2.lat - coords1.lat);
  const dLon = degreesToRadians(coords2.lon - coords1.lon);

  const lat1 = degreesToRadians(coords1.lat);
  const lat2 = degreesToRadians(coords2.lat);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
}
