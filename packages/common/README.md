This exists so that the client/server know exactly how to communicate with each other and with what types. For example, a client may send a request with data of `Submission` and the server then knows this type and all it's fields. No more guess work.

## Schema

The `definitions.json` file is a JSON schema that is automatically generated of all types in this package. That means that given a JSON file that contains data such as a `Survey`, we can validate it with this file.

This is exactly what the server does when validating JSON requests sent from the client.

Run `yarn run build_schema` to update the schema whenever the types change.