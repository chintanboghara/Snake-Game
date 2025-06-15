# Snake Game

Snake Game, a modern take on the classic arcade game! Control your snake as it slithers across the screen, eating food to grow longer and increase your score. But beware of colliding with the walls or your own tail, and it's game over! With multiple difficulty levels, achievements, and customizable themes, this version brings new life to the timeless gameplay.

## Features

- **Classic Snake Gameplay:** Enjoy the timeless mechanics of the original Snake game, guiding your snake to eat food and grow longer while avoiding obstacles.
- **Difficulty Levels:** Select from multiple difficulty settings, ranging from beginner to expert, to suit your skill level and challenge preferences.
- **High Score Tracking:** Compete with yourself or others, with a leaderboard to monitor your top scores and progress.
- **Achievements:** Unlock rewards by completing in-game milestones, such as reaching specific scores or surviving for extended periods.
- **Power-ups:** Collect special items that offer temporary boosts, such as speed reduction, invincibility, or score multipliers.
- **Theme and Snake Pattern Customization:** Personalize your experience with a variety of themes and snake designs.
- **Mobile Controls:** Play seamlessly on mobile devices with intuitive touch-based swipe controls.

## How to Play

### Objective
Guide the snake to eat food items that appear on the screen. Each piece of food makes the snake grow longer, increasing your score. Avoid crashing into the game boundaries or the snake’s own body to keep playing.

### Controls
- **Desktop:** Use the **Arrow Keys** (Up, Down, Left, Right) or **WASD** keys (W: Up, A: Left, S: Down, D: Right) to steer the snake.  
- **Mobile:** **Swipe** in the desired direction (Up, Down, Left, Right) on the screen to control the snake.

### Scoring
- Eating food increases your score, with point values varying by difficulty level.  
- Power-ups may grant bonus points or temporary score multipliers.

### Special Elements
- **Power-ups:** Look out for occasional power-ups that provide advantages like slowing the snake, granting invincibility, or boosting your score. Use them wisely!

### Tips for Beginners
- Start with the easiest difficulty to master the controls and gameplay.  
- Prioritize avoiding collisions over chasing food aggressively.  
- Time power-up usage strategically for maximum benefit.

## Getting Started

This section explains how to set up the project locally or using Docker for development or testing.

### Local Development Setup

Follow these steps to run the project on your machine:

1. **Prerequisites:**  
   - Install [Node.js](https://nodejs.org/) (version 14 or higher; LTS recommended).  
   - Optionally, use [nvm (Node Version Manager)](https://github.com/nvm-sh/nvm#installing-and-updating) to manage Node.js versions (recommended). Run `nvm install 14` and `nvm use 14` to set up the required version.  
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
   The development server will start, and the app will be available at the URL shown in the console, typically `http://localhost:5173`.

### Docker Setup

The project includes Docker configurations for both development and production environments.

#### Prerequisites
- [Docker](https://docs.docker.com/get-docker/)  
- [Docker Compose](https://docs.docker.com/compose/install/)

#### Development Environment
- **With Hot Reload:**  
  ```sh
  docker-compose --profile local up
  ```  
  Starts the development server with hot reload enabled. Access the app at `http://localhost:5173`.

- **Standard Development:**  
  ```sh
  docker-compose --profile dev up --build
  ```  
  Builds and starts the development environment. Access the app at `http://localhost:5173`.

#### Production Environment
- **Using docker-compose:**  
  ```sh
  docker-compose --profile prod up --build
  ```  
  Builds and starts the production environment. Access the app at `http://localhost:80`.

- **Using Docker Directly:**  
  ```sh
  docker build -t snake-game .
  docker run -p 80:80 snake-game
  ```  
  Builds the Docker image and runs the container. Access the app at `http://localhost:80`.

#### Useful Docker Commands
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

## Technologies Used

- **React:** For building dynamic and interactive user interfaces.
- **Vite:** A fast build tool and development server for modern web development.
- **TypeScript:** For improved code quality and maintainability with static typing.
- **Tailwind CSS:** For rapid and responsive UI design with utility-first classes.
- **shadcn-ui:** For reusable UI components that ensure a polished and consistent look.
