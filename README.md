# GraphQL Demo – Project Task Tool

This is a small demo application created to familiarize myself with GraphQL and frontend–backend communication. It was also an exercise in using Tailwind CSS.

## Features

- The app includes built-in customers, projects, and project tasks
- Lists all customers, their projects, and tasks within those projects
- Each task has:
  - A priority (Low, Medium, High)
  - A status (Todo, In Progress, Done)
- Task status can be updated
- New tasks can be added to projects

## Tech Stack

**Backend**

- Python
- Django
- Strawberry
- GraphQL

**Frontend**

- TypeScript
- React
- Vite
- Tailwind CSS
- GraphQL
- Apollo Client

The backend uses seed data defined in `data.py`. All data is stored in backend runtime memory — there is no database. The goal of the project is to demonstrate working GraphQL-based communication between frontend and backend, not persistence or production setup.

## Running the project

### Prerequisites

- Docker

### Steps

1. Clone the repository
2. In the project root, run `docker compose up --build`
