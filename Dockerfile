# Usar una imagen base de Node.js ligera
FROM node:18-alpine

# Directorio de trabajo en el contenedor
WORKDIR /app

# 1. Copiar SOLO los package.json de tu backend
COPY capital_flow_backend/package*.json ./

# 2. Instalar dependencias
RUN npm install

# 3. Copiar el resto del código del backend
COPY capital_flow_backend/ ./

# 4. Exponer el puerto (asegúrate de que tu backend use el 3000)
EXPOSE 3000

# 5. Iniciar la aplicación backend
CMD ["npm", "start"]
