# Cloud-Native-WebApp
# Overview

This is a simple cloud-native backend web application built with Node.js, Express, and PostgreSQL. It implements a health check API endpoint (/healthz) to demonstrate backend development and database integration principles.

Each time the endpoint is accessed, a record is inserted into the database to track health check requests.

# Project Structure

Cloud-Native-WebApp/
src/config/db.js – Explain Sequelize setup and connection options.

src/models/HealthCheck.js – Explain model definition, data types, primary key, and table mapping.

src/routes/health.js – Explain the Express router, GET request handling, payload rejection, method restriction, and status codes.

src/index.js – Explain server setup, middleware, health endpoint logic, Sequelize sync, and server startup.

README.md # Project documentation

# Technologies & Tools

Node.js – JavaScript runtime for server-side applications
Express.js – Minimalist web framework for building RESTful APIs
PostgreSQL – Relational database to store health check records
Sequelize ORM – Object-relational mapping for database interaction
dotenv – Environment variable management
nodemon – Development tool for automatically restarting the server
ESLint – JavaScript code linter for best practices

Main Application (src/index.js)

Loads environment variables, sets up Express, connects to PostgreSQL via Sequelize
Defines the health check endpoint /healthz
Synchronizes database tables automatically
Starts server on the configured port

# Testing the Health Endpoint

# Successful health check
curl -i http://localhost:8080/healthz

# Wrong HTTP method
curl -i -X PUT http://localhost:8080/healthz

# Sending payload (should return 400)
curl -i -X GET -d '{"test":1}' http://localhost:8080/healthz -H "Content-Type: application/json"


##Expected responses:

200 OK – Health check recorded

405 Method Not Allowed – Wrong HTTP method

400 Bad Request – Payload provided in GET request