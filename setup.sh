#!/bin/bash

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${YELLOW}=== FinanzManager Setup Script ===${NC}"
echo -e "Setting up your financial management application..."

if ! command -v sqlite3 &> /dev/null; then
    echo -e "${RED}sqlite3 command not found. Please install SQLite3 first.${NC}"
    echo -e "On Ubuntu/Debian: sudo apt-get install sqlite3"
    echo -e "On macOS with Homebrew: brew install sqlite3"
    echo -e "On Windows: Download from https://www.sqlite.org/download.html"
    exit 1
fi

mkdir -p prisma/databases

if [ ! -f .env ]; then
  echo -e "${YELLOW}Creating .env file...${NC}"
  echo 'DATABASE_URL="file:./databases/dev.db"' > .env
  echo -e "${GREEN}Created .env file with SQLite database configuration.${NC}"
else
  echo -e "${GREEN}.env file already exists. Skipping creation.${NC}"
fi

DB_PATH="prisma/databases/dev.db"
if [ ! -f "$DB_PATH" ]; then
  echo -e "${YELLOW}Creating SQLite database directly using sqlite3...${NC}"
  sqlite3 "$DB_PATH" "PRAGMA foreign_keys = ON;" ".databases" ".quit"
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}SQLite database created successfully at $DB_PATH${NC}"
  else
    echo -e "${RED}Error creating SQLite database.${NC}"
    exit 1
  fi
else
  echo -e "${GREEN}SQLite database already exists at $DB_PATH${NC}"
fi

echo -e "${YELLOW}Installing dependencies...${NC}"
npm install
if [ $? -eq 0 ]; then
  echo -e "${GREEN}Dependencies installed successfully.${NC}"
else
  echo -e "${RED}Error installing dependencies. Please check your npm configuration.${NC}"
  exit 1
fi

echo -e "${YELLOW}Generating Prisma client...${NC}"
npx prisma generate
if [ $? -eq 0 ]; then
  echo -e "${GREEN}Prisma client generated successfully.${NC}"
else
  echo -e "${RED}Error generating Prisma client.${NC}"
  exit 1
fi

echo -e "${YELLOW}=== Setup Complete ===${NC}"
echo -e "${GREEN}Your FinanzManager application is ready to run!${NC}"
echo -e "Start the Webserver with: ${YELLOW}npm run rsop${NC}"
echo -e "Access Prisma Studio with: ${YELLOW}npm run prisma:studio${NC} to visualize the Database"

echo -e "\n${YELLOW}=== Default Login Information ===${NC}"
echo -e "Admin: admin@finanzmanager.de / 123456"
echo -e "User: user@finanzmanager.de / 123456"
echo -e "Example: example@finanzmanager.de / 123456"
