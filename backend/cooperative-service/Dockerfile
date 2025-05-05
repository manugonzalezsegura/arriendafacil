#backend/cooperative-service/Dockerfile 
# Usa una imagen base oficial de Node
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos necesarios al contenedor
COPY package*.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia todo el código fuente al contenedor
COPY . .

# Expón el puerto
EXPOSE 3002

# Comando para ejecutar tu app
CMD ["npm", "start"]
