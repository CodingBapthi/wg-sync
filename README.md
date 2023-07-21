# WG-Sync
=======
# wg-sync

## What is this?
Diese App soll dazu dienen Aufgaben und Termine die in einer WG anfallen zu Organisieren.

## Features der App
* Kalender
  * Putzplan
  * Müllplan
  * Gemeinsame Aktivitäten
* Einkaufslisten
* WG-Konto Verwaltung
* Nutzerverwaltung
* Benachrichtigungen
* Responsive Design

## ToDo für die App (Funktionen)

- [ ] WG-Listen
  - [ ] Einkaufslisten
    - [ ] Einkaufslisten erstellen
    - [ ] Einkaufslisten bearbeiten
    - [ ] Einkaufslisten löschen
  - [ ] ToDo-Listen
    - [ ] ToDo-Listen erstellen
    - [ ] ToDo-Listen bearbeiten
    - [ ] ToDo-Listen löschen
- [ ] Kalender mit Terminen für (z.B. Müllabfuhr, Putzplan, Gemeinsame Aktivitäten)
  - [ ] Müllabfuhr
    - [ ] Müllplan
    - [ ] Erinnerungsfunktion
  - [ ] Putzplan
    - [ ] Putzplan
      - [ ] ToDo-Liste
      - [ ] Erinnerungsfunktion
  - [ ] Gemeinsame Aktivitäten
    - [ ] Kalender
    - [ ] Erinnerungsfunktion
- [ ] WG-Konto Verwaltung
  - [ ] Monatliche Kosten
  - [ ] Erinnerungsfunktion
  - [ ] Einkaufslisten mit WG-Konto verbinden
- [ ] Nutzerverwaltung
  - [ ] Benutzer erstellen
  - [ ] Benutzer einladen
  - [ ] Benutzer entfernen
  - [ ] Benutzerrechte verwalten

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