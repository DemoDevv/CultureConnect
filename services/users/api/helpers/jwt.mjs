import jwt from "jsonwebtoken";

/**
Generates an access token for the user
@param {Object} user
@return {string} the token
*/
export function generateAccessToken(user) {
	//  TODO change back to 15 minutes
	return jwt.sign(user, process.env.PRIVATE_KEY, { expiresIn: "2h" });
	// return jwt.sign(user, process.env.PRIVATE_KEY, { expiresIn: "15m" });
}
