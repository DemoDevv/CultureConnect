import bcrypt from "bcrypt";

// Number of rounds to use for hashing
const saltRounds = 10;

/**
  Hashes a password

  * @param {string} password
  * @return {string} the hashed password
*/
function hashPassword(password) {
	return bcrypt.hashSync(password, saltRounds);
}

/**
  Compares a password with a hash

  * @param {string} password
  * @param {string} hash
  * @return {boolean} true if the password matches the hash, false otherwise
*/
function comparePassword(password, hash) {
	return bcrypt.compareSync(password, hash);
}

export { hashPassword, comparePassword };
