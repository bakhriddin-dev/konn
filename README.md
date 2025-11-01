# Konn: Одна страница для всех ваших ссылок!

Konn — это лёгкое open-source приложение в стиле Linktree: одна публичная страница со всеми вашими ссылками. Создано для простоты, быстрой работы и лёгкого развёртывания.

## Основные функции
- Вход через Google OAuth  
- Создание / редактирование / изменение порядка ссылок  
- Доступные для общего просмотра страницы профиля (например, `konn.uz/username`)  
- Адаптивный интерфейс с плавной анимацией

## Технологии
- **Frontend:** React, Redux Toolkit, RTK Query, Tailwind, shadcn, Framer Motion  
- **Backend:** Node.js + Express, **MongoDB** (база данных)

## Быстрый старт (разработка)
1. Клонируйте репозиторий:
```bash
git clone https://github.com/bakhriddin-dev/konn.git
```
2. Запустите backend:
```bash
cd konn/client
npm install
npm run dev
```
3. Запустите frontend:
```bash
cd konn/server
npm install
npm run dev
```

Frontend обычно доступен по адресу `http://localhost:5173`, backend — по `http://localhost:5000`.

## Необходимые переменные окружения (примеры)

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

## Минимальный API (примеры)
- `GET /api/users/:username/public` — публичный профиль с ссылками  
- `POST /api/auth/google` — обмен через Google OAuth  
- Защищённые (требуется авторизация):
  - `POST /api/me/links` — создание ссылки  
  - `PUT /api/me/links/:id` — обновление ссылки  
  - `DELETE /api/me/links/:id` — удаление ссылки  
  - `PUT /api/me/links/order` — изменение порядка ссылок
