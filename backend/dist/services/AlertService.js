"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkForAlerts = void 0;
const ConnectionPoint_1 = __importDefault(require("../models/ConnectionPoint"));
const server_1 = require("../server");
const checkForAlerts = () => __awaiter(void 0, void 0, void 0, function* () {
    const inactivePoints = yield ConnectionPoint_1.default.find({ status: "inativo" });
    if (inactivePoints.length > 0) {
        server_1.io.emit("alert", {
            message: "🚨 ALERTA! Pontos inativos detectados",
            data: inactivePoints,
        });
    }
});
exports.checkForAlerts = checkForAlerts;
setInterval(exports.checkForAlerts, 60000); // Verificar a cada 1 minuto
