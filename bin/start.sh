#!/usr/bin/env bash
set -e

RED='\033[1;31m'
GREEN='\033[1;32m'
WHITE='\033[1;37m'
CYAN='\033[1;36m'
NC='\033[0m'

INFO="${CYAN}[info]${NC}"

echo '=================================================='
echo -e "${INFO} staring developmental server..."

if [[ $NODE_ENV == '' ]]; then
  echo -e "${INFO} ${RED}NODE_ENV${NC}=${WHITE}development${NC} ${GREEN}[default]${NC}"
  NODE_ENV=development
else
  echo -e "${INFO} ${RED}NODE_ENV${NC}=${WHITE}${NODE_ENV}${NC}"
fi

if [[ $DEBUG == '' ]]; then
  if [[ $NODE_ENV == production ]]; then
    DEBUG=false
  else
    DEBUG=true
  fi
  echo -e "${INFO} ${RED}DEBUG${NC}=${WHITE}${DEBUG}${NC} ${GREEN}[default]${NC}"
else
  echo -e "${INFO} ${RED}DEBUG${NC}=${WHITE}${DEBUG}${NC}"
fi
echo '=================================================='

NODE_ENV=$NODE_ENV \
DEBUG=$DEBUG \
  webpack-dev-server --progress --colors --inline --watch
