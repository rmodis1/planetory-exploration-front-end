# Planetary Exploration Front-End

A web application for managing space missions, discovering planets, and tracking celestial discoveries. Built with Angular, this application provides a modern interface for space exploration management.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.11.

## Features

- **Mission Management**
  - Create new missions
  - View mission details
  - Update existing missions
  - Delete missions

- **Planet Database**
  - View detailed planet information
  - Add new planets
  - Update planet details
  - Delete planets from database

- **Discovery Tracking**
  - Record new discoveries
  - Associate discoveries with missions
  - Categorize discoveries by type
  - Manage discovery details

## Prerequisites

- Node.js (version 16.x or higher)
- npm (version 8.x or higher)
- Angular CLI (version 17.x)
- .NET Core API (running on localhost:5125)

## Installation

1. Clone the repository
   ```bash
   git clone [repository-url]
   cd planetary-exploration

2. Install dependencies
    ```bash
    npm install
3. Start the development server
    ```bash
    ng serve
4. Navigate to http://localhost:4200/ in your browser

## API Integration

The application connects to a .NET Core backend running on http://localhost:5125. 

Ensure the API is running before starting the Angular application.

Key endpoints:

/api/mission - Mission management
/api/planet - Planet database
/api/discovery - Discovery tracking

