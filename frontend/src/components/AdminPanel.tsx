import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa"; // Para ícones

interface ConnectionPoint {
  _id: string;
  name: string;
  status: string;
  latitude: number;
  longitude: number;
}

const AdminPanel: React.FC = () => {
  const [points, setPoints] = useState<ConnectionPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const [newPoint, setNewPoint] = useState({
    name: "",
    cep: "",
    status: "ativo",
  });

  const [locationDetails, setLocationDetails] = useState<string | null>(null);

  useEffect(() => {
    fetchPoints();
  }, []);

  const fetchPoints = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/connections");
      setPoints(response.data);
    } catch (error) {
      setError("Erro ao carregar os pontos.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    setIsUpdating(id);
    try {
      await axios.put(`http://localhost:5000/connections/${id}`, {
        status: newStatus,
      });
      setPoints((prevPoints) =>
        prevPoints.map((point) =>
          point._id === id ? { ...point, status: newStatus } : point
        )
      );
    } catch (error) {
      setError("Erro ao atualizar o status do ponto.");
    } finally {
      setIsUpdating(null);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/connections/${id}`);
      setPoints((prevPoints) => prevPoints.filter((point) => point._id !== id));
    } catch (error) {
      setError("Erro ao excluir o ponto.");
    }
  };

  const handleCreatePoint = async () => {
    if (!newPoint.name || !newPoint.cep) {
      alert("Preencha todos os campos antes de cadastrar.");
      return;
    }

    const cleanCep = newPoint.cep.replace(/\D/g, "");
    const formattedCep = `${cleanCep.slice(0, 5)}-${cleanCep.slice(5)}`;

    if (cleanCep.length !== 8) {
      alert("Por favor, insira um CEP válido com 8 dígitos.");
      return;
    }

    try {
      const response = await axios.get(
        `https://viacep.com.br/ws/${formattedCep}/json/`
      );

      if (response.data.erro) {
        alert("Não foi possível encontrar o endereço para esse CEP.");
        return;
      }

      const { logradouro, bairro, localidade, uf } = response.data;

      const locationDetails = `${logradouro}, ${bairro}, ${localidade} - ${uf}`;
      setLocationDetails(locationDetails);

      const geoResponse = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${logradouro},${bairro},${localidade},${uf}`
      );

      if (geoResponse.data.length === 0) {
        alert("Não foi possível encontrar as coordenadas para esse endereço.");
        return;
      }

      const { lat, lon } = geoResponse.data[0];

      const responsePost = await axios.post(
        "http://localhost:5000/connections",
        {
          name: newPoint.name,
          cep: newPoint.cep,
          status: newPoint.status,
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
        }
      );

      setPoints((prevPoints) => [...prevPoints, responsePost.data]);
      setNewPoint({ name: "", cep: "", status: "ativo" });
    } catch (error) {
      setError("Erro ao cadastrar o novo ponto.");
    }
  };

  if (loading)
    return <div className="text-center text-blue-500">Carregando...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="admin-panel bg-gray-100 p-8 rounded-lg shadow-lg w-full max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">
        Painel Administrativo
      </h2>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4">Criar Novo Ponto</h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nome"
            value={newPoint.name}
            onChange={(e) => setNewPoint({ ...newPoint, name: e.target.value })}
            className="p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="CEP"
            value={newPoint.cep}
            onChange={(e) => setNewPoint({ ...newPoint, cep: e.target.value })}
            className="p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={newPoint.status}
          onChange={(e) => setNewPoint({ ...newPoint, status: e.target.value })}
          className="p-2 border rounded-lg w-full mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="ativo">Ativo</option>
          <option value="inativo">Inativo</option>
        </select>
        {locationDetails && (
          <div className="mt-2 text-sm text-gray-500">
            Localização encontrada: {locationDetails}
          </div>
        )}
        <button
          onClick={handleCreatePoint}
          className="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Criar Ponto
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Gerenciar Pontos</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Nome</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {points.map((point) => (
              <tr key={point._id} className="text-center">
                <td className="border p-2">{point.name}</td>
                <td
                  className={`border p-2 font-bold ${
                    point.status === "ativo" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {point.status}
                </td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() =>
                      updateStatus(
                        point._id,
                        point.status === "ativo" ? "inativo" : "ativo"
                      )
                    }
                    disabled={isUpdating === point._id}
                    className={`px-3 py-1 text-white rounded transition ${
                      point.status === "ativo"
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    } ${
                      isUpdating === point._id
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {isUpdating === point._id
                      ? "Atualizando..."
                      : point.status === "ativo"
                      ? "Desativar"
                      : "Ativar"}
                  </button>
                  <button
                    onClick={() => handleDelete(point._id)}
                    className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
