#!/bin/bash

INSTALL_DEPS=false
GENERATE_PRISMA=false
RESET_PRISMA=false
MIGRATE_PRISMA=false
RUN_SVELTE=false

while getopts "igrms" opt; do
  case $opt in
    i)
      INSTALL_DEPS=true
      ;;
    g)
      GENERATE_PRISMA=true
      ;;
    r)
      RESET_PRISMA=true
      ;;
    m)
      MIGRATE_PRISMA=true
      ;;
		s)
			RUN_SVELTE=true
			;;

    *)
      echo "invalid argument"
      exit 1
      ;;
  esac
done

if [ "$INSTALL_DEPS" = true ]; then
	npm i
fi

if [ "$GENERATE_PRISMA" = true ]; then
	npx prisma generate
fi

if [ "$RESET_PRISMA" = true ]; then
  	npx prisma migrate reset
fi

if [ "$MIGRATE_PRISMA" = true ]; then
  	npx prisma migrate dev --name init
fi

if [ "$RUN_SVELTE" = true ]; then
	npm run dev -- --open
fi
