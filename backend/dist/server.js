"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/ftth";
const httpServer = (0, http_1.createServer)(app_1.default);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
    },
});
exports.io = io;
mongoose_1.default
    .connect(MONGO_URI)
    .then(() => console.log("MongoDB conectado"))
    .catch((err) => console.error("Erro ao conectar MongoDB:", err));
httpServer.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
