import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectionRoutes from "./routes/connectionRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use("/connections", connectionRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default app;
