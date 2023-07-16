# WG-Sync
=======
# wg-sync

## What is this?
Diese App soll dazu dienen Aufgaben und Termine die in einer WG anfallen zu Organisieren.

## Was kann die App?

- [x] Projektinitialisierung
- [ ] Komponenten für den Kalender erstellen
- [ ] Funktionalität für die Putzplanung implementieren
- [ ] Müllplan-Funktion hinzufügen
- [ ] Einkaufslistenverwaltung mit WG-Konto verbinden
- [ ] Benutzerauthentifizierung implementieren
- [ ] WG-Erstellung und Einladungen ermöglichen
- [ ] Backend mit MongoDB einrichten
- [ ] Datenbankzugriff in der App integrieren
- [ ] Responsives Design für verschiedene Geräte anpassen
- [ ] Tests schreiben und durchführen
- [ ] Dokumentation vervollständigen
- [ ] App bereitstellen und veröffentlichen

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