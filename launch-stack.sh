
Write-Host "Budowanie i uruchamianie kontenerów Docker..."
docker-compose build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Błąd podczas budowania kontenerów!" -ForegroundColor Red
    exit $LASTEXITCODE
}

docker-compose up -d
if ($LASTEXITCODE -ne 0) {
    Write-Host "Błąd podczas uruchamiania kontenerów!" -ForegroundColor Red
    exit $LASTEXITCODE
}

# Przejście do katalogu front-stops i uruchomienie build + preview
Write-Host "Przejście do katalogu front-stops i budowanie..."
Set-Location front-stops
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Błąd podczas budowania front-stops!" -ForegroundColor Red
    exit $LASTEXITCODE
}

npm run preview
if ($LASTEXITCODE -ne 0) {
    Write-Host "Błąd podczas uruchamiania preview dla front-stops!" -ForegroundColor Red
    exit $LASTEXITCODE
}

# Przejście do katalogu front-users i uruchomienie dev
Write-Host "Przejście do katalogu front-users i uruchamianie dev..."
Set-Location ../front-users
npm run dev
if ($LASTEXITCODE -ne 0) {
    Write-Host "Błąd podczas uruchamiania dev dla front-users!" -ForegroundColor Red
    exit $LASTEXITCODE
}
