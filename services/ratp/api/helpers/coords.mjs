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
function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
  var earthRadiusKm = 6371;

  var dLat = degreesToRadians(lat2 - lat1);
  var dLon = degreesToRadians(lon2 - lon1);

  lat1 = degreesToRadians(lat1);
  lat2 = degreesToRadians(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
}
