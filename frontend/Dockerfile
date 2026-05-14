# Usamos una imagen de Node ligera
FROM node:20-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de dependencias primero para aprovechar el cache de Docker
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto del código
COPY . .

# Exponemos el puerto que usa Vite (por defecto 5173)
EXPOSE 5173

# Comando para correr en modo desarrollo
CMD ["npm", "run", "dev"]