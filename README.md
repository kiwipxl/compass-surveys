<h1 align="center">Compass Surveys</h1>

<div align="center">Full-stack survey app built in React & Node</div>

<h3 align="center">
  <a href="https://compass-surveys.herokuapp.com/">Visit the app</a> |
  <a href="https://github.com/kiwipxl/compass-surveys/tree/master/packages/web">View client</a> |
  <a href="https://github.com/kiwipxl/compass-surveys/tree/master/packages/server">View server</a>
</h3>

![Tech Stack](screenshots/tech-stack.png?raw=true)

## What this is 🤷‍♀️

The app lets you respond to surveys and see all responses for every survey.

There is no survey creation GUI. Surveys are described as JSON and put in the `/packages/server/surveys` folder. They are validated using JSON schema.

## Project structure 🏗

This project uses Yarn 2 and the [Zero-Installs](https://next.yarnpkg.com/features/zero-installs/) feature. This means that all modules are pushed to the repo and everything "just works".

It also uses [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) to separate packages and share code and packages between them.

| Package    | Description                                                                                                                                                                                                                 |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/common`    | Contains common code shared between all packages. Basically, typescript definitions for what our server data models look like.                                                                                                                          |
| `packages/server`   | Node server that hosts the web app at `/` and the REST API at `/api`                                                                                                                                                                |
| `packages/web`   | React Client web app.                                                                                                                                 |

## Setting up development environment 🛠

- Install [postgreSQL](https://www.postgresql.org/) if you don't have it already and create a database named `postgres`.
- `git clone https://github.com/kiwipxl/compass-surveys.git`
- Create an empty `.env` file in `/packages/server`, copy `/packages/server/.env.example` contents into it, and fill in your database username and password.
- `yarn install`
- `cd packages/server && yarn dev`
- `cd packages/web && yarn start` in another terminal tab
- App should now be running on `http://localhost:3000/`

## Building

- Run `yarn run build` in the root folder. This will build both the web and server packages.
- Run `yarn run start` in the root folder to start the web and server in the production environment.