# Expressive [![GitHub build](https://badgen.net/badge/build/v1.0.0/blue?icon=build)](https://badgen.net/badge/build/v1.0.0/blue?icon=build) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

A heavily opinionated and feature-rich web framework that combines Dependency Injection with Aspect-Oriented-Programming at the core of it's design, yet provides a good level of abstraction for the developer. It comes with a better logging system, validation, exception-handling and a helpful interceptor out of the box. By default, it has firebase-admin integration. Work is still in progress, but it's out there for trying.

## Getting Started

1. Make sure you have mongodb server running locally.
2. Create a ".env" file at the root of the cloned repository.
3. Add these values to it
  ```shell
    PORT=3000
    HOST="http://localhost"
    MONGODB_HOST="mongodb://localhost"
    MONGODB_PORT=<YOUR_MONGODB_SERVER_PORT | 27017>
    MONGODB_DATABASE=<YOU_DATABASE_NAME>
  ```
4. Open your terminal and depending on your package manager run "yarn install" or "npm install".
5. After that run "yarn start" or "npm start", and your application will be running at http://localhost:3000
