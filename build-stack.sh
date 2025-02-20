#!/bin/bash

echo "Budowanie kontenerów Docker..."
docker-compose build
if [ $? -ne 0 ]; then
    echo "Błąd podczas budowania kontenerów!" >&2
    exit 1
fi