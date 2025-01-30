# Gestion de Tareas - README

## Descripción del Proyecto

Esta es una aplicación de gestión de tareas que permite a los usuarios registrarse, iniciar sesión, crear, editar, completar y eliminar tareas. Además, proporciona un dashboard analítico con métricas clave sobre la productividad del usuario.

## Tecnologías Utilizadas

### Backend:

- **NestJS**: Framework para la implementación del servidor.
- **TypeORM**: ORM.
- **PostgreSQL**: Base de datos relacional.
- **Swagger**: Documentación de la API REST.
- **JWT**: Autenticación segura.
- **Seed Module**: Inserción de datos de prueba.
- **CRUD**: Operaciones para tareas y usuarios con relaciones y borrado lógico.

### Frontend:

- **React + Vite**: Desarrollo del cliente web.
- **React Router DOM**: Libreria para la navegación
- **TailwindCss**: framework de CSS de "utilidades".
- **Redux Toolkit**: Manejo de estado global.
- **Drag-and-Drop**: Interacción con las tareas en el tablero Kanban.
- **Custom Hooks**: Manejo de formularios y validaciones.
- **Rutas privadas**: Protección de secciones restringidas.

## Instalación y Configuración

### Clonar el Proyecto

```bash
git clone https://github.com/JCValeroVergara/lup-tareas-prueba.git

```

### Configuración del Backend

1. Copiar el archivo `.env.template` y renombrarlo a `.env`.

2. Asignar los valores adecuados a las variables de entorno.

3. Si usas PostgreSQL local, configura la conexión en `.env`.

4. Si usas Docker, ejecuta el siguiente comando en la carpeta `/server`:

   ```bash
   docker-compose up -d
   ```

   Esto creará un contenedor con la base de datos PostgreSQL.

5. Instalar dependencias y ejecutar el backend:

   ```bash
   cd server
   npm install
   npm run start:dev
   ```

6. Inicializar la base de datos ejecutando la semilla de prueba:

   - En Postman o Insomnia, hacer una petición GET a:
     ```
     http://localhost:<PUERTO>/api/seed
     ```

### Configuración del Frontend

1. Instalar dependencias y ejecutar el cliente:
   ```bash
   cd client
   npm install
   npm run dev
   ```

## Acceso a Usuarios de Prueba

Para probar la aplicación, se han creado los siguientes usuarios de prueba:

| Email             | Contraseña |
| ----------------- | ---------- |
| prueba1@gmail.com | Ab1234     |
| prueba2@gmail.com | Ab1234     |
| prueba3@gmail.com | Ab1234     |

## Métricas del Dashboard

El dashboard analítico ofrece insights sobre la productividad del usuario mediante las siguientes métricas:

1. **Total de tareas completadas** (`totalTasksCompleted`): Indica cuántas tareas han sido finalizadas.
2. **Total de tareas en proceso** (`totalTasksProcessing`): Muestra cuántas tareas están actualmente en curso.
3. **Total de tareas no iniciadas** (`totalTasksNotStarted`): Cuenta las tareas que aún no han comenzado.
4. **Porcentaje de tareas completadas** (`percentageCompleted`): Mide el porcentaje de tareas finalizadas en comparación con el total activo.
5. **Porcentaje de tareas pendientes** (`percentagePending`): Indica el porcentaje de tareas que siguen sin completarse.
6. **Tiempo promedio de finalización** (`avgCompletionTime`): Calcula el tiempo medio entre la creación y la finalización de una tarea.
7. **Día de mayor productividad** (`mostProductiveDay`): Identifica el día de la semana en que se completan más tareas.
8. **Total de tareas eliminadas** (`totalTasksDeleted`): Muestra la cantidad de tareas eliminadas sin haber sido completadas.
9. **Tasa de abandono** (`abandonmentRate`): Representa el porcentaje de tareas eliminadas en relación con el total activo.

### Justificación de las Métricas

- **Monitoreo del rendimiento**: Permite evaluar la productividad del usuario y su avance en la gestión de tareas.
- **Identificación de patrones**: Facilita la detección de días más productivos y la eficiencia en el cumplimiento de tareas.
- **Optimización del flujo de trabajo**: La tasa de abandono y el tiempo promedio de finalización ayudan a detectar ineficiencias.

## Contacto

Si tienes preguntas o sugerencias, puedes contactarme en [juankvalerov@gmail.com](mailto\:juankvalerov@gmail.com).

