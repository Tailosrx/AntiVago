
![Antivago](/public/antivago.png)

**Aplicación web que te guarda tus lecturas, juegos y animes mientras completas logros.**



---

##  Características

###  Gestión de Contenido
- **Registra libros, juegos y animes** con título, autor/plataforma, categoría y portada
- **Sigue tu progreso** en tiempo real (páginas leídas, horas jugadas, episodios vistos)
- **Califica y reseña** cada título con ratings 1-5 y comentarios personalizados
- **Marca favoritos** para acceder rápidamente a tus items preferidos

###  Sistema de Logros
- **9+ logros desbloqueables** en categorías: Lector Ávido, Gamer Pro, Otaku Certificado
- **Acumula puntos** por cada logro conseguido
- **Visualización tipo Pokédex** con rareza y descripción de cada logro
- **Progreso visual** de logros desbloqueados vs. totales

###  Dashboard Inteligente
- **Resumen de estadísticas** (libros leídos, juegos completados, animes vistos)
- **Daily Quests** para mantener la motivación diaria
- **Leaderboard** para competir con otros usuarios
- **Progreso visual** de tus actividades

###  Diseño Premium
- **Dark mode elegante** con gradientes purple-pink
- **Interfaz responsiva** optimizada para móvil y desktop
- **Animaciones smooth** y transiciones fluidas
- **UX intuitiva** y fácil de navegar

---

##  Tech Stack

### Frontend
- **React 18** + Vite
- **Tailwind CSS** para estilos
- **Zustand** para state management
- **Axios** para HTTP requests
- **React Router** para navegación

### Backend
- **Node.js** + Express
- **Prisma ORM** para BD
- **PostgreSQL** como base de datos
- **JWT** para autenticación
- **Bcryptjs** para hash de contraseñas

### DevOps
- **Nodemon** para desarrollo
- **Multer** para upload de imágenes
- **CORS** configurado

---

##  Instalación

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm o yarn

### Backend Setup

```bash
cd backend
npm install

# Crear archivo .env
echo "DATABASE_URL=postgresql://usuario:password@localhost:5432/nolodejes
JWT_SECRET=your_secret_key_here
PORT=5000" > .env

# Migrar base de datos
npx prisma migrate dev
npx prisma db seed

# Iniciar servidor
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install

# Crear archivo .env
echo "VITE_API_URL=http://localhost:5000/api" > .env.local

# Iniciar desarrollo
npm run dev
```

---

##  Uso

### 1. **Registrarse**
```
URL: http://localhost:5173/register
- Email, Username, Contraseña
```

### 2. **Agregar Contenido**
```
Library → Botón "Agregar Libro/Juego/Anime"
- Título (requerido)
- Autor/Plataforma
- Categoría
- Portada (imagen)
- Estado (leyendo/completado/abandonado)
- Rating y reseña
```

### 3. **Actualizar Progreso**
```
Haz click en un item → Modal de edición
- Actualiza página/horas/episodios
- La barra de progreso se calcula automáticamente
- Los logros se desbloquean automáticamente
```

### 4. **Ver Logros**
```
Sección "Logros" → Ver todas las categorías
- Logros desbloqueados vs. totales
- Rareza, puntos y descripción
- Progreso general en %
```

### 5. **Dashboard**
```
Sección "Dashboard" → Resumen personal
- Estadísticas totales
- Progreso de actividades recientes
```

---

##  Estructura del Proyecto

```
NoLoDejes/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── entriesController.js
│   │   │   └── achievementsController.js
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── utils/
│   │   └── server.js
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Dashboard/
    │   │   ├── Library/
    │   │   ├── Logros/
    │   │   ├── Login.jsx
    │   │   └── Register.jsx
    │   ├── components/
    │   ├── hooks/
    │   ├── store/
    │   ├── services/
    │   └── App.jsx
    └── package.json
```

---

##  Autenticación

**JWT Token-based:**
- Login/Register genera access token
- Token se guarda en localStorage
- Cada request incluye: `Authorization: Bearer {token}`
- Logout limpia token y redirige a login

---

##  Base de Datos

### Modelos Principales

```prisma
User
  ├── id (UUID)
  ├── email (unique)
  ├── username (unique)
  ├── password (hashed)
  ├── points
  ├── level
  └── ReadingEntry[]
  └── GameEntry[]
  └── AnimeEntry[]
  └── UserAchievement[]

ReadingEntry / GameEntry / AnimeEntry
  ├── id (UUID)
  ├── userId
  ├── title
  ├── photo (URL)
  ├── rating
  ├── status
  ├── progress fields
  └── timestamps

Achievement
  ├── id (UUID)
  ├── name
  ├── iconUrl
  ├── points
  ├── requirementType
  └── UserAchievement[]

UserAchievement
  ├── userId
  ├── achievementId
  └── unlockedAt
```

---

##  Features Futuros

- [ ] Sistema de streaks (rachas diarias)
- [ ] Notificaciones logro completado
- [ ] Integración con APIs (Google Books, ISteamNews,...)
- [ ] Social features (seguir amigos, compartir logros)
- [ ] Dark/Light mode toggle
- [ ] Mobile app (React Native)
- [ ] Creación de Logros mediante IA

---

##  Screenshots

### Dashboard
- Resumen de estadísticas personales
- Progreso visual de actividades

### Library
- Grid de libros/juegos/animes
- Tabs para cambiar entre categorías
- Modal de edición con barra de progreso

### Logros
- Vista tipo Pokédex
- Logros agrupados por categoría
- Progreso general en %

---

##  Deploy

### Backend (Railway/Render)
```bash
# Railway
railway link
railway deploy

# O Render
# Conectar repositorio directo desde dashboard
```

### Frontend (Vercel)
```bash
vercel deploy
```

### Variables de Entorno (.env)
```
VITE_API_URL=https://api.readplay.app
```

---

##  Troubleshooting

### "Network Error" en login
- Verificar que backend está corriendo en puerto 5000
- Comprobar CORS en backend

### "Token inválido"
- Limpiar localStorage y volver a loguear
- Verificar JWT_SECRET en .env

### Imágenes no se suben
- Crear carpeta `public/uploads/`
- Verificar permisos de escritura
- Multer debe estar instalado en backend

---

##  Licencia

MIT License - Libre para usar y modificar

---

##  Autor

**Tu Nombre**
- GitHub: [@tailosrx](https://github.com/tailosrx)
- Portfolio: [portfolio](https://tailosrx.vercel.app)

---

##  Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:
1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

##  Soporte

¿Tienes problemas? Abre un issue o contactame directamente.


---

##  ¡Gracias por usar ReadPlay!

No abandones tus hobbies. A veces es bueno descansar al cabeza.

 Si te gusta el proyecto, déjame una estrella en GitHub!
