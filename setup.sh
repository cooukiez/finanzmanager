#!/bin/bash

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${YELLOW}=== FinanzManager Einrichtungsskript ===${NC}"
echo -e "Richte deine Finanzverwaltungsanwendung ein..."

if ! command -v sqlite3 &> /dev/null; then
    echo -e "${RED}sqlite3 Befehl nicht gefunden. Bitte installiere zuerst SQLite3.${NC}"
    echo -e "Auf Ubuntu/Debian: sudo apt-get install sqlite3"
    echo -e "Auf macOS mit Homebrew: brew install sqlite3"
    echo -e "Auf Windows: Herunterladen von https://www.sqlite.org/download.html"
    exit 1
fi

mkdir -p prisma/databases

if [ ! -f .env ]; then
  echo -e "${YELLOW}Erstelle .env Datei...${NC}"
  echo 'DATABASE_URL="file:./databases/dev.db"' > .env
  echo -e "${GREEN}Habe .env Datei mit SQLite Datenbankkonfiguration erstellt.${NC}"
else
  echo -e "${GREEN}.env Datei existiert bereits. Überspringe Erstellung.${NC}"
fi

DB_PATH="prisma/databases/dev.db"
if [ ! -f "$DB_PATH" ]; then
  echo -e "${YELLOW}Erstelle SQLite Datenbank direkt mit sqlite3...${NC}"
  sqlite3 "$DB_PATH" "PRAGMA foreign_keys = ON;" ".databases" ".quit"
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}SQLite Datenbank erfolgreich erstellt unter $DB_PATH${NC}"
  else
    echo -e "${RED}Fehler beim Erstellen der SQLite Datenbank.${NC}"
    exit 1
  fi
else
  echo -e "${GREEN}SQLite Datenbank existiert bereits unter $DB_PATH${NC}"
fi

echo -e "${YELLOW}Installiere Abhängigkeiten...${NC}"
npm install
if [ $? -eq 0 ]; then
  echo -e "${GREEN}Abhängigkeiten erfolgreich installiert.${NC}"
else
  echo -e "${RED}Fehler beim Installieren der Abhängigkeiten. Bitte überprüfe deine npm Konfiguration.${NC}"
  exit 1
fi

echo -e "${YELLOW}Generiere Prisma Client...${NC}"
npx prisma generate
if [ $? -eq 0 ]; then
  echo -e "${GREEN}Prisma Client erfolgreich generiert.${NC}"
else
  echo -e "${RED}Fehler beim Generieren des Prisma Clients.${NC}"
  exit 1
fi

echo -e "${YELLOW}=== Einrichtung abgeschlossen ===${NC}"
echo -e "${GREEN}Deine FinanzManager Anwendung ist bereit zum Ausführen!${NC}"
echo -e "Starte den Webserver mit: ${YELLOW}npm run rsop${NC}"
echo -e "Greife auf Prisma Studio mit: ${YELLOW}npm run prisma:studio${NC} zu, um die Datenbank zu visualisieren"

echo -e "\n${YELLOW}=== Standard Login-Informationen ===${NC}"
echo -e "Admin / admin@finanzmanager.de / 123456"
echo -e "User / user@finanzmanager.de / 123456"
echo -e "Example / example@finanzmanager.de / 123456"