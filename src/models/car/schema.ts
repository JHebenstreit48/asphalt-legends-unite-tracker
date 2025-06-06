import mongoose, { Schema } from "mongoose";
import { baseCarInfo } from "@/models/car/baseCarInfo";
import { blueprints } from "@/models/car/blueprints";
import { stockStats } from "@/models/car/stockStats";
import { oneStarMaxStats } from "@/models/car/oneStarMaxStats";
import { twoStarMaxStats } from "@/models/car/twoStarMaxStats";
import { goldMaxStats } from "@/models/car/goldMaxStats";
import { threeStarMaxStats } from "./threeStarMaxStats";
import { fourStarMaxStats } from "./fourStarMaxStats";
import { fiveStarMaxStats } from "./fiveStarMaxStats";
import { sixStarMaxStats } from "./sixStarMaxStats";

const carSchemaFields = {
  _id: { type: Schema.Types.ObjectId, auto: true },
  ...baseCarInfo,
  ...blueprints,
  ...stockStats,
  ...oneStarMaxStats,
  ...twoStarMaxStats,
  ...threeStarMaxStats,
  ...fourStarMaxStats,
  ...fiveStarMaxStats,
  ...sixStarMaxStats,
  ...goldMaxStats
};

const carSchema = new Schema(carSchemaFields);
const CarModel = mongoose.model("Car", carSchema);
export default CarModel;
