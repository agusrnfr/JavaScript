# Seminario de Lenguajes JS

## Levantar el Proyecto con Docker

### Instalar docker

* **Windows**: [Link de descarga](https://hub.docker.com/editions/community/docker-ce-desktop-windows/)

* **macOS**: [Link de descarga](https://docs.docker.com/docker-for-mac/install/)

* **GNU/Linux**: [Link de Instalacion](https://docs.docker.com/engine/install/)
  
  * para linux es necesario tener en consideracion 2 pasos de [post-instalacion](https://docs.docker.com/engine/install/linux-postinstall/)

    ```bash
        # Configure Docker to start on boot
        # para iniciar el serivicio al arrancar la pc
        sudo systemctl enable docker.service
        sudo systemctl enable containerd.service
        
        # Manage Docker as a non-root user
        # para agregar al usuario con al grupo docker, de esta manera no pide el sudo 
        # para este paso necesitas salir y volver a entrar en la sesion o reiniciar el equipo
        sudo usermod -aG docker $USER
    ```

### Instalar dependencias del proyecto

```bash
    docker-compose build
```

### Correr la aplicación

```bash
    docker-compose up
```

## Levantar el Proyecto con NPM

### Instalar NVM ( gestor de versiones de node y npm )

* **Windows**: [Link de Instalacion](https://github.com/coreybutler/nvm-windows)
* **macOS | GNU/Linux**: [Link de Instalacion](https://github.com/nvm-sh/nvm)

### instalar dependencias

```bash
    npm install
```

### Correr la aplicación

```bash
    npm start 
```
