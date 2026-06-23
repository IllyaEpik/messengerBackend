# Проєкт мессенджеру


## Чому саме цей проєкт? 


Ми обрали цей проєкт тому що вважаємо що його буде цікаво створювати. І на ньому ми сможемо використати знання з TypeScript, express та socket.io.

## Why this particular project?
We chose this project because we think it will be interesting to create. And we will be able to use our knowledge of TypeScript, express and socket.io on it.



## Участники команди/ Team members 

- [Iлля Епик](https://github.com/IllyaEpik)  |  [Illya Epik](https://github.com/IllyaEpik)
- [Попович Марк](https://github.com/markpopovich9)  |  [Popovych Mark](https://github.com/markpopovich9)


## Навігація / Navigation

### EN
- [🇬🇧 Technology Stack](#technology-stack)
- [📦 Project Structure](#project-structure)
- [🚀 How to Run the Project](#how-to-run-the-project)
- [📋 Project Content & Module Overview](#project-content--module-overview)
- [📝 Conclusion](#conclusion)

### UA
- [🇺🇦 Технологічний стек](#технологічний-стек)
- [📦 Структура проєкту](#структура-проєкту)
- [🚀 Як запустити проєкт в роботу](#як-запустити-проєкт-в-роботу)
- [📋 Зміст проєкту та Огляд Модулів](#зміст-проєкту-та-огляд-модулів)
- [📝 Висновок](#висновок)

<!-- ## Перелік модулів та технологій (Tech Stack) -->

<!-- ### 🖥️ Backend Core (Ядро)
* **Node.js** — середовище виконання JavaScript.
* **TypeScript** — типізована надбудова для надійного та зрозумілого коду.
* **Express (v5)** — швидкий та мінімалістичний веб-фреймворк для розробки REST API.

### 🔌 Real-time & Транспорт
* **Socket.io** — двосторонній зв'язок у реальному часі на основі WebSockets (для чатів та сповіщень).
* **CORS** — налаштування безпеки для крос-доменних запитів.

### 🗄️ База даних та ORM
* **Prisma ORM** — сучасний інструмент для роботи з базою даних, генерації міграцій та безпечних запитів з автокомплітом.
* **PostgreSQL / SQLite** — підтримка двох типів СКБД. Використовуються драйвери `@prisma/adapter-pg` та `@prisma/adapter-better-sqlite3`.

### 🔐 Безпека та Автентифікація
* **JSON Web Tokens (JWT)** — створення та валідація токенів доступу (`jsonwebtoken`).
* **bcryptjs** — хешування паролів перед збереженням у БД.

### 📁 Робота з медіа та файлами
* **Multer** — мідлвар для обробки `multipart/form-data` (завантаження файлів).
* **Cloudinary** — хмарне сховище для збереження зображень та статичних файлів.
* **Sharp** — високопродуктивна бібліотека для обробки, стиснення та зміни розміру зображень перед завантаженням.

### ⚙️ Конфігурація та Інструменти
* **Envalid & Dotenv** — валідація та безпечна робота зі змінними оточення (`.env`).
* **Nodemailer** — відправка сервісних або транзакційних email-листів.
* **Tunnel-SSH** — можливість створення безпечних SSH-тунелів для підключення до віддалених БД.

### 🧹 Лінтинг та Форматування (Code Quality)
У проекті використовується **Biome** — ультрашвидкий комбайн, який замінює ESLint та Prettier:
* `@biomejs/biome` — швидка перевірка якості коду, лінтинг та форматування за мілісекунди. -->

<!-- --- -->
<!-- [![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?logo=nodedotjob&logoColor=white)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.x-3178C6?logo=typescript&logoColor=white)](#)
[![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)](#)
[![Prisma](https://img.shields.io/badge/Prisma-7.x-2D3748?logo=prisma&logoColor=white)](#)
[![Socket.io](https://img.shields.io/badge/Socket.io-4.x-010101?logo=socketdotio&logoColor=white)](#)
[![Biome](https://img.shields.io/badge/Biome-lint%2Fformat-60A5FA?logo=biome&logoColor=white)](#) -->


<!-- # 🚀 backend -->

## Technology Stack

| Category | Technologies |
|----------|--------------|
| **Runtime** | ![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?logo=nodedotjs&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-6.x-3178C6?logo=typescript&logoColor=white) |
| **Web Framework** | ![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white) |
| **Real-time** | ![Socket.io](https://img.shields.io/badge/Socket.io-4.x-010101?logo=socketdotio&logoColor=white) |
| **ORM & Database** | ![Prisma](https://img.shields.io/badge/Prisma-7.x-2D3748?logo=prisma&logoColor=white) PostgreSQL / SQLite |
| **Authentication** | ![JWT](https://img.shields.io/badge/JWT-9.x-000000?logo=jsonwebtokens&logoColor=white) ![bcryptjs](https://img.shields.io/badge/bcryptjs-3.x-555555?logo=letsencrypt&logoColor=white) |
| **Media** | ![Multer](https://img.shields.io/badge/Multer-2.x-CC2927?logo=files&logoColor=white) ![Cloudinary](https://img.shields.io/badge/Cloudinary-2.x-3448C5?logo=cloudinary&logoColor=white) ![Sharp](https://img.shields.io/badge/Sharp-0.34.x-99CC00?logo=sharp&logoColor=white) |
| **Email** | ![Nodemailer](https://img.shields.io/badge/Nodemailer-8.x-0F9D58?logo=gmail&logoColor=white) |
| **Security** | ![CORS](https://img.shields.io/badge/CORS-2.x-4B3261?logo=moleculer&logoColor=white) ![Envalid](https://img.shields.io/badge/Envalid-8.x-FF6F00?logo=dotenv&logoColor=white) |
| **Linting/Formatting** | ![Biome](https://img.shields.io/badge/Biome-2.x-60A5FA?logo=biome&logoColor=white) |

---

## Технологічний стек

| Категорія | Технології |
|-----------|------------|
| **Середовище виконання** | ![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?logo=nodedotjs&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-6.x-3178C6?logo=typescript&logoColor=white) |
| **Веб-фреймворк** | ![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white) |
| **Реальний час** | ![Socket.io](https://img.shields.io/badge/Socket.io-4.x-010101?logo=socketdotio&logoColor=white) |
| **ORM та БД** | ![Prisma](https://img.shields.io/badge/Prisma-7.x-2D3748?logo=prisma&logoColor=white) PostgreSQL / SQLite |
| **Автентифікація** | ![JWT](https://img.shields.io/badge/JWT-9.x-000000?logo=jsonwebtokens&logoColor=white) ![bcryptjs](https://img.shields.io/badge/bcryptjs-3.x-555555?logo=letsencrypt&logoColor=white) |
| **Медіа** | ![Multer](https://img.shields.io/badge/Multer-2.x-CC2927?logo=files&logoColor=white) ![Cloudinary](https://img.shields.io/badge/Cloudinary-2.x-3448C5?logo=cloudinary&logoColor=white) ![Sharp](https://img.shields.io/badge/Sharp-0.34.x-99CC00?logo=sharp&logoColor=white) |
| **Пошта** | ![Nodemailer](https://img.shields.io/badge/Nodemailer-8.x-0F9D58?logo=gmail&logoColor=white) |
| **Безпека** | ![CORS](https://img.shields.io/badge/CORS-2.x-4B3261?logo=moleculer&logoColor=white) ![Envalid](https://img.shields.io/badge/Envalid-8.x-FF6F00?logo=dotenv&logoColor=white) |
| **Лінтинг/Форматування** | ![Biome](https://img.shields.io/badge/Biome-2.x-60A5FA?logo=biome&logoColor=white) |


## Структура проєкту
backend/
├── src/
│   ├── app/          # точка входу (server.ts, socket.ts)
│   ├── config/       # конфігурації env, cloudinary, prisma
│   ├── modules/      # бізнес-логіка (auth, users, chat, media)
│   ├── middleware/   # кастомні middleware
│   ├── utils/        # спільні утиліти
│   └── types/        # глобальні типи TypeScript
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── .env.example
├── package.json
## Project Structure

```
backend/
├── src/
│   ├── app/          # entry point (server.ts, socket.ts)
│   ├── config/       # env, cloudinary, prisma configs
│   ├── modules/      # business logic (auth, users, chat, media)
│   ├── middleware/   # custom middlewares
│   ├── utils/        # shared utilities
│   └── types/        # global TypeScript types
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── .env.example
├── package.json
```

---

## How to Run the Project

### Prerequisites
- **Node.js** (v22.x or higher)
- **npm** (v10.x or higher)
- **PostgreSQL** (or SQLite for local development)

### Step 1: Clone and Install Dependencies
```bash
git clone <https://github.com/IllyaEpik/messengerBackend>
cd messengerBackend
npm install
```

### Step 2: Set Up Environment Variables
Create a `.env` file in the `backend/` root based on `.env.example`:

<!-- PORT=4000 -->
<!-- NODE_ENV=development -->
```env
DATABASE_URL=postgresql://user:password@localhost:5432/messager
SECRET_KEY=your_secret_jwt_key
EMAIL=your_email@gmail.com
PASSWORD=your_email_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Step 3: Run Database Migrations
if you are working local
```bash
npx prisma migrate dev
```
do it anyway
```bash
npx prisma generate
```

### Step 4: Start the Development Server
```bash
npm run start
```

The server will start on `http://localhost:8000` (or the port specified in `.env`).

<!-- ### Build and Production
```bash
npm run build    # Compile TypeScript
npm run start    # Run compiled code
``` -->
<!-- 
---

## Як запустити проєкт в роботу

### Вимоги
- **Node.js** (v22.x або вище)
- **npm** (v10.x або вище) або **yarn**
- **PostgreSQL** (або SQLite для локальної розробки)

### Крок 1: Клонування та встановлення залежностей
```bash
git clone <адреса-репозиторію>
cd backend
npm install
```

### Крок 2: Налаштування змінних оточення
Створіть файл `.env` в корені папки `backend/` на основі `.env.example`:

```env
DATABASE_URL=postgresql://користувач:пароль@localhost:5432/messager
PORT=4000
SECRET_KEY=ваш_секретний_ключ_jwt
NODE_ENV=development
EMAIL=ваша_пошта@gmail.com
PASSWORD=пароль_від_пошти
CLOUDINARY_CLOUD_NAME=ваше_імʼя_cloudinary
CLOUDINARY_API_KEY=ваш_ключ_cloudinary
CLOUDINARY_API_SECRET=ваш_секрет_cloudinary
```

### Крок 3: Запуск міграцій бази даних
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### Крок 4: Запуск сервера розробки
```bash
npm run dev
```

Сервер запуститься на адресі `http://localhost:4000` (або на порту, вказаному в `.env`).

### Збирання та продакшн
```bash
npm run build    # Компіляція TypeScript
npm run start    # Запуск скомпільованого коду
```
 -->

---

## Project Content & Module Overview

### Architecture Diagram

```mermaid
graph TB
    subgraph "Client Layer"
        WEB["🖥️ Web Client"]
        MOBILE["📱 Mobile Client"]
    end
    
    subgraph "Backend Server"
        API["📡 Express API<br/>(REST)"]
        SOCKET["⚡ Socket.io<br/>(Real-time)"]
        AUTH["🔐 Auth Middleware<br/>(JWT)"]
        UPLOAD["📤 Upload Middleware<br/>(Multer)"]
    end
    
    subgraph "Business Logic"
        USER["👤 User Module"]
        CHAT["💬 Chat Module"]
        MSG["📨 Message Module"]
        POST["📝 Post Module"]
        ALBUM["🖼️ Album Module"]
    end
    
    subgraph "Data Layer"
        ORM["🗄️ Prisma ORM"]
        DB["🗄️ PostgreSQL<br/>(Production)"]
        SQLITE["🗄️ SQLite<br/>(Development)"]
    end
    
    subgraph "External Services"
        CLOUD["☁️ Cloudinary<br/>(Image Storage)"]
        SHARP["🖼️ Sharp<br/>(Image Processing)"]
        EMAIL["📧 Nodemailer<br/>(Email Service)"]
    end
    
    WEB -->|HTTP/WebSocket| API
    MOBILE -->|HTTP/WebSocket| API
    
    API --> AUTH
    API --> SOCKET
    API --> UPLOAD
    
    AUTH --> USER
    API --> CHAT
    API --> MSG
    API --> POST
    UPLOAD --> ALBUM
    
    USER --> ORM
    CHAT --> ORM
    MSG --> ORM
    POST --> ORM
    ALBUM --> ORM
    
    ORM --> DB
    ORM --> SQLITE
    
    ALBUM --> SHARP
    SHARP --> CLOUD
    
    USER --> EMAIL
    
    SOCKET -->|Real-time events| MSG
    SOCKET -->|Live updates| CHAT
    
    style WEB fill:#61DAFB,color:#ffffff
    style MOBILE fill:#61DAFB,color:#ffffff
    style API fill:#000000,color:#ffffff
    style SOCKET fill:#010101,color:#ffffff
    style AUTH fill:#FF6B6B,color:#ffffff
    style UPLOAD fill:#FF6B6B,color:#ffffff
    style USER fill:#3B82F6,color:#ffffff
    style CHAT fill:#3B82F6,color:#ffffff
    style MSG fill:#3B82F6,color:#ffffff
    style POST fill:#3B82F6,color:#ffffff
    style ALBUM fill:#3B82F6,color:#ffffff
    style ORM fill:#2D3748,color:#ffffff
    style DB fill:#336791,color:#ffffff
    style SQLITE fill:#4A7BA7,color:#ffffff
    style CLOUD fill:#3448C5,color:#ffffff
    style SHARP fill:#99CC00,color:#ffffff
    style EMAIL fill:#0F9D58,color:#ffffff
```

### Core Modules

#### 1. **User Module** (`src/modules/User/`)
**Role:** Handles user profiles, authentication, updates, and user data management.
- **Features:**
  - User registration and login
  - JWT token generation and validation
  - Get and update user profile
  - Avatar/profile picture management
  - User search and filtering
  - Password hashing and authentication
- **Key Files:**
  - `user.controller.ts` — User endpoints
  - `user.repository.ts` — User database operations
  - `user.service.ts` — Business logic for user operations

#### 2. **Chat Module** (`src/modules/Chat/`)
**Role:** Manages chat rooms, group chats, and chat metadata.
- **Features:**
  - Create private and group chats
  - Add/remove members from group chats
  - Fetch chat list and chat details
  - Chat settings and permissions
  - Real-time chat updates via Socket.io
- **Key Files:**
  - `chat.controller.ts` — Chat API endpoints
  - `chat.repository.ts` — Database operations for chats
  - `chat.socket.ts` — Real-time WebSocket handlers

#### 3. **Messages Module** (`src/modules/Messages/`)
**Role:** Handles message creation, retrieval, and message history.
- **Features:**
  - Send messages in chats
  - Edit and delete messages
  - Message pagination and history
  - Message status (read/unread)
  - Real-time message delivery
- **Key Files:**
  - `message.controller.ts` — Message endpoints
  - `message.repository.ts` — Message database queries
  - `message.socket.ts` — Real-time message events

#### 4. **Albums Module** (`src/modules/Albums/`)
**Role:** Manages file uploads, image processing, and cloud storage.
- **Features:**

  - Image compression and resizing (Sharp)
  - Cloud storage integration (Cloudinary)
  - File metadata and gallery management
  - Media organization by user/chat
- **Key Files:**
  - `album.controller.ts` — Upload endpoints
  - `album.repository.ts` — Media metadata storage
  - `album.service.ts` — Image processing logic
  - `uploadMiddleware.ts` — File handling and validation

#### 5. **Post Module** (`src/modules/Post/`)
**Role:** Manages user posts, feeds, and social interactions.
- **Features:**
  - Create and delete posts
  - Like and comment on posts
  - Feed fetching and pagination
  - Post visibility and sharing
  - Post media attachments
- **Key Files:**
  - `post.controller.ts` — Post endpoints
  - `post.repository.ts` — Post database operations
  - `post.service.ts` — Business logic for posts

### Middleware & Configuration

#### Middleware (`src/middlewares/`)
- **authMiddleware.ts** — JWT verification for protected routes
- **errorMiddleware.ts** — Centralized error handling
- **uploadMiddleware.ts** — File upload handling and validation
- **bigIntMiddleware.ts** — BigInt serialization for JSON responses
- **socketAuth.ts** — Socket.io authentication

#### Configuration (`src/config/`)
- **env.ts** — Environment variable validation with Envalid
- **prisma.ts** — Prisma client setup
- **cloudinary.ts** — Cloudinary configuration for media uploads
- **db.tunnel.ts** — SSH tunnel for remote database connections

---




## Зміст проєкту та Огляд Модулів

### Діаграма Архітектури

```mermaid
graph TB
    subgraph "Рівень Клієнта"
        WEB["🖥️ Веб Клієнт"]
        MOBILE["📱 Мобільний Клієнт"]
    end
    
    subgraph "Бекенд Сервер"
        API["📡 Express API<br/>(REST)"]
        SOCKET["⚡ Socket.io<br/>(Реальний час)"]
        AUTH["🔐 Auth Middleware<br/>(JWT)"]
        UPLOAD["📤 Upload Middleware<br/>(Multer)"]
    end
    
    subgraph "Бізнес Логіка"
        USER["👤 Модуль Користувачів"]
        CHAT["💬 Модуль Чатів"]
        MSG["📨 Модуль Повідомлень"]
        POST["📝 Модуль Постів"]
        ALBUM["🖼️ Модуль Альбомів"]
    end
    
    subgraph "Рівень Даних"
        ORM["🗄️ Prisma ORM"]
        DB["🗄️ PostgreSQL<br/>(Production)"]
        SQLITE["🗄️ SQLite<br/>(Розробка)"]
    end
    
    subgraph "Зовнішні Сервіси"
        CLOUD["☁️ Cloudinary<br/>(Сховище Зображень)"]
        SHARP["🖼️ Sharp<br/>(Обробка Зображень)"]
        EMAIL["📧 Nodemailer<br/>(Сервіс Email)"]
    end
    
    WEB -->|HTTP/WebSocket| API
    MOBILE -->|HTTP/WebSocket| API
    
    API --> AUTH
    API --> SOCKET
    API --> UPLOAD
    
    AUTH --> USER
    API --> CHAT
    API --> MSG
    API --> POST
    UPLOAD --> ALBUM
    
    USER --> ORM
    CHAT --> ORM
    MSG --> ORM
    POST --> ORM
    ALBUM --> ORM
    
    ORM --> DB
    ORM --> SQLITE
    
    ALBUM --> SHARP
    SHARP --> CLOUD
    
    USER --> EMAIL
    
    SOCKET -->|События реального часу| MSG
    SOCKET -->|Прямі оновлення| CHAT
    
    style WEB fill:#61DAFB,color:#ffffff
    style MOBILE fill:#61DAFB,color:#ffffff
    style API fill:#000000,color:#ffffff
    style SOCKET fill:#010101,color:#ffffff
    style AUTH fill:#FF6B6B,color:#ffffff
    style UPLOAD fill:#FF6B6B,color:#ffffff
    style USER fill:#3B82F6,color:#ffffff
    style CHAT fill:#3B82F6,color:#ffffff
    style MSG fill:#3B82F6,color:#ffffff
    style POST fill:#3B82F6,color:#ffffff
    style ALBUM fill:#3B82F6,color:#ffffff
    style ORM fill:#2D3748,color:#ffffff
    style DB fill:#336791,color:#ffffff
    style SQLITE fill:#4A7BA7,color:#ffffff
    style CLOUD fill:#3448C5,color:#ffffff
    style SHARP fill:#99CC00,color:#ffffff
    style EMAIL fill:#0F9D58,color:#ffffff
```

### Основні Модулі

#### 1. **Модуль Користувачів** (`src/modules/User/`)
**Роль:** Управління профілями користувачів, аутентифікацією, оновленням та управлінням даними користувача.
- **Можливості:**
  - Реєстрація та логін користувача
  - Генерація та валідація JWT-токенів
  - Отримання та оновлення профілю користувача
  - Управління аватаром/фотографією профілю
  - Пошук та фільтрування користувачів
  - Хешування паролю та аутентифікація
- **Ключові файли:**
  - `user.controller.ts` — Ендпоінти користувачів
  - `user.repository.ts` — Операції БД користувачів
  - `user.service.ts` — Бізнес-логіка операцій користувача

#### 2. **Модуль Чатів** (`src/modules/Chat/`)
**Роль:** Управління чатами, груповими чатами та метаданами чатів.
- **Можливості:**
  - Створення приватних та групових чатів
  - Додавання/видалення учасників з групових чатів
  - Отримання списку чатів та деталей чату
  - Налаштування чатів та дозволи
  - Оновлення чатів у реальному часі через Socket.io
- **Ключові файли:**
  - `chat.controller.ts` — API ендпоінти чатів
  - `chat.repository.ts` — Операції БД для чатів
  - `chat.socket.ts` — Обробники реального часу WebSocket

#### 3. **Модуль Повідомлень** (`src/modules/Messages/`)
**Роль:** Обробка створення повідомлень, отримання та історія повідомлень.
- **Можливості:**
  - Відправка повідомлень у чатах
  - Редагування та видалення повідомлень
  - Пагінація та історія повідомлень
  - Статус повідомлення (прочитано/непрочитано)
  - Доставка повідомлень у реальному часі
- **Ключові файли:**
  - `message.controller.ts` — Ендпоінти повідомлень
  - `message.repository.ts` — Запити БД для повідомлень
  - `message.socket.ts` — События реального часу для повідомлень

#### 4. **Модуль Альбомів** (`src/modules/Albums/`)
**Роль:** Управління завантаженням файлів, обробка зображень та хмарне сховище.
- **Можливості:**
  - Завантаження зображень та файлів
  - Стиснення та зміна розміру зображень (Sharp)
  - Інтеграція з хмарним сховищем (Cloudinary)
  - Управління метаданами файлів та галереями
  - Організація медіа за користувачем/чатом
- **Ключові файли:**
  - `album.controller.ts` — Ендпоінти завантаження
  - `album.repository.ts` — Збереження метаданих медіа
  - `album.service.ts` — Логіка обробки зображень
  - `uploadMiddleware.ts` — Обробка та валідація файлів

#### 5. **Модуль Постів** (`src/modules/Post/`)
**Роль:** Управління постами користувачів, стрічкою та соціальною взаємодією.
- **Можливості:**
  - Створення та видалення постів
  - Лайки та коментарі до постів
  - Отримання стрічки з пагінацією
  - Видимість постів та спільне користування
  - Медіа-вкладення до постів
- **Ключові файли:**
  - `post.controller.ts` — Ендпоінти постів
  - `post.repository.ts` — Операції БД постів
  - `post.service.ts` — Бізнес-логіка постів

### Middleware та Конфігурація

#### Middleware (`src/middlewares/`)
- **authMiddleware.ts** — Верифікація JWT для захищених маршрутів
- **errorMiddleware.ts** — Централізована обробка помилок
- **uploadMiddleware.ts** — Обробка та валідація завантаження файлів
- **bigIntMiddleware.ts** — Сериалізація BigInt для JSON відповідей
- **socketAuth.ts** — Аутентифікація Socket.io

#### Конфігурація (`src/config/`)
- **env.ts** — Валідація змінних оточення з Envalid
- **prisma.ts** — Налаштування Prisma client
- **cloudinary.ts** — Конфігурація Cloudinary для завантаження медіа
- **db.tunnel.ts** — SSH-тунель для підключення до віддалених БД




## Висновок

**Що я виніс для себе**
- Закріпив розуміння строгої типізації — TypeScript став не просто формальністю, а реальним помічником.
- Пропрацював автентифікацію на JWT від побудови токенів до перевірки в мідлварах.
- Добре потренувався з Socket.io: тепер чітко уявляю, як організувати приватні кімнати, події та живий обмін даними.
- Побачив різницю між Django-підходом та легковаговим Express — стало зрозуміло, коли краще використовувати кожен із них.

**Чому цей досвід корисний**  
Проєкт показав, як зібрати повноцінний бекенд не за інструкцією, а свідомо:
від проєктування структури до продакшен-деталей на кшталт обробки зображень через Sharp.
Крім того, спільна розробка навчила узгоджувати стиль коду

**Подальший розвиток**
Проєкт можна поступово довести до повноцінного месенджера:
- Додати end‑to‑end шифрування повідомлень.
- Реалізувати фонові черги (BullMQ) для імейлів та push-сповіщень.
- Покрити ключову логіку інтеграційними тестами.
- Запакувати сервіс у Docker та налаштувати CI/CD.
- Згенерувати документацію API через Swagger.

Таким чином, курсова робота перетворилася на фундамент, який можна розширювати далі
як у навчальних, так і в реальних завданнях.


## Conclusion

**What I learned**
- Strengthened my understanding of strict typing — TypeScript became a real helper, not just a formality.
- Worked through JWT authentication from token creation to middleware verification.
- Got solid practice with Socket.io: now I clearly understand how to organize private rooms, events, and live data exchange.
- Saw the difference between the Django approach and lightweight Express — now I know when to use each one.

**Why this experience is valuable**  
The project showed how to build a full backend not by blindly following instructions, but consciously: from planning the structure to production details like image processing with Sharp. Additionally, team development taught me how to align coding style.

**Future development**  
The project can gradually be evolved into a full-featured messenger:
- Add end-to-end encryption for messages.
- Implement background queues (BullMQ) for emails and push notifications.
- Cover core logic with integration tests.
- Package the service in Docker and set up CI/CD.
- Generate API documentation via Swagger.

This way, the coursework became a foundation that can be further expanded in both educational and real-world tasks.