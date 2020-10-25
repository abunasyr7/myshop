#Определяем базовый образ, который будет взят за основу
FROM node:12
#Создание директории приложения
WORKDIR /usr/src/app
# установка зависимотсей 
# символ астериск (*) используется для того, чтобы по возможности
# скопировать оба файла: package.json и package-lock.json
COPY package*.json ./

RUN npm install
# копируем исходный код
COPY . .
EXPOSE 3000
CMD ["npm", "start"]