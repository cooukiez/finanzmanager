#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== FinanzManager Setup Script ===${NC}"
echo -e "Setting up your financial management application..."

# Check if sqlite3 is installed
if ! command -v sqlite3 &> /dev/null; then
    echo -e "${RED}sqlite3 command not found. Please install SQLite3 first.${NC}"
    echo -e "On Ubuntu/Debian: sudo apt-get install sqlite3"
    echo -e "On macOS with Homebrew: brew install sqlite3"
    echo -e "On Windows: Download from https://www.sqlite.org/download.html"
    exit 1
fi

# Create a directory for the database if it doesn't exist
mkdir -p prisma/databases

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
  echo -e "${YELLOW}Creating .env file...${NC}"
  echo 'DATABASE_URL="file:./databases/dev.db"' > .env
  echo -e "${GREEN}Created .env file with SQLite database configuration.${NC}"
else
  echo -e "${GREEN}.env file already exists. Skipping creation.${NC}"
fi

# Directly create SQLite database
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

# Install dependencies
echo -e "${YELLOW}Installing dependencies...${NC}"
npm install
if [ $? -eq 0 ]; then
  echo -e "${GREEN}Dependencies installed successfully.${NC}"
else
  echo -e "${RED}Error installing dependencies. Please check your npm configuration.${NC}"
  exit 1
fi

# Generate Prisma client
echo -e "${YELLOW}Generating Prisma client...${NC}"
npx prisma generate
if [ $? -eq 0 ]; then
  echo -e "${GREEN}Prisma client generated successfully.${NC}"
else
  echo -e "${RED}Error generating Prisma client.${NC}"
  exit 1
fi

# Apply migrations
echo -e "${YELLOW}Applying database migrations...${NC}"
npx prisma migrate deploy
if [ $? -eq 0 ]; then
  echo -e "${GREEN}Migrations applied successfully.${NC}"
else
  echo -e "${RED}Error applying migrations.${NC}"
  exit 1
fi

# Seed the database
echo -e "${YELLOW}Seeding the database with initial data...${NC}"
npx prisma db seed
if [ $? -eq 0 ]; then
  echo -e "${GREEN}Database seeded successfully.${NC}"
else
  echo -e "${YELLOW}Warning: Seeding may have failed or already been applied.${NC}"
fi

# Verify database setup with basic query
echo -e "${YELLOW}Verifying database setup...${NC}"
USERS_COUNT=$(sqlite3 "$DB_PATH" "SELECT COUNT(*) FROM User;")
if [ $? -eq 0 ]; then
  echo -e "${GREEN}Database verification successful. Found $USERS_COUNT users in the database.${NC}"
else
  echo -e "${RED}Database verification failed. Check your database setup.${NC}"
fi

# Setup complete
echo -e "${YELLOW}=== Setup Complete ===${NC}"
echo -e "${GREEN}Your FinanzManager application is ready to run!${NC}"
echo -e "Start the development server with: ${YELLOW}npm run dev${NC}"
echo -e "Or use: ${YELLOW}npm run dev:open${NC} to automatically open in your browser"
echo -e "Access Prisma Studio with: ${YELLOW}npm run prisma:studio${NC} to manage your database"
echo -e "Direct SQLite access: ${YELLOW}sqlite3 $DB_PATH${NC}"

# Default login information
echo -e "\n${YELLOW}=== Default Login Information ===${NC}"
echo -e "Admin: admin@finanzmanager.de / 123456"
echo -e "User: user@finanzmanager.de / 123456"
echo -e "Example: example@finanzmanager.de / 123456"

# Database backup instructions
echo -e "\n${YELLOW}=== Database Management Tips ===${NC}"
echo -e "To backup your database: ${YELLOW}sqlite3 $DB_PATH .dump > backup.sql${NC}"
echo -e "To restore from backup: ${YELLOW}sqlite3 $DB_PATH < backup.sql${NC}"
echo -e "To reset database: ${YELLOW}npm run prisma:reset${NC}"