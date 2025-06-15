# Snake Game

This project is a modern implementation of the classic Snake game, where players control a snake that grows by eating food while avoiding collisions with itself and the game boundaries. The objective is to achieve the highest possible score.

**Core Technologies:**
- **React:** A JavaScript library for building dynamic user interfaces.
- **Vite:** A fast build tool and development server optimized for modern web development.
- **TypeScript:** A typed superset of JavaScript for improved code quality and maintainability.
- **Tailwind CSS:** A utility-first CSS framework for rapid and responsive UI design.
- **shadcn-ui:** A collection of reusable UI components for a polished and consistent look.

## Features

- **Classic Snake Gameplay:** Enjoy the timeless mechanics of the original Snake game, guiding your snake to eat food and grow longer while avoiding obstacles.
- **Difficulty Levels:** Select from multiple difficulty settings, ranging from beginner to expert, to suit your skill level and challenge preferences.
- **High Score Tracking:** Compete with yourself or others, with a leaderboard to monitor your top scores and progress.
- **Achievements:** Unlock rewards by completing in-game milestones, such as reaching specific scores or surviving for extended periods.
- **Power-ups:** Collect special items that offer temporary boosts, such as speed reduction, invincibility, or score multipliers.
- **Theme and Snake Pattern Customization:** Personalize your experience with a variety of themes and snake designs.
- **Mobile Controls:** Play seamlessly on mobile devices with intuitive touch-based swipe controls.

## How to Play

**Objective:**  
Guide the snake to eat food items that appear on the screen. Each piece of food makes the snake grow longer, increasing your score. Avoid crashing into the game boundaries or the snake’s own body to keep playing.

**Controls:**  
- **Desktop:** Use the **Arrow Keys** (Up, Down, Left, Right) or **WASD** keys to steer the snake.  
- **Mobile:** **Swipe** in the desired direction (Up, Down, Left, Right) on the screen to control the snake.

**Scoring:**  
- Eating food increases your score, with point values varying by difficulty level.  
- Power-ups may grant bonus points or temporary score multipliers.

**Special Elements:**  
- **Power-ups:** Look out for occasional power-ups that provide advantages like slowing the snake, granting invincibility, or boosting your score. Use them wisely!

**Tips for Beginners:**  
- Start with the easiest difficulty to master the controls and gameplay.  
- Prioritize avoiding collisions over chasing food aggressively.  
- Time power-up usage strategically for maximum benefit.

## Getting Started

This section explains how to set up the project locally for development or testing and offers alternative methods for editing the codebase.

### Local Development Setup

Follow these steps to run the project on your machine:

1. **Prerequisites:**  
   - Install [Node.js](https://nodejs.org/) (LTS version recommended).  
   - Use [nvm (Node Version Manager)](https://github.com/nvm-sh/nvm#installing-and-updating) to manage Node.js versions (optional but recommended).  
   - npm (Node Package Manager) comes bundled with Node.js.

2. **Clone the Repository:**  
   ```sh
   git clone https://github.com/chintanboghara/Snake-Game.git
   ```

3. **Navigate to the Project Directory:**  
   ```sh
   cd Snake-Game
   ```

4. **Install Dependencies:**  
   ```sh
   npm install
   ```

5. **Run the Development Server:**  
   ```sh
   npm run dev
   ```  
   The app will typically be available at `http://localhost:5173`.

## Docker Setup

The project includes Docker configurations for both development and production environments.

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)  
- [Docker Compose](https://docs.docker.com/compose/install/)

### Development with Docker

- **Option 1: Using docker-compose with Hot Reload**  
  ```sh
  # Start the development server with hot reload
  docker-compose --profile local up
  # Access the app at http://localhost:5173
  ```

- **Option 2: Using Development Profile**  
  ```sh
  # Build and start the development environment
  docker-compose --profile dev up --build
  # Access the app at http://localhost:5173
  ```

### Production with Docker

- **Using docker-compose**  
  ```sh
  # Build and start the production environment
  docker-compose --profile prod up --build
  # Access the app at http://localhost:80
  ```

- **Using Docker Directly**  
  ```sh
  # Build the image
  docker build -t snake-game .
  # Run the container
  docker run -p 80:80 snake-game
  # Access the app at http://localhost:80
  ```

### Useful Docker Commands

```sh
# Stop all services
docker-compose down

# Remove containers and images
docker-compose down --rmi all

# View logs
docker-compose logs -f

# Rebuild without cache
docker-compose build --no-cache

# Run a specific profile
docker-compose --profile [dev|prod|local] up
```
