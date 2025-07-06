## Smart Quote (Frontend - Nuxt 3)

#### Smart Quote Frontend is a modern, responsive, and lightweight application built with Nuxt 3, designed to interact with the Smart Quote backend system. It empowers users to create, manage, and optimize customer quotations using AI-enhanced insights via OpenAI GPT-4. This application communicates with the Laravel backend to perform profitability calculations, receive AI-generated suggestions, and download PDF/CSV versions of quote summaries.

### Table of contents

-   [About](#about)
-   [Motivation](#motivation)
-   [Design Decisions](#design-decisions)
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

### Motivation

The frontend is designed to provide a smooth, modern, and responsive user experience for managing customer quotations. The goal was to create an intuitive interface that empowers users to easily input data, visualize profitability health through color-coded signals, and generate actionable insights.

To enhance the decision-making process, i integrated OpenAI’s GPT-4 API to provide AI-powered suggestions that help users optimize their quotes, identify low-margin items, and improve profitability. This AI integration adds significant value by giving intelligent, context-aware recommendations directly within the frontend interface.

By building the frontend with Nuxt 3, i leverage the power of Vue 3’s Composition API and Vite’s fast bundling, ensuring fast load times, excellent developer experience, and future scalability. The project is structured to be maintainable and extensible, with clear separation of concerns.

### Features

#### A [Nuxt 3/Vue 3](https://nuxt.com/) project.

| Smart Quote Features                                                                                                                                |
| :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| Built on [Nuxt 3](https://nuxt.com/)                                                             | Modern full-stack Vue framework                                                                 |
| Built on [Vue 3.1](https://vuejs.org/)                                                           | Composition API and reactive framework                                                         |
| Uses [Node.js 18+](https://nodejs.org/)                                                          | Server runtime                                                                                  |
| Color-coded quote health                                                                         | Displays health as Green, Amber, or Red                                                         |
| PDF and CSV export                                                                               | Generate and download reports in multiple formats                                               |
| Report versioning                                                                                | Users can view/download previous versions of reports                                            |
| Profitability calculations                                                                       | Calculates gross margin, labor cost, overheads, and highlights low-margin line items           |
| Tailwind CSS layout                                                                              | Fully responsive and mobile-first UI                                                           |
| Uses [Flowbite](https://flowbite.com/)                                                           | Pre-built components and better UI/UX experience                                                |
| Report filtering     

### Design Decisions

Framework Choice: Nuxt 3 was chosen for its modern Vue 3 foundation, strong ecosystem, built-in routing, and excellent support for server-side rendering and static generation — all helping improve performance and SEO.

State Management: Instead of Pinia, the app uses composables to manage state reactively. This reduces dependencies, simplifies the codebase, and leverages Vue 3’s Composition API for reusable logic.

Styling: Tailwind CSS combined with Flowbite UI components was selected to rapidly build a clean, responsive, and accessible interface without writing excessive custom CSS.

API Integration: The frontend follows an API-first approach, relying heavily on a Laravel backend for data processing, profitability calculations, and AI suggestion retrieval. This separation of concerns improves maintainability and scalability.

AI Integration: OpenAI’s GPT-4 API is integrated to provide real-time, intelligent suggestions based on the user’s quote data, enabling smarter quoting decisions without leaving the frontend.

Code Quality: Emphasis was placed on writing clean, modular, and well-documented code, following best practices such as DRY (Don’t Repeat Yourself), KISS (Keep It Simple Stupid), and SRP (Single Responsibility Principle).            

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