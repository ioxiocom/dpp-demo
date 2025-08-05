# DPP Demo application

Small demo application to demonstrate how Digital Product Passport -style usage might work for sharing
real-time data about their products.

Goals:

- Simple to extend with new items, new data products, etc.
- Durable, attempts to self-recover from errors and should not blow up seriously if e.g. network connection
  isn't good
- Support mocking APIs as necessary
- Filter available data based on role

## TODO

- Deployment
- Full user data as needed to render login + menu
- Correct user data
- Log out
- Menu updates based on login state
- All styles
- Correct images for items
- Full list of items
- Full list of supported data products
- Configure data products per role correctly
- Social metadata, favicon, etc.
- Some unit tests?

## Development

Prerequisites:

- [Node 22](https://nodejs.org/en/download)
- [Bun](https://bun.sh/docs/installation)
- [Pre-commit](https://pre-commit.com/#install)

Prepare

```shell
pre-commit install
bun install
```

Run dev server

```shell
bun dev
```

Autoformat files

```shell
bun format
```

Build + run

```shell
bun run build
bun start
```

## Tests

You can run unit tests with

```shell
bun run test
```

## Supported items

To configure supported items, what they're connected to, and what data is available for each of them, you need
to edit [src/lib/items.ts](src/lib/items.ts).

## Access Control Keys

You should configure the access control keys for new sources in
[src/lib/secrets.server.ts](src/lib/secrets.server.ts), using a `ACK_DEFINITION_PATH_SOURCE_NAME` -pattern for
environment variables.

Add new environment variables to [.env.example](.env.example). When testing copy it to `.env` and fill in the
keys from [https://developer.ioxio.io/access-control-keys/](https://developer.ioxio.io/access-control-keys/).

## Data Products

To support a data product, we need a component for it in [src/lib/dataproducts](src/lib/dataproducts) and that
component to be exported in [src/lib/dataproducts.ts](src/lib/dataproducts.ts). The component will get as
input the request props and response props, with whatever data has been given.

You can implement mock responses in [src/lib/api/mocks.ts](src/lib/api/mocks.ts). Mocked responses skip
requests to the server completely while pretending to take a bit of time.

## Caches

API Tokens are cached on the server-side for 50 minutes in
[src/lib/api/dataspace.server.ts](src/lib/api/dataspace.server.ts).

Data Products are cached on the client-side for 5 minutes in
[src/lib/api/dataproduct.ts](src/lib/api/dataproduct.ts). Invalidated by reload.
