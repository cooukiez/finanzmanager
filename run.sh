#!/bin/bash

RUNDB=false
RUNSVELTE=false

while getopts "ds" opt; do
  case $opt in
    d)
      RUNDB=true
      ;;
		s)
			RUNSVELTE=true
			;;
    *)
      echo "invalid argument"
      exit 1
      ;;
  esac
done

if [ "$RUNDB" = true ]; then
	mongod --version
	mongod --dbpath "./db" --port 27017
fi

if [ "$RUNSVELTE" = true ]; then
	npm run dev -- --open
fi