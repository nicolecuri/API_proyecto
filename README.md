# API para FitPlanner

## Requisitos
- Node.js 20+
- PostgreSQL

## Instalación
1. Entrar a la carpeta API
2. Ejecutar `npm install`
3. Copiar `.env.example` a `.env` y completar la URL de PostgreSQL
4. Ejecutar `npx prisma generate`
5. Ejecutar `npx prisma migrate dev --name init`

## Ejecutar
- Desarrollo: `npm run dev`
- Producción: `npm start`

## Endpoints
- `GET /health`
- `GET /api/exercises`
- `POST /api/exercises`
- `GET /api/routines`
- `POST /api/routines`

