# WG-Sync

## Setup
`cp .env.example .env` Fill out .env file
`npm i`
`npx prisma migrate dev`

## Useful commands
`npx prisma migrate dev` Applies all migrations

`npx prisma migrate dev --name #MIGRATIONNAME#` Generate a Migration with a Name

## TRPC API Panel

You can see all tRPC routes on `http://localhost:3000/api/panel`

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.