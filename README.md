# Kotakin

<p align="center">
  <img src="https://raw.githubusercontent.com/banyutekno/kotakin/main/web/assets/icon.svg" alt="Kotakin Logo" width="120">
</p>
---

Kotakin is a web-based manager for applications ("boxes") that are defined by templates and run as Docker containers. It provides a simple and allowing you to manage your applications from a clean web interface.

## Key Features

- **Template-Based Applications**: Define your applications using templates from Git repositories.
- **Docker-Powered**: Runs your applications in Docker containers, managed by Docker Compose.
- **Web UI**: An easy-to-use web interface for managing your applications.
- **Box Management**: Create, configure, start, stop, and delete your application "boxes".
- **Repository Management**: Add and manage Git repositories that contain your application templates.
- **Configuration Management**: Configure your boxes with environment variables.

## Technology Stack

- **Backend**: Go with Chi router
- **Frontend**: React with Vite, TypeScript, and Bootstrap
- **Containerization**: Docker and Docker Compose

## Getting Started

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/banyutekno/kotakin.git
   cd kotakin
   ```

2. **Run the application:**
   - **Backend:**
     ```sh
     pnpm dev:api
     ```
   - **Frontend:**
     ```sh
     pnpm dev
     ```

The application will be available at `http://localhost:3000`.

## Usage

1. **Add a Repository**: Go to the "Repositories" page and add a new Git repository that contains your application templates.
2. **Add a Box**: Go to the "Boxes" page and click "Add Box". Select a template from your repository, configure the environment variables, and create the box.
3. **Manage your Box**: Start, stop, and manage your box from the dashboard.

## License

This project is licensed under the [MIT License](LICENSE).
