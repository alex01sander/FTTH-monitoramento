import React, { useState } from "react";
import AdminPanel from "./components/AdminPanel";
import ConnectionMap from "./components/ConnectionMap";
import Dashboard from "./components/Dashboard";
import { LoadScript } from "@react-google-maps/api";

// Função classNames para condicionalmente aplicar classes
const classNames = (...classes: string[]) => classes.filter(Boolean).join(" ");

const App: React.FC = () => {
  const [view, setView] = useState<"dashboard" | "map" | "admin">("dashboard");
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // Callback para quando o script do Google Maps estiver carregado
  const handleScriptLoad = () => {
    setIsScriptLoaded(true);
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-8 text-center">
          FTTH Monitoramento
        </h2>
        <ul className="space-y-6">
          <li>
            <button
              onClick={() => setView("dashboard")}
              className={classNames(
                "w-full py-2 text-left px-4 rounded",
                view === "dashboard" ? "bg-green-500" : "hover:bg-green-500"
              )}
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={() => setView("admin")}
              className={classNames(
                "w-full py-2 text-left px-4 rounded",
                view === "admin" ? "bg-red-500" : "hover:bg-red-500"
              )}
            >
              Painel Administrativo
            </button>
          </li>
          <li>
            <button
              onClick={() => setView("map")}
              className={classNames(
                "w-full py-2 text-left px-4 rounded",
                view === "map" ? "bg-blue-500" : "hover:bg-blue-500"
              )}
            >
              Mapa
            </button>
          </li>
        </ul>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 bg-gray-100 p-6">
        <LoadScript
          googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""}
          onLoad={handleScriptLoad}
        >
          {view === "admin" && <AdminPanel />}
          {view === "map" && isScriptLoaded && <ConnectionMap />}
          {view === "dashboard" && <Dashboard />}
        </LoadScript>
      </div>
    </div>
  );
};

export default App;
