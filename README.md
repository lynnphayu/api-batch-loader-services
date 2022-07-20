## Description

- This is a service that batch-fetches rick and morty characters with [rickandmorty](https://github.com/afuh/rick-and-morty-api-node).
- Example, if two clients of this service fetch characters with ids 1,2 and 3,4 respectively in a certain period of time (buffer time), service will fetch characters through rick and morty api with ids 1,2,3,4 only once and distribute to clients.
- Built with [Nestjs](https://github.com/nestjs/nest)
- Can access through tcp or http

### HTTP

```
GET /ids[0]=3&ids[1]=4
```

### TCP

```json
{
  "pattern": "CMD_FIND_BY_IDS",
  "data": [1, 2]
}
```

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```
