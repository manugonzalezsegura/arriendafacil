# Usa una imagen ligera de Node.js
FROM node:18

# Directorio de trabajo
WORKDIR /app

# Copia archivos de configuración y dependencias
COPY package*.json ./
COPY config/env.js ./config/
COPY . .

# Instala dependencias
RUN npm install --production

# Expone el puerto definido en env.js (ej: 3004)
EXPOSE ${PORT_PROFILE}

# Comando para iniciar el servicio
CMD ["node", "server.js"]