"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    },
};
exports.default = swaggerDocs;
