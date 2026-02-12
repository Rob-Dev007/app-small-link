🔗 Small-Link

Plataforma web full-stack para acortar, gestionar y hacer seguimiento de URLs de manera segura y escalable.

---

🚀 Descripción

Small-Link es una aplicación web que permite transformar enlaces largos en URLs cortas personalizadas, almacenarlas en una base de datos y gestionarlas mediante un panel administrativo intuitivo.

El proyecto fue desarrollado siguiendo buenas prácticas de arquitectura desacoplada (frontend + backend), autenticación segura y manejo eficiente de datos.

Está pensado como base para soluciones de:

📊 Marketing digital

📈 Tracking de enlaces

🔗 Gestión de enlaces personalizados

🧩 Sistemas SaaS escalables

---

🌐 Demo

🔴 Demo en vivo: ([https://small-link-app.vercel.app/])

🛠 API Backend: ([https://small-link-app-backend.onrender.com])

---

✨ Características Principales

🔹 Acortamiento instantáneo de URLs

🔹 URLs personalizadas (alias)

🔹 Persistencia de datos en MongoDB

🔹 Panel para visualizar enlaces creados

🔹 Edición y eliminación de URLs

🔹 Seguimiento de número de clics

🔹 Autenticación basada en JWT

🔹 Hashing seguro de contraseñas (bcrypt)

🔹 Protección de rutas privadas

🔹 Arquitectura frontend y backend desacoplada

🔹 Manejo seguro de variables de entorno

🔹 Prueba gratuita del sistema sin necesidad de registro

---

🔐 Seguridad

Autenticación mediante JSON Web Tokens (JWT)

Hashing de contraseñas con bcrypt

Validación y sanitización de datos en backend

Protección de endpoints privados

Manejo de variables sensibles mediante archivos .env

---

🛠️ Stack Tecnológico

🎨 Frontend

⚛️ React

🎨 TailwindCSS

🔄 Axios

🧠 Hooks personalizados

🖥️ Backend

🟢 Node.js

🚀 Express

🗄️ MongoDB

🔐 JWT

🔑 bcrypt

🔧 Herramientas

Git & GitHub

REST API

Variables de entorno (.env)

---

📐 Arquitectura

La aplicación sigue una arquitectura desacoplada basada en API REST:

React (Frontend SPA)
        ↓
API REST (Node.js + Express)
        ↓
MongoDB

### Backend

Controladores organizados por responsabilidad

Middleware de autenticación

Manejo centralizado de errores

Modelos estructurados con validaciones

### Frontend

Consumo de API mediante Axios

Gestión de estado con hooks personalizados

Componentes reutilizables

Protección de rutas privadas

Esta estructura permite escalar el sistema y mantener separadas las responsabilidades.

---

📦 Instalación y Ejecución

1️⃣ Clonar repositorio

git clone https://github.com/Rob-Dev0695/AppWebUrlShortener.git

2️⃣ Backend

-cd Backend

-npm install

-npm run start

3️⃣ Frontend

-cd Frontend

-npm install

-npm run dev

Luego abre:

http://localhost:3000

---

🧠 Aprendizajes Clave

Durante el desarrollo de este proyecto se aplicaron conceptos como:

Implementación completa de autenticación JWT

Protección de rutas en frontend

Diseño y consumo de API REST

Manejo de estados asíncronos y errores

Prevención de duplicados en base de datos

Separación clara de responsabilidades (arquitectura limpia)

---

📈 Posibles Mejoras Futuras

🔐 Autenticación con Google (OAuth)

📱 Generación automática de códigos QR

📊 Dashboard con estadísticas avanzadas

📉 Gráficas de análisis de clics

🚀 Implementación como servicio SaaS

---

🤝 Contribuciones

Las contribuciones son bienvenidas:

-Haz un fork del proyecto

-Crea una rama (feature/nueva-funcionalidad)

-Haz commit (feat: agrega nueva funcionalidad)

-Haz push a tu rama

-Abre un Pull Request

---

👨‍💻 Autor

Roberto Antonio Paredes Camacho

💻 Full-Stack Web Developer

📩 robdev0695@gmail.com

🔗 GitHub: https://github.com/Rob-Dev007

🌎 Abierto a oportunidades remotas

---

📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

### Nota 

Para realizar la prueba de inicio de sesión, comparto las credenciales

[x]Usuario: customuser@correo.com

[x]contraseña: prueba123