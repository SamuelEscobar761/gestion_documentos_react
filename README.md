# Aplicación React con Material UI - Document Manager

Esta es una aplicación web desarrollada en React que utiliza Material UI para implementar las funcionalidades de inicio de sesión, registro, creación de carpetas y gestión de documentos.

# Video
https://drive.google.com/file/d/1OqXCp6A0Ol_P8rSZUSbJLGMOH0BgXoF7/view?usp=sharing

## Requisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- Node.js (versión 10 o superior)
- npm (Node Package Manager) o yarn

## Características

La aplicación Document Manager tiene las siguientes características:

1. Inicio de sesión y registro: los usuarios pueden crear una cuenta e iniciar sesión para acceder a la aplicación.
2. Página principal: una vez iniciada la sesión, los usuarios son redirigidos a una página principal donde pueden crear y gestionar carpetas.
3. Creación de carpetas: los usuarios pueden crear nuevas carpetas proporcionando un nombre y una descripción.
4. Gestión de documentos: dentro de cada carpeta, los usuarios pueden agregar documentos, editar la carpeta a la que pertenecen, editar el nombre de los documentos y eliminarlos.
5. Interfaz de usuario intuitiva: la aplicación utiliza Material UI para proporcionar una interfaz de usuario atractiva y fácil de usar.

## Instalación

Sigue los pasos a continuación para instalar y configurar la aplicación:

1. Clona este repositorio en tu máquina local usando el siguiente comando:

   git clone <URL_DEL_REPOSITORIO>

2. Navega al directorio del proyecto:

   cd document-manager

3. Instala las dependencias del proyecto ejecutando uno de los siguientes comandos:

   npm install
   # o
   yarn install

4. Configura las variables de entorno:

   - Crea un archivo ".env" en el directorio raíz del proyecto.
   - Agrega las siguientes variables de entorno al archivo ".env" y proporciona los valores correspondientes:

     REACT_APP_API_URL=<URL_DEL_API>

5. Inicia la aplicación en modo de desarrollo:

   npm start
   # o
   yarn start

6. La aplicación se abrirá en tu navegador predeterminado. Si no se abre automáticamente, puedes acceder a ella en http://localhost:3000.

## Uso

1. Abre la aplicación en tu navegador.
2. Si no tienes una cuenta, selecciona la opción de registro y completa el formulario de registro.
3. Inicia sesión con tus credenciales registradas.
4. Serás redirigido a la página principal, donde podrás ver las carpetas existentes y crear nuevas carpetas.
5. Haz clic en una carpeta para ver su contenido.
6. Dentro de una carpeta, podrás agregar documentos, editar la carpeta a la que pertenecen, editar el nombre de los documentos y eliminarlos.

