import app from "./app";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/ftth";

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Erro ao conectar MongoDB:", err));

httpServer.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export { io };
