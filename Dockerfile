# Usar una imagen base de Node.js ligera
FROM node:18-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de dependencias
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto que usará la aplicación (3000)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
