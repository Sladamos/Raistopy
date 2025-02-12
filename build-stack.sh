#!/bin/bash

echo "Budowanie kontenerów Docker..."
docker-compose build
if [ $? -ne 0 ]; then
    echo "Błąd podczas budowania kontenerów!" >&2
    exit 1
fi

echo "Przejście do katalogu front-stops i budowanie..."
cd front-stops || exit 1
npm run build
if [ $? -ne 0 ]; then
    echo "Błąd podczas budowania front-stops!" >&2
    exit 1
fi