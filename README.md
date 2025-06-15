
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/d5757522-b5e0-4a17-9bf1-f073765f46d5

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/d5757522-b5e0-4a17-9bf1-f073765f46d5) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

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
docker build -t pixel-python-challenge .

# Run the container
docker run -p 80:80 pixel-python-challenge

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

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

**Deploy with Lovable**

Simply open [Lovable](https://lovable.dev/projects/d5757522-b5e0-4a17-9bf1-f073765f46d5) and click on Share -> Publish.

**Deploy with Docker**

The project includes Docker configuration for easy deployment to any Docker-compatible hosting service:

1. **Docker Hub**: Push your built image to Docker Hub and deploy to services like AWS ECS, Google Cloud Run, or Azure Container Instances.

2. **Self-hosted**: Use the included docker-compose.yml file to deploy on your own server.

3. **Cloud Platforms**: Deploy directly to platforms like Railway, Render, or DigitalOcean App Platform using the Dockerfile.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
