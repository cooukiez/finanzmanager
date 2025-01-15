#!/bin/bash

RUNSVELTE=false

while getopts "ds" opt; do
  case $opt in
		s)
			RUNSVELTE=true
			;;
    *)
      echo "invalid argument"
      exit 1
      ;;
  esac
done

if [ "$RUNSVELTE" = true ]; then
	npm run dev -- --open
fi