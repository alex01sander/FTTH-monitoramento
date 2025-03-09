import ConnectionPoint from "../models/ConnectionPoint";
import { io } from "../server";

export const checkForAlerts = async () => {
  const inactivePoints = await ConnectionPoint.find({ status: "inativo" });

  if (inactivePoints.length > 0) {
    io.emit("alert", {
      message: "🚨 ALERTA! Pontos inativos detectados",
      data: inactivePoints,
    });
  }
};

setInterval(checkForAlerts, 60000); // Verificar a cada 1 minuto
