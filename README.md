# Raistopy

## Application Overview

**Raistopy** is an experimental web application developed as part of the "Realizacja Aplikacji Internetowych" laboratory course. The project integrates **Vue.js** for the frontend, **Express.js** for the backend, and **Mongoose** to communicate with a MongoDB database. The entire application is built on a micro-frontends architecture and containerized using **Docker**.

- This application displays information about public transportation stops using the ZTM Gdańsk API. 
- The data is periodically synchronized to ensure its accuracy. 
- Allows users to add and remove stops from their list of favorites (only for logged-in users).
> **Note:** CSS styling was not the primary focus – sometimes it was implemented in a quick-and-dirty way for experimental purposes.
---

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)

---

## Features

- **Micro-frontends:** The project is divided into independent frontend modules, allowing for separate iteration, testing, and deployment. These modules synchronize via Vite and module federation.
- **Containerization:** The entire application is containerized using Docker, ensuring a consistent environment and simplifying deployment.
- **Backend API:** Built with Express.js to create a REST API, integrated with Mongoose for MongoDB communication.
- **Database:** Uses MongoDB.
- **Automated Testing:** End-to-end tests have been implemented using Cypress, along with unit and integration tests using Vitest.
- **Experimental Approach:** The project focuses on experimenting with modern web technologies and architectural patterns rather than on refined CSS design.

---

## Technologies

- **Frontend:** [Vue.js](https://vuejs.org/)
- **Backend:** [Express.js](https://expressjs.com/) & [Mongoose](https://mongoosejs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/)
- **Containerization:** [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- **Testing:** [Cypress](https://www.cypress.io/) and [Vitest](https://vitest.dev/)
- **Architecture:** Micro-frontends

---

## Installation

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [MongoDB](https://www.mongodb.com/) – you can use the containerized version

### Step-by-Step Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Sladamos/Raistopy.git
   cd Raistopy
   ```
2. **Configure the Backend Environment:**
   ```bash
   cd backend
   mv docker-config-template.env docker-config.env
    ``` 
   Fill the docker-config.env file with appropriate content. I provided docker-config-template.env, but be aware of that. You should change its content.
3. **Build and start the Docker Containers:**
   ```
   cd ..
   docker-compose up -d --build
   ```
4. **Visit site**
   - Check your site on http://localhost:5000

### Testing

Simple tests are written but are not possible to launch due to containerization. Fell free to write more tests and made them runnable in PR.
