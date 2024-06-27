import jwt from "jsonwebtoken";

/**
Generates an access token for the user
@param {Object} user
@return {string} the token
*/
export function generateAccessToken(user) {
  return jwt.sign(user, process.env.PRIVATE_KEY, { expiresIn: "1h" });
}
