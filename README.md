# Plant Connect- Plant Helps to purify air 🌱

> **Don't just buy a plant. Share one, grow one, and make your community greener and purify air.**

Plant Connect is a community-driven platform for discovering plants locally, sharing plants with neighbours, and learning how to care for them with AI-powered guidance.

## Why Plant Connect?

People often have extra plants, seeds, or cuttings that could be shared, while others want to start gardening but do not know where to find affordable plants or nearby growers. At the same time, urban spaces are becoming more limited and communities need simple, accessible ways to bring more greenery into everyday life.

Plant Connect turns plant-growing into a local community experience:

- Find a nursery near your current location.
- Give away or claim plants, seeds, and cuttings from nearby neighbours.
- Ask an AI plant assistant for practical, city-aware care advice.
- Grow a plant, propagate it, and keep the sharing cycle going.

## Core Features

### 🌳 Find Nearby Nurseries

The nursery finder uses browser geolocation and MongoDB geospatial queries to show plant shops near the user. Users can adjust the search radius and view nursery addresses, phone numbers, ratings, and available plants with prices.

### 💚 Neighbour Donations

Users can post free plants, saplings, seeds, and cuttings with a description, quantity, city, and pickup information. Nearby users can browse available donations and claim an item, helping healthy plant material find a new home instead of going to waste.

### 🤖 AI Plant Doctor

The protected AI chat experience uses Google Gemini to answer plant-care questions. It can provide:

- Plant suggestions for a user's city
- Watering, sunlight, and care guidance
- Fertilizer advice
- Air-quality and pollution-related plant benefits

The assistant also supports multiple chats, regeneration, and city-specific prompts.

### 🔐 Accounts and Location-Aware Experiences

Users can register and log in with JWT authentication. Location data is used to improve nearby nursery and donation results, while protected actions such as posting, claiming, and using the AI assistant require authentication.

## Demo Story

1. A user opens Plant Connect and chooses a nursery or neighbourhood donation.
2. They use their location to find a nearby plant source.
3. They register, claim a cutting, or post an extra sapling for someone else.
4. They ask the Plant Doctor how to care for the plant in their city.
5. Once the plant grows, they share cuttings and continue the green chain.

## Tech Stack

### Frontend

- React 18
- Vite
- React Router
- Tailwind CSS
- Framer Motion
- Axios
- Lucide React

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- bcryptjs password hashing
- Google Gemini API

## Project Structure

```text
Project/
├── client/                 # React + Vite frontend
│   └── src/
│       ├── components/     # Shared UI and chat components
│       ├── context/        # Authentication state
│       ├── pages/          # Home, nursery, donation, auth, and AI screens
│       └── services/       # Axios API client
├── server/                 # Express API
│   ├── config/             # Database and Gemini configuration
│   ├── controllers/        # Request handlers
│   ├── middleware/         # JWT protection
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API routes
│   └── seed.js             # Demo users, nurseries, and donations
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm
- A MongoDB database (local MongoDB or MongoDB Atlas)
- A Google Gemini API key for the AI Plant Doctor
- A browser that supports geolocation for nearby results

### 1. Install dependencies

From the project root:

```bash
cd server
npm install

cd ../client
npm install
```

### 2. Configure the server

Create `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/plantconnect
JWT_SECRET=replace-with-a-long-random-secret
GEMINI_API_KEY=your-gemini-api-key
GEMINI_MODEL=gemini-2.5-flash
CLIENT_URL=http://localhost:5173
```

Use a strong, private value for `JWT_SECRET`. Never commit `.env` files or API keys.

### 3. Configure the client

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Seed demo data (optional)

Make sure MongoDB is running, then execute:

```bash
cd server
node seed.js
```

The seed script creates sample nursery listings, users, and neighbourhood donations across multiple Indian cities. It clears the existing Plant Connect collections before inserting demo data, so use it only with a development database.

### 5. Run the application

Open two terminals.

**API server**

```bash
cd server
npm run dev
```

The API runs at `http://localhost:5000`.

**Frontend**

```bash
cd client
npm run dev
```

Open the Vite URL shown in the terminal, usually `http://localhost:5173`.

## API Overview

The backend is mounted under `/api`:

| Area | Endpoints | Purpose |
| --- | --- | --- |
| Health | `GET /` | Check that the API is running |
| Auth | `POST /api/auth/register` | Create an account |
| Auth | `POST /api/auth/login` | Log in and receive a JWT |
| Auth | `GET /api/auth/me` | Get the current authenticated user |
| Nurseries | `GET /api/nurseries` | List all nurseries |
| Nurseries | `GET /api/nurseries/nearby` | Find nurseries by coordinates and radius |
| Donations | `GET /api/donations/nearby` | Find nearby available donations |
| Donations | `POST /api/donations` | Create a donation (authenticated) |
| Donations | `PUT /api/donations/claim/:id` | Claim a donation (authenticated) |
| AI | `POST /api/ai/chat` | Ask the Plant Doctor (authenticated) |
| AI | `POST /api/ai/recommend` | Get AI plant recommendations (authenticated) |


## Future Improvements

- In-app messaging between donors and claimants
- Image-based plant disease detection
- Plant-care reminders and watering schedules
- Ratings and verification for nurseries and community members
- Better map visualization and directions
- Community challenges and impact metrics, such as plants shared and households reached

## Thank You :)

**Plant Connect: Share one, grow one, and make your community greener.**
