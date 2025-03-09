const swaggerDocs = {
  openapi: "3.0.0",
  info: {
    title: "FTTH API",
    version: "1.0.0",
    description: "API para monitoramento de redes de fibra óptica",
  },
  paths: {
    "/connections": {
      get: {
        summary: "Listar pontos de conexão",
        responses: {
          "200": {
            description: "Lista de pontos de conexão",
          },
        },
      },
      post: {
        summary: "Criar um ponto de conexão",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  latitude: { type: "number" },
                  longitude: { type: "number" },
                  status: { type: "string", enum: ["ativo", "inativo"] },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Ponto criado",
          },
        },
      },
    },
    "/connections/{id}": {
      put: {
        summary: "Atualizar o status de um ponto de conexão",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            description: "ID do ponto de conexão a ser atualizado",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  latitude: { type: "number" },
                  longitude: { type: "number" },
                  status: { type: "string", enum: ["ativo", "inativo"] },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Ponto atualizado com sucesso",
          },
          "404": {
            description: "Ponto não encontrado",
          },
        },
      },
      delete: {
        summary: "Excluir um ponto de conexão",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            description: "ID do ponto de conexão a ser excluído",
          },
        ],
        responses: {
          "204": {
            description: "Ponto excluído com sucesso",
          },
          "404": {
            description: "Ponto não encontrado",
          },
        },
      },
    },
  },
};

export default swaggerDocs;
