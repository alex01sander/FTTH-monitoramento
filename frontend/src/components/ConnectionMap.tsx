import React, { useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  MarkerClusterer,
} from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "calc(100vh - 80px)", // Ajusta para que o mapa ocupe toda a altura disponível, considerando a altura dos botões
};

const center = {
  lat: -27.595377, // Coordenadas de SC
  lng: -48.548045,
};

interface ConnectionPoint {
  id: string;
  name: string;
  status: string;
  latitude: number;
  longitude: number;
}

const ConnectionMap: React.FC = () => {
  const [points, setPoints] = useState<ConnectionPoint[]>([]);
  const [filteredPoints, setFilteredPoints] = useState<ConnectionPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<ConnectionPoint | null>(
    null
  );

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/connections");
      if (!response.ok) {
        throw new Error(`Erro na API: ${response.statusText}`);
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setPoints(data);
        setFilteredPoints(data); // Inicializa com todos os pontos
      } else {
        setError("Estrutura de dados inválida.");
      }
    } catch (err) {
      setError("Erro ao carregar pontos de conexão.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Ajuste do centro do mapa conforme os pontos
  const mapCenter = points.length
    ? { lat: points[0].latitude, lng: points[0].longitude }
    : center;

  // Filtra os pontos conforme o status
  const filterPoints = (status: string) => {
    if (status === "todos") {
      setFilteredPoints(points); // Exibe todos os pontos
    } else {
      setFilteredPoints(points.filter((point) => point.status === status)); // Exibe apenas os ativos ou inativos
    }
  };

  if (loading) return <div>Carregando mapa...</div>;
  if (error) return <div>{`Erro: ${error}`}</div>;

  return (
    <div>
      {/* Botões de filtro */}
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={() => filterPoints("todos")}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
        >
          Todos
        </button>
        <button
          onClick={() => filterPoints("ativo")}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
        >
          Ativos
        </button>
        <button
          onClick={() => filterPoints("inativo")}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
        >
          Inativos
        </button>
      </div>

      {/* Mapa */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={12}
        options={{
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
        }}
      >
        <MarkerClusterer>
          {(clusterer) => (
            <>
              {filteredPoints.length === 0 ? (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl text-gray-500">
                  Nenhum ponto encontrado.
                </div>
              ) : (
                filteredPoints.map((point) => (
                  <Marker
                    key={point.id || `${point.latitude}-${point.longitude}`} // Garantindo chave única
                    position={{ lat: point.latitude, lng: point.longitude }}
                    title={point.name}
                    icon={
                      point.status === "ativo"
                        ? "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                        : "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                    }
                    clusterer={clusterer} // Para agrupar os marcadores
                    onClick={() => setSelectedPoint(point)} // Ao clicar no marcador
                  />
                ))
              )}
            </>
          )}
        </MarkerClusterer>

        {selectedPoint && (
          <InfoWindow
            position={{
              lat: selectedPoint.latitude,
              lng: selectedPoint.longitude,
            }}
            onCloseClick={() => setSelectedPoint(null)}
          >
            <div>
              <h4>{selectedPoint.name}</h4>
              <p>Status: {selectedPoint.status}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default ConnectionMap;
