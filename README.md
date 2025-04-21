Set-Content -Path "c:\Users\adria\OneDrive\Desktop\BOT_SCRAPING\README.md" -Value @"
# LinkedIn Profile Scraping API

## Overview
NestJS application designed to scrape LinkedIn profiles and store data in MongoDB.

## Tech Stack
- NestJS
- MongoDB
- TypeScript
- Mongoose

## Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Ensure MongoDB is running on port 27017

3. Start the application:
\`\`\`bash
npm run start:dev
\`\`\`

## Database Configuration
- Database Name: Perfil_LK
- Default MongoDB URL: mongodb://127.0.0.1:27017
- Collection: linkedinprofiles

## Project Structure
\`\`\`
src/
├── linkedin/         # LinkedIn module
├── app.module.ts     # Main application module
└── main.ts          # Application entry point
\`\`\`

## API Endpoints
- POST /linkedin/profile - Save LinkedIn profile data
- GET /linkedin/profiles - Retrieve all profiles

## Error Handling
The application includes error handling for:
- Database connection issues
- Invalid data formats
- Server errors

## Development
To run in development mode with hot-reload:
\`\`\`bash
npm run start:dev
\`\`\`

## Production
To build and run in production:
\`\`\`bash
npm run build
npm run start:prod
\`\`\`

## Docker
- Docker compose build
- Docker compose up -d
-"@
