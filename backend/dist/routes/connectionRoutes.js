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
const express_1 = require("express");
const ConnectionPoint_1 = __importDefault(require("../models/ConnectionPoint"));
const server_1 = require("../server");
const router = (0, express_1.Router)();
// Criar ponto de conexão
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const point = new ConnectionPoint_1.default(req.body);
        yield point.save();
        server_1.io.emit("update", point);
        res.status(201).json(point);
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
// Listar pontos de conexão
router.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const points = yield ConnectionPoint_1.default.find();
        res.json(points);
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
// Atualizar status
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const point = yield ConnectionPoint_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        server_1.io.emit("update", point);
        res.json(point);
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
// Excluir ponto
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ConnectionPoint_1.default.findByIdAndDelete(req.params.id);
        server_1.io.emit("update");
        res.status(204).end();
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
exports.default = router;
