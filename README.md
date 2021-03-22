<h1 align="center">Compass Surveys</h1>

<div align="center">Simple full-stack survey app built in React & Node</div>

<h3 align="center">
  <a href="https://compass-surveys.herokuapp.com/">Visit the app</a> |
  <a href="https://github.com/kiwipxl/compass-surveys/tree/master/packages/web">View client</a> |
  <a href="https://github.com/kiwipxl/compass-surveys/tree/master/packages/server">View server</a>
</h3>

![Tech Stack](screenshots/tech-stack.png?raw=true)

## Setting up development environment 🛠

- Install [postgreSQL](https://www.postgresql.org/) if you don't have it already and create a database named `postgres`.
- `git clone https://github.com/kiwipxl/compass-surveys.git`
- Create an empty `.env` file in `/packages/server`, copy `/packages/server/.env.example` contents into it, and fill in your database username and password.
- `yarn install`
- `cd packages/server && yarn dev`
- `cd packages/web && yarn start` in another terminal tab
- App should now be running on `http://localhost:3000/`