function degreesToRadians(degrees) {
	return (degrees * Math.PI) / 180;
}

/**
function for calculating the distance between two points on the earth
@param {object} coords1 - object with lat and lon properties of the first point
@param {object} coords2 - object with lat and lon properties of the second point
@return {number} - distance between the two points in kilometers
source: https://stackoverflow.com/questions/365826/calculate-distance-between-2-gps-coordinates
*/
export function distanceInKmBetweenEarthCoordinates(coords1, coords2) {
	const earthRadiusKm = 6371;

	const dLat = degreesToRadians(coords2.latitude - coords1.latitude);
	const dLon = degreesToRadians(coords2.longitude - coords1.longitude);

	const lat1 = degreesToRadians(coords1.latitude);
	const lat2 = degreesToRadians(coords2.latitude);

	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return earthRadiusKm * c;
}
