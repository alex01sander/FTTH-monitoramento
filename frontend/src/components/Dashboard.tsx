import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

const API_URL = "http://localhost:5000"; // URL do backend

interface ConnectionPoint {
  _id: string;
  name: string;
  status: string;
}

const Dashboard: React.FC = () => {
  const [points, setPoints] = useState<ConnectionPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await axios.get(`${API_URL}/connections`);
        setPoints(response.data);
      } catch (error) {
        setError("Erro ao carregar os pontos.");
      } finally {
        setLoading(false);
      }
    };
    fetchPoints();
  }, []);

  if (loading)
    return <div className="text-center text-blue-500">Carregando...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  // Contar quantidade de pontos ativos e inativos
  const activeCount = points.filter((p) => p.status === "ativo").length;
  const inactiveCount = points.filter((p) => p.status === "inativo").length;

  const dataPie = [
    { name: "Ativos", value: activeCount },
    { name: "Inativos", value: inactiveCount },
  ];

  const dataBar = points.map((point, index) => ({
    name: `Ponto ${index + 1}`,
    status: point.status === "ativo" ? 1 : 0,
  }));

  const COLORS = ["#00C49F", "#FF8042"];

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gráfico de Pizza */}
        <div className="p-4 border rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Distribuição de Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dataPie}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {dataPie.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Barras */}
        <div className="p-4 border rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Status por Ponto</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataBar}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="status" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
