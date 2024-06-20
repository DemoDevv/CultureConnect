/**
 * @class User
 * @classdesc This class represents a user
 * @property {number} id - The id of the user, primary key in the database
 * @property {string} pseudonyme - The pseudonyme of the user
 * @property {string} email - The email of the user
 * @property {string} password - The password hash of the user
 * @property {Array<number>} favoris - The list of the ids of the museums and artworks that the user has liked
 */
export default class User {
  id;
  pseudonyme;
  email;
  password;
  favoris;

  constructor(obj) {
    this.id = obj.id;
    this.pseudonyme = obj.pseudonyme;
    this.email = obj.email;
    this.password = obj.password;
    this.favoris = obj.favoris;
  }
}
