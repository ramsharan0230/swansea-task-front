## Smart Quote (Frontend - Nuxt 3)

#### Smart Quote Frontend is a modern, responsive, and lightweight application built with Nuxt 3, designed to interact with the Smart Quote backend system. It empowers users to create, manage, and optimize customer quotations using AI-enhanced insights via OpenAI GPT-4. This application communicates with the Laravel backend to perform profitability calculations, receive AI-generated suggestions, and download PDF/CSV versions of quote summaries.

### Table of contents

-   [About](#about)
-   [Features](#features)
-   [Tech Stacks](#tech-stacks)
-   [Installation Instructions](#installation-instructions)
-   [Environment File](#environment-file)
-   [Uses](#Uses)
-   [Folder Structure](#folder-structure)
-   [Approach](#approach)
-   [API Integration](#api-integration)
-   [AI Suggestions](#ai-suggestions)
-   [Versionings](#versonings)

### About

Smart Quote enables businesses to analyze cost structures and profitability for quotes. The frontend provides a user-friendly interface to:

    - Input product/service data
    - Apply margins and overheads
    - View profitability health (Green / Amber / Red)
    - Receive GPT-4 powered suggestions
    - Export versioned reports in PDF/CSV formats

The frontend is tightly integrated with a Laravel backend and OpenAI for intelligent recommendations.


### Features

#### A [Nuxt 3/Vue 3](https://nuxt.com/) project.

| Smart Quote Features                                                                                                                                |
| :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| Built on [Nuxt](https://nuxt.com/)3                                                                                                          |
| Built on [Vue](https://getbootstrap.com/) 3.1                                                                                                        |
| Uses [Node Server](https://npmjs.com) 11                                                                                      

| Color-coded quote health (Green, Amber, Red)
                                                                                           |
| Downloadable quote reports in the format of PDF and CSV
                                                                               |
| Users can view/download previous versions of reports                                                |
| Calculates gross margin, labor cost, overheads, and highlights low-margin line items                                                                 |
| Tailwind CSS-based fully responsive layout                                                        |
| Uses Flowbite for better UI/UX experience                                                                        |
| Filter historical reports based on IP

            |
### Tech Stacks
    - Nuxt 3 (Vue 3 Composition API, Vite)
    - TypeScript
    - Vue-Spinner(for loader)
    - Tailwind CSS
    - Flowbite
    - Axios – HTTP client
    - OpenAI API
    - Backend: Laravel 10 (API Integration)

### Installation Instructions

1. Run `git clone https://github.com/ramsharan0230/swansea-task-front.git swansea-task-front` 
2. Run `cp .env.example .env`
3. Run `npm install`
4. Run `npm run dev`
5. To Build run `npm run build`
6. To Preview `npm run preview`

### Environment File

Example `.env` file:

```bash
NUXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```
Ensure your Laravel backend is running at the specified API base URL.

### Folder Structure
    swansea-task-front/
    │
    ├── assets/            # CSS, images, fonts
    ├── components/        # Vue components (ProductList, QuoteForm, AIInsights)
    ├── composables/       # Custom composables (useReport.ts, useProducts.ts)
    ├── layouts/           # Nuxt layouts
    ├── pages/             # Nuxt file-based routing
    ├── plugins/           # Axios and other global plugins
    ├── public/            # Static assets
    ├── utils/             # Utility functions
    ├── nuxt.config.ts     # Nuxt configuration
    └── .env               # Environment variables

### Approach
    - Composable Architecture: The app uses reusable composables (useProducts, useAI, etc.)
    - Pinia Stores: Centralized state for products, reports, suggestions
    - Tailwind UI: Clean and mobile-first UI design
    - API-First: Relies entirely on backend for data and business logic
    - Versioning System: Maintains and fetches report versions from backend
    - AI Integration: GPT-4 provides suggestions based on selected quote data

### Usage
    - Visit the app at http://localhost:3000
    - Add products, services, labor hours, and cost inputs
    - Click Generate Summary to calculate margins and receive suggestions
    - Export reports using Export as PDF/CSV
    - Access Previous Reports to view/download older versions

### API Integration
    The frontend communicates with the following backend endpoints:
     - GET    /api/products                 # Fetch products
     - POST   /api/suggestion               # Send quote data to OpenAI
     - POST   /api/report/export-quote-summary  # Export PDF/CSV
     - GET    /api/report/fetch-all        # Fetch report history


### AI Suggestions
    - Uses GPT-4 via OpenAI API
    - Suggests alternative products, pricing tweaks, and summaries
    - AI feedback is editable before report export
    - Key prompt elements:
    - Low-margin product flags
    - Labor cost warning
    - Profitability status

### Versionings
    - Every report is saved with a version number
    - Users can fetch/download previous versions
    - Files are stored in the public directory and linked to database records