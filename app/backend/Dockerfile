FROM node:16.15-alpine
WORKDIR /app-backend
COPY ["package.json", "package-lock.json", "packages.npm", "./"]
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "run", "dev"]