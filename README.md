
# Snake Game - Built with React & Vite

This project is a classic Snake game implementation where the player controls a snake that grows by eating food while avoiding collisions with itself and the game boundaries. The objective is to achieve the highest possible score.

**Core Technologies:**
- **React:** A JavaScript library for building user interfaces.
- **Vite:** A fast build tool and development server for modern web projects.
- **TypeScript:** A typed superset of JavaScript that enhances code quality and maintainability.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **shadcn-ui:** A collection of re-usable UI components for a polished look and feel.

## Features

- Classic Snake gameplay: Enjoy the timeless mechanics of the original Snake game.
- Difficulty levels: Choose from various difficulty settings to match your skill level.
- High score tracking: Compete with yourself and others to achieve the highest score.
- Achievements: Unlock achievements for completing specific in-game milestones.
- Power-ups: Discover and utilize power-ups that provide temporary advantages.
- Theme and snake pattern customization: Personalize your gaming experience with different themes and snake patterns.
- Mobile controls: Play on the go with intuitive touch controls for mobile devices.

## How to Play

**Objective:**
The main goal of the game is to control the snake to eat food items that appear on the screen. Each piece of food consumed makes the snake grow longer. Players must avoid colliding with the game boundaries or the snake's own body. The longer the snake gets, the higher the score.

**Controls:**
- **Desktop:** Use the **Arrow Keys** (Up, Down, Left, Right) or **WASD** keys to change the snake's direction.
- **Mobile:** **Swipe** in the desired direction (Up, Down, Left, Right) on the screen to control the snake.

**Special Elements:**
- **Power-ups:** Occasionally, special power-ups may appear. These can provide temporary advantages like slowing down the snake, making it invincible for a short period, or increasing the score multiplier. Keep an eye out for them!

## Getting Started

This section outlines how to get the project running on your local machine for development and testing purposes, along with alternative ways to edit the codebase.

### Local Development Setup

Follow these steps to set up the project locally:

1.  **Prerequisites:**
    *   Ensure you have [Node.js](https://nodejs.org/) installed (LTS version recommended).
    *   We recommend using [nvm (Node Version Manager)](https://github.com/nvm-sh/nvm#installing-and-updating) to manage Node.js versions.
    *   npm (Node Package Manager) is included with Node.js.

2.  **Clone the Repository:**
    ```sh
    # Replace <YOUR_GIT_URL> with the actual Git URL of this repository.
    git clone <YOUR_GIT_URL>
    ```

3.  **Navigate to Project Directory:**
    ```sh
    # Replace <YOUR_PROJECT_NAME> with the name of the directory created by cloning.
    cd <YOUR_PROJECT_NAME>
    ```

4.  **Install Dependencies:**
    ```sh
    npm install
    ```

5.  **Run the Development Server:**
    ```sh
    npm run dev
    ```
    The application should now be running, typically on `http://localhost:5173`.

### Alternative Editing Methods

**Editing directly in GitHub:**
- Navigate to the desired file(s) in this repository.
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit them.

**Using GitHub Codespaces:**
- Navigate to the main page of this repository.
- Click on the "Code" button (green).
- Select the "Codespaces" tab.
- Click on "Create codespace on main" (or your current branch) to launch a new Codespace.
- Edit files directly within the Codespace, then commit and push your changes.

## Docker Setup

This project includes Docker configuration for both development and production environments.

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Development with Docker

**Option 1: Using docker-compose with hot reload**
```sh
# Start development server with hot reload
docker-compose --profile local up

# The app will be available at http://localhost:5173
```

**Option 2: Using development profile**
```sh
# Build and start development environment
docker-compose --profile dev up --build

# The app will be available at http://localhost:5173
```

### Production with Docker

**Using docker-compose**
```sh
# Build and start production environment
docker-compose --profile prod up --build

# The app will be available at http://localhost:80
```

**Using Docker directly**
```sh
# Build the image
docker build -t snake-game .

# Run the container
docker run -p 80:80 snake-game

# The app will be available at http://localhost:80
```

### Docker Commands

```sh
# Stop all services
docker-compose down

# Remove all containers and images
docker-compose down --rmi all

# View logs
docker-compose logs -f

# Rebuild without cache
docker-compose build --no-cache

# Run specific profile
docker-compose --profile [dev|prod|local] up
```

## How can I deploy this project?

**Deploy with Docker**

The project includes Docker configuration for easy deployment to any Docker-compatible hosting service:

1. **Docker Hub**: Push your built image to Docker Hub and deploy to services like AWS ECS, Google Cloud Run, or Azure Container Instances.

2. **Self-hosted**: Use the included docker-compose.yml file to deploy on your own server.

3. **Cloud Platforms**: Deploy directly to platforms like Railway, Render, or DigitalOcean App Platform using the Dockerfile.
