### README.md

# GrowTop Assessment de Competencias

Bienvenido a la plataforma de Assessment de Competencias de GrowTop. Este proyecto proporciona un entorno donde los clientes pueden realizar cuatro pruebas de evaluación de competencias ofrecidas por nuestro producto.

## Descripción

La plataforma de Assessment de Competencias de GrowTop es una herramienta en línea diseñada para ayudar a los clientes a evaluar y mejorar las habilidades y competencias de su equipo. La plataforma ofrece cuatro pruebas principales que permiten a los usuarios medir diversas competencias clave.

## Características

- **Pruebas de Competencias:** Cuatro pruebas principales para evaluar diversas competencias.
- **Autenticación y Autorización:** Seguridad robusta mediante NextAuth.js.
- **Gestión de Imágenes:** Uso de Cloudinary para la optimización y gestión de imágenes.
- **Notificaciones:** Envío de correos electrónicos utilizando Postmark.
- **Base de Datos:** MongoDB para el almacenamiento y gestión de datos.
- **Diseño Responsivo:** Interfaz diseñada con Tailwind CSS para una experiencia de usuario óptima en dispositivos móviles y de escritorio.

## Tecnologías Utilizadas

- **Framework Principal:** [Next.js](https://nextjs.org/)
- **Lenguajes de Programación:** JavaScript (JS), TypeScript (TS), CSS
- **Herramientas de Diseño:** [Tailwind CSS](https://tailwindcss.com/)
- **Librerías Externas:** [NextAuth.js](https://next-auth.js.org/)
- **Nube de Imágenes:** [Cloudinary](https://cloudinary.com/)
- **Servicios de SMTP:** [Postmark](https://postmarkapp.com/)
- **Base de Datos:** [MongoDB](https://www.mongodb.com/)

## Instalación y Configuración

1. **Clonar el Repositorio:**

   ```bash
   git clone https://github.com/mateonoel2/growtop_m-scara.git
   ```

2. **Instalar Dependencias:**

   ```bash
   npm install
   ```

3. **Configurar Variables de Entorno:**

   Crea un archivo `.env.local` en la raíz del proyecto y añade las siguientes variables, puede guiarse del archivo `.env.example`

4. **Iniciar el Servidor de Desarrollo:**

   ```bash
   npm run dev
   ```

5. **Acceder a la Plataforma:**

   Abre tu navegador y dirígete a [http://localhost:3000](http://localhost:3000).

## Despliegue

La plataforma está alojada en Vercel y se puede desplegar fácilmente con los siguientes pasos:

1. **Conectar a Vercel:**

   Inicia sesión en [Vercel](https://vercel.com/) y conecta tu cuenta de GitHub.

2. **Importar el Proyecto:**

   Importa el repositorio de GitHub a Vercel.

3. **Configurar Variables de Entorno:**

   En el panel de configuración de Vercel, añade las mismas variables de entorno configuradas en el archivo `.env`.

4. **Desplegar:**

   Vercel desplegará automáticamente la plataforma cada vez que se realice un push a la rama principal del repositorio.

## Contribución

1. **Realizar un Fork del Repositorio:**
2. **Crear una Rama para tu Función:**

   ```bash
   git checkout -b nombre-de-tu-rama
   ```

3. **Hacer Commit de tus Cambios:**

   ```bash
   git commit -m "Descripción de tus cambios"
   ```

4. **Hacer Push a la Rama:**

   ```bash
   git push origin nombre-de-tu-rama
   ```

5. **Crear un Pull Request en GitHub.**

## Soporte

Para cualquier consulta o problema, por favor contacta a nuestro equipo de soporte en [app@growtop.pe](mailto:app@growtop.pe).

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.