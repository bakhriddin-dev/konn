# Konn — single page for all your links

Konn is a lightweight open-source Linktree-style app: one public page with all your links. Built for simplicity, fast UX and easy deployment.

## Key features
- Google OAuth sign-in  
- Create / edit / reorder links  
- Shareable profile pages (e.g. `konn.uz/username`)  
- Responsive UI with smooth animations

## Tech stack
- **Frontend:** React, Redux Toolkit, RTK Query, Tailwind, shadcn, Framer Motion  
- **Auth:** Google OAuth  
- **Backend:** Node.js + Express, **MongoDB** (database)

## Quick start (dev)
1. Clone repo:
```bash
git clone https://github.com/bakhriddin-dev/konn.git
```
2. Run backend:
```bash
cd konn/client
npm install
npm run dev
```
3. Run frontend:
```bash
cd konn/server
npm install
npm run dev
```

Frontend usually at `http://localhost:5173`, backend at `http://localhost:5000`.

## Required env (examples)

**backend/.env**
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/konn
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
```

**frontend/.env**
```
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

## Minimal API (examples)
- `GET /api/users/:username/public` — public profile with links  
- `POST /api/auth/google` — Google OAuth exchange  
- Protected (auth):
  - `POST /api/me/links` — create link  
  - `PUT /api/me/links/:id` — update link  
  - `DELETE /api/me/links/:id` — delete link  
  - `PUT /api/me/links/order` — reorder links

## Frontend notes
- Uses RTK Query for fetching and caching data.
- Modern and clean UI built with Tailwind and shadcn components.
