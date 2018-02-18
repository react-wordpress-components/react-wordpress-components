#!/bin/bash
set -e

RED='\033[1;31m'
GREEN='\033[1;32m'
WHITE='\033[1;37m'
CYAN='\033[1;36m'
NC='\033[0m'

INFO="${CYAN}[info]${NC}"
FATAL="${RED}[fatal]${NC}"

SPLIT='=================================================='

echo ${SPLIT}
echo -e "${INFO} building projects"

if [[ $NODE_ENV == '' ]]; then
  echo -e "${INFO} ${RED}NODE_ENV${NC}=${WHITE}production${NC} ${GREEN}[default]${NC}"
  NODE_ENV=production
else
  echo -e "${INFO} ${RED}NODE_ENV${NC}=${WHITE}${NODE_ENV}${NC}"
fi

echo -e "${INFO} ${RED}DEBUG${NC}=${WHITE}false${NC} ${GREEN}[default]${NC}"

echo -e "${INFO} removing old build files..."
./node_modules/.bin/rimraf dist
echo -e "${INFO} now building.."

# sample website building
NODE_ENV=$NODE_ENV \
DEBUG=false \
  ./node_modules/.bin/webpack -p || (
    echo -e "${FATAL} faild to build project" &&
    echo ${SPLIT} &&
    exit 2
  )

node_modules/.bin/babel ./src/components  --out-dir ./dist

echo -e "${INFO} success to build project"
