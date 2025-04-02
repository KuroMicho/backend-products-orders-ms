FROM node:18-alpine

WORKDIR /app

# 1. Copiar solo los archivos esenciales primero
COPY package.json tsconfig.json ./

# 2. Instalar todas las dependencias (incluyendo devDependencies)
RUN npm install --include=dev

# 3. Copiar toda la estructura de directorios
COPY . .

# 4. Compilación TypeScript con verificación previa
RUN npm run compile

# 5. Limpieza para producción (opcional)
RUN npm prune --omit=dev

EXPOSE 4000
CMD ["node", "dist/app.js"]