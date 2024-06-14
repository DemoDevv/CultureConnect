import mongoose from "mongoose";

const coordinatesSchema = new mongoose.Schema(
  {
    longitude: {
      type: Number,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
);

export { coordinatesSchema };
