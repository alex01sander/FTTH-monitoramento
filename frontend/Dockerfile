# Construção do React
FROM node:18 AS builder

WORKDIR /app

# Copia os arquivos necessários para o gerenciamento de dependências do Yarn
COPY package.json yarn.lock ./

# Instala as dependências
RUN yarn install

# Copia o restante dos arquivos do projeto
COPY . .

# Define a variável de ambiente para corrigir erro do OpenSSL com Webpack
ENV NODE_OPTIONS="--openssl-legacy-provider"

# Compila o projeto React
RUN yarn build

# Servindo com Nginx
FROM nginx:latest

# Copia os arquivos de build para o Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Expõe a porta 80 para o serviço web
EXPOSE 80

# Inicia o servidor Nginx
CMD ["nginx", "-g", "daemon off;"]
