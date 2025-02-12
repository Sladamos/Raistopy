#!/bin/bash

echo "Uruchamianie kontenerów Docker..."
docker-compose up -d
if [ $? -ne 0 ]; then
    echo "Błąd podczas uruchamiania kontenerów!" >&2
    exit 1
fi

echo "Przejście do katalogu front-stops i uruchamianie..."
cd front-stops || exit 1
npm run preview &
if [ $? -ne 0 ]; then
    echo "Błąd podczas uruchamiania preview dla front-stops!" >&2
    exit 1
fi

echo "Przejście do katalogu front-users i uruchamianie dev..."
cd ../front-users || exit 1
npm run dev &
if [ $? -ne 0 ]; then
    echo "Błąd podczas uruchamiania dev dla front-users!" >&2
    exit 1
fi