# Seminario de Lenguajes JS

Levantar el Proyecto con Docker

Instalar docker


Windows: Link de descarga


macOS: Link de descarga


GNU/Linux: Link de Instalacion


para linux es necesario tener en consideracion 2 pasos de post-instalacion

    # Configure Docker to start on boot
    # para iniciar el serivicio al arrancar la pc
    sudo systemctl enable docker.service
    sudo systemctl enable containerd.service
    
    # Manage Docker as a non-root user
    # para agregar al usuario con al grupo docker, de esta manera no pide el sudo 
    # para este paso necesitas salir y volver a entrar en la sesion o reiniciar el equipo
    sudo usermod -aG docker $USER







Instalar dependencias del proyecto

    docker-compose build



Correr la aplicación

    docker-compose up



Levantar el Proyecto con NPM

Instalar NVM ( gestor de versiones de node y npm )


Windows: Link de Instalacion


macOS | GNU/Linux: Link de Instalacion



instalar dependencias

    npm install



Correr la aplicación

    npm start 
