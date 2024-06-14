import { assert, should, expect } from "chai";
import Museum from "../../api/models/museum.mjs";

describe("Museum model test", function () {
  const museum = new Museum({
    id: 1,
    museofile: "M1",
    name: "Museum1",
    coordinates: {
      longitude: 20,
      latitude: 20,
    },
    address: "Road 1",
    url: "https://example.com",
    city: "Nantes",
  });

  it("create", () => {
    expect(museum).have.property("city", "Nantes");
    expect(museum.coordinates).have.property("longitude", 20);
    expect(museum).have.property("name", "Museum1");
  });
});
