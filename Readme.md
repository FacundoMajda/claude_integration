# Servidor Básico en TypeScript con Express para Anthropic AI

## About

Este proyecto es un servidor básico hecho con TypeScript, utilizando Express para el manejo de solicitudes HTTP. El propósito principal de este servidor es interactuar con la API de Anthropic AI - Claude y sus modelos LLM.

En este caso se utilizó el nuevo modelo de Anthropic: Claude 2.1 que posee una ventana de contexto de 200k tokens

## Pre-Requisitos 

Para utilizar este servidor, debes formar parte de la beta cerrada de Anthropic AI, al menos hasta la fecha (febrero 2024).

Esto te dará acceso a la consola de Claude, que es necesaria para obtener la clave de API que el servidor utiliza para interactuar con la API de Claude.

## Docs

[Getting Started with the API](https://docs.anthropic.com/claude/reference/getting-started-with-the-api)

## Instalación

Sigue estos pasos para instalar y ejecutar el proyecto:

1. **Clonar el repositorio**

    ```bash
    git clone https://github.com/facundomajda/claude_integration.git
    ```

2. **Navegar al directorio del proyecto**

    ```bash
    cd claude_integration
    ```

3. **Instalar las dependencias**

    ```bash
    npm install 
    ```

4. **Ejecutar el servidor en modo de desarrollo**

    ```bash
    npm run dev
    ```


## Configuración de las variables de entorno

Para configurar las variables de entorno, crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables:

```bash
PORT=<puerto elegido>
ANTHROPIC_API_KEY=<tu_api_key>
```

## Uso

Una vez que el servidor esté en marcha, puedes interactuar con él enviando solicitudes HTTP a la ruta `/api/mensaje`. Esta ruta acepta solicitudes POST que deben incluir un cuerpo de solicitud en formato JSON con los siguientes campos:

- `rol`: Este campo debe ser una cadena de texto que representa el rol del emisor del mensaje. Por defecto `"user"`.

- `contenido`: Este campo debe ser una cadena de texto que representa el contenido del mensaje. Por ejemplo, `"Hola Claude!"`.


## Dependencias

Este proyecto utiliza las siguientes dependencias:

- [Express](https://expressjs.com/): para el manejo de solicitudes HTTP.
- [dotenv](https://www.npmjs.com/package/dotenv): para el manejo de variables de entorno.
- [morgan](https://www.npmjs.com/package/morgan): para el registro de solicitudes HTTP.
- [cors](https://www.npmjs.com/package/cors): para permitir el Cross-Origin Resource Sharing.
- [helmet](https://www.npmjs.com/package/helmet): para ayudar a proteger la aplicación de algunas vulnerabilidades web bien conocidas.
- [winston](https://www.npmjs.com/package/winston): para el sistema de logs.
- [nodemon](https://www.npmjs.com/package/nodemon): para reiniciar automáticamente el servidor cuando se detectan cambios en los archivos.
- [SDK de Anthropic AI](https://www.npmjs.com/package/@anthropic-ai/sdk): para interactuar con la API de Anthropic AI.
