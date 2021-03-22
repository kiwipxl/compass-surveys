## Surveys

To add a new survey, add a json file to `/surveys`. This file will be validated with JSON schema, so the server will throw an error if the format, syntax, or types are wrong.

## REST API Routes

For all request and response types, see the definitions [here](https://github.com/kiwipxl/compass-surveys/blob/master/packages/common/src/main.ts).

`GET /`

Serves the production web app (index.html) at `/packages/web/build`

### Surveys

`GET /api/surveys`

Returns a list of all surveys. `Survey[]`

`GET /api/surveys/:id`

Returns a specific survey. `Survey`

### Submissions

`GET /api/surveys/:id/submissions`

Returns a list of all submissions for a specific survey. `Submission[]`

`GET /api/surveys/:id/submissions/:id`

Returns a specific submission for a specific survey. `Submission`

`POST /api/surveys/:id/submissions`

Creates a new submission for a specific survey. Request: `Submission` Response: `Submission`

## SQL Design

There are two tables - `responses` and `submissions`. I used database normalization (3NF) to simplify the design.

There was two ways to go about this. I could've had a table for every question (CheckboxQuestion, ShortAnswerQuestion, ...) and had a custom type for every value. Short answer questions would have a `TEXT` type while checkbox questions would have an string of arrays or a normalized table with `x` number of rows.

I found that method overly complex, so instead I made a response table where every value was `TEXT`. This means that even the LinearScale question which has an actual number type is stored as a string instead. This simplifies things a lot.

## API Design

I debated whether to use [graphQL](https://graphql.org/) or REST. In the end, I went with REST as our api is very simple and small and there was no need to overcomplicate it with graphQL.

I also thought about using [open API swagger](https://swagger.io/specification/) for defining the REST routes, but also found it too complicated and without a very mature ecosystem for node.