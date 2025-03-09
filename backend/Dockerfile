# Usar uma imagem oficial do Node.js como base
FROM node:18

# Criar diretório de trabalho
WORKDIR /app

# Copiar arquivos do projeto
COPY package.json package-lock.json ./

# Instalar dependências
RUN npm install

# Copiar todo o código para dentro do container
COPY . .

# Expor a porta usada pelo servidor
EXPOSE 5000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start"]
