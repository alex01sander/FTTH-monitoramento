import mongoose from "mongoose";

const ConnectionPointSchema = new mongoose.Schema({
  name: String,
  latitude: Number,
  longitude: Number,
  status: { type: String, enum: ["ativo", "inativo"], default: "ativo" },
});

export default mongoose.model("ConnectionPoint", ConnectionPointSchema);
