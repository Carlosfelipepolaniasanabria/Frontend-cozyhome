# Imagen base de Node
FROM node:20

# Carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copiamos package.json y package-lock.json
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos todo el proyecto
COPY . .

# Exponemos el puerto 3000
EXPOSE 3000

# Comando para iniciar React
CMD ["npm", "start"]
