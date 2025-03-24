FTTH Monitoramento
Este projeto é uma aplicação para monitoramento de pontos de conexão de redes FTTH (Fiber To The Home). Ele oferece uma interface administrativa para gerenciar pontos de conexão, incluindo criação, atualização de status (ativo/inativo) e exclusão, além de exibir esses pontos em um mapa interativo. Também inclui uma funcionalidade de dashboard para análise de dados.

Tecnologias Utilizadas
Frontend: React, TypeScript, Axios, Google Maps API, Recharts, TailwindCSS
Backend: Node.js, Express, Mongoose (MongoDB), Socket.IO
Outros: Swagger para documentação da API, Docker para containerização
Funcionalidades
Painel Administrativo: Gerenciar pontos de conexão, criar novos pontos, editar o status (ativo/inativo) e excluir pontos.
Mapa de Conexões: Exibe os pontos de conexão em um mapa interativo utilizando a API do Google Maps, com clusters de marcadores para facilitar a visualização.
Dashboard: Exibe gráficos de distribuição dos pontos (ativos e inativos) e o status por ponto.
API Documentada: Utiliza Swagger para fornecer uma interface visual de documentação e testes da API.
Pré-requisitos
Node.js (v16 ou superior)
MongoDB (ou conta MongoDB Atlas)
Google Maps API Key (necessário para carregar o mapa)
Ambiente de desenvolvimento (IDE ou editor de sua preferência)
Instalação
Clone o repositório:

bash
Copy
git clone https://github.com/seu-usuario/ftth-monitoramento.git
Instale as dependências do Backend:

Navegue para a pasta backend/:
bash
Copy
cd backend
Instale as dependências:
bash
Copy
npm install
Instale as dependências do Frontend:

Navegue para a pasta frontend/:
bash
Copy
cd frontend
Instale as dependências:
bash
Copy
npm install
Configuração do .env:

No diretório backend/, crie um arquivo .env com as seguintes variáveis:
env
Copy
MONGO_URI=mongodb://localhost:27017/ftth
GOOGLE_MAPS_API_KEY=sua-api-key
No diretório frontend/, crie um arquivo .env com a variável da API Key do Google Maps:
env
Copy
REACT_APP_GOOGLE_MAPS_API_KEY=sua-api-key
Rodando a aplicação:

No diretório backend/, rode o servidor:
bash
Copy
npm run dev
No diretório frontend/, inicie o servidor de desenvolvimento:
bash
Copy
npm start
Acesse a aplicação no navegador:

A aplicação estará rodando no http://localhost:3000 (frontend) e o backend estará na porta 5000.
Swagger:

Acesse a documentação da API em: http://localhost:5000/api-docs
Estrutura do Projeto
Backend

src/server.ts: Arquivo principal do servidor.
src/routes/connectionRoutes.ts: Rotas para gerenciamento dos pontos de conexão.
src/models/ConnectionPoint.ts: Modelo do MongoDB para os pontos de conexão.
src/services/AlertService.ts: Serviço para monitoramento de pontos inativos.
src/swagger.ts: Documentação da API usando Swagger.
Frontend

src/components/ConnectionMap.tsx: Componente que exibe o mapa e os pontos de conexão.
src/components/AdminPanel.tsx: Painel administrativo para gerenciar os pontos.
src/components/Dashboard.tsx: Dashboard para visualização de gráficos de status.
src/App.tsx: Componente principal que organiza a navegação entre as diferentes views.
Rotas da API
GET /connections: Lista todos os pontos de conexão.
POST /connections: Cria um novo ponto de conexão.
PUT /connections/:id: Atualiza o status de um ponto de conexão.
DELETE /connections/:id: Exclui um ponto de conexão.
Exemplo de Requisições
POST /connections
Criação de ponto de conexão:

json
Copy
{
"name": "Ponto 1",
"latitude": -23.55052,
"longitude": -46.633308,
"status": "ativo"
}
PUT /connections/:id
Atualiza o status de um ponto de conexão:

json
Copy
{
"status": "inativo"
}
DELETE /connections/:id
Deleta um ponto de conexão:

json
Copy
{
"message": "Ponto excluído com sucesso."
}
Contribuição
Contribuições são bem-vindas! Para contribuir, siga estas etapas:

Fork este repositório.
Crie um branch para sua feature (git checkout -b minha-feature).
Faça suas alterações e commit (git commit -am 'Adiciona nova feature').
Push para o branch (git push origin minha-feature).
Crie um novo Pull Request.
Licença
Este projeto está licenciado sob a MIT License - veja o arquivo LICENSE para mais detalhes.
