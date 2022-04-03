FROM node:17.6.0-alpine

#me posisiciono en el directorio que voy a tener la app
WORKDIR /app

## cambio timezone del contenedor
RUN apk add tzdata && cp /usr/share/zoneinfo/America/Buenos_Aires /etc/localtime;
RUN echo "America/Buenos_Aires" >  /etc/timezone ;

## compio archivos de dependencias
COPY package*.json ./

## instalo dependencias
RUN npm install \
    npm cache clean --force --loglevel=error;

## copio resto de los archivos 
## para no depender de los archivos del host dentro del contenedor
COPY . .


CMD ["npm", "start"]