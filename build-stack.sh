echo "Budowanie kontenerów Docker..."
docker-compose build
if [ $? -ne 0 ]; then
    echo "Błąd podczas budowania kontenerów!" >&2
    exit 1
fi

cd ./front-users
npm install
if [ $? -ne 0 ]; then
    echo "Błąd podczas budowania front-users!" >&2
    exit 1
fi