import { Router } from "express";
import ConnectionPoint from "../models/ConnectionPoint";
import { io } from "../server";

const router = Router();

// Criar ponto de conexão
router.post("/", async (req, res) => {
  try {
    const point = new ConnectionPoint(req.body);
    await point.save();
    io.emit("update", point);
    res.status(201).json(point);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Listar pontos de conexão
router.get("/", async (_req, res) => {
  try {
    const points = await ConnectionPoint.find();
    res.json(points);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Atualizar status
router.put("/:id", async (req, res) => {
  try {
    const point = await ConnectionPoint.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    io.emit("update", point);
    res.json(point);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Excluir ponto
router.delete("/:id", async (req, res) => {
  try {
    await ConnectionPoint.findByIdAndDelete(req.params.id);
    io.emit("update");
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
