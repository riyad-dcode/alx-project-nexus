#  Movie Recommendation Web App

A real-world style movie recommendation platform where users can browse trending movies, view detailed information via dynamic routing, and receive personalized recommendations by saving favorites locally.

**This project demonstrates modern frontend engineering practices using Next.js, TypeScript, Styled Components, and real API integration to deliver an engaging, interactive user experience.**

---

## Project Overview

The Movie Recommendation Web App combines dynamic routing, local data storage, and interactive UI design to provide a complete, responsive movie discovery platform.

### Users can:

- *Browse trending movies fetched from a public movie API.*

- *View detailed pages for each movie using Next.js page routing.*

- *Save and view their favorite movies locally (via local storage) for a personalized dashboard.*

- *Enjoy a responsive and animated UI with smooth navigation and transitions.*

---

## Project Goals

- *Dynamic Routing*

- *Implement detailed movie pages using Next.js dynamic routing.*

- *User Personalization*

- *Enable users to save and manage favorite movies via local storage or API.*

- *Interactive Dashboard*

- *Create a responsive, visually appealing dashboard featuring trending and recommended movies.*

---

## Technologies Used

- *Next.js* – Server-side rendering, routing, and performance optimizations.

- *React* – Component-based UI development.

- *TypeScript* – Strong typing and scalable code structure.

- *Styled Components* – Scoped, reusable styling for UI consistency.

- *TMDB Movie API* – Public API for fetching trending and recommended movie data.

---

## Key Features

### 1. API Integration

Fetch trending and recommended movies from a public movie API.

### Handle loading states and error messages gracefully.

### 2. Dynamic Routing

Each movie has a dedicated detail page generated via Next.js page routing.

Optimized server-side rendering ensures fast and SEO-friendly navigation.

### 3. Save Favorite Movies

Users can save favorites locally (local storage) or connect to a backend API.

Dedicated favorites section on the dashboard for quick access.

### 4. Responsive & Interactive UI

Movie dashboard with trending and recommended categories.

Hover effects, animations, and transitions for engaging interactions.

Fully responsive design across mobile, tablet, and desktop.

---

## Implementation Process

The project follows a Git commit workflow for structured development:

### Initial Setup
feat: initialize Next.js project with TypeScript  
feat: integrate movie API for fetching data  

### Feature Development
feat: implement detailed movie pages with dynamic routing  
feat: add functionality to save favorite movies  

### UI Enhancements
style: design UI using Styled Components  

### Bug Fixes
fix: resolve rendering issues on dynamic pages  

### Documentation
docs: add API setup and usage instructions  

---

## Getting Started

### 1. Clone the Repository
git clone https://github.com/riyad-dcode/alx-project-nexus.git
cd movie-rec-app

### 2. Install Dependencies
npm install

### 3. Set Up Environment Variables
Create a .env.local file in the root directory and add your API key:

NEXT_PUBLIC_MOVIE_API_KEY=your_api_key_here
NEXT_PUBLIC_MOVIE_API_URL=https://api.themoviedb.org/3

### 4. Run the Development Server
npm run dev

Visit http://localhost:3000 to view the app.

--- 

## Preview

[App Screenshot](./public/screenshot.png)



