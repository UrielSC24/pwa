# Usar una imagen base de Node.js ligera
FROM node:18-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# 1. Copiar los archivos de dependencias de la RAÍZ de tu repositorio
COPY package*.json ./

# 2. Instalar las dependencias
RUN npm install

# 3. Copiar TODO el código de tu repositorio al contenedor
COPY . .

# 4. Exponer el puerto (Asegúrate de que tu server.js use el puerto 3000)
EXPOSE 3000

# 5. Iniciar la aplicación apuntando directo a tu archivo del backend
CMD ["node", "capital_flow_backend/server.js"]
