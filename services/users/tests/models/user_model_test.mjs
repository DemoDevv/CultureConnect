import { assert, should, expect } from "chai";
import User from "../../api/models/user.mjs";

describe("User model test", function () {
  const user = new User({
    id: 1,
    pseudonyme: "User1",
    email: "user1@example.com",
    password: "testing",
  });

  it("create", () => {
    expect(user).have.property("pseudonyme", "User1");
    expect(user).have.property("email", "user1@example.com");
  });
});
