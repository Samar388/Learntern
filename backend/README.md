# Learntern Backend

This is the backend for **Learntern**, a learning management portal. The backend is built with PHP and follows the service container design pattern for better modularity and maintainability.

## Features

- RESTful API endpoints for all functionalities
- Service container-based architecture
- Designed for integration with frontend clients

## Getting Started

### Prerequisites

- PHP (compatible version)
- Composer

### Installation

1. Clone the repository.
2. Install dependencies:
    ```bash
    composer install
    ```
3. Copy `.env.example` to `.env` and configure your environment variables.
4. Generate application key:
    ```bash
    php artisan key:generate
    ```
5. Run migrations (if applicable):
    ```bash
    php artisan migrate
    ```

### Running the Server

Start the development server with:

```bash
php artisan serve
```

The API will be available at `http://localhost:8000`.

## API

All backend functionality is exposed via API endpoints. Refer to the API documentation or codebase for available routes and usage.

## Design Pattern

This project primarily uses the **service container** pattern to manage dependencies and promote clean, testable code.

## License

See [LICENSE](./LICENSE) for details.