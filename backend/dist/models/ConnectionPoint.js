"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ConnectionPointSchema = new mongoose_1.default.Schema({
    name: String,
    latitude: Number,
    longitude: Number,
    status: { type: String, enum: ["ativo", "inativo"], default: "ativo" },
});
exports.default = mongoose_1.default.model("ConnectionPoint", ConnectionPointSchema);
