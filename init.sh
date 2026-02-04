#!/bin/bash

# Colores para la terminal
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "--- Comprobando motor de contenedores ---"

# Función para ejecutar el compose según el motor encontrado
run_compose() {
    local motor=$1  # Puede ser "podman" o "docker"
    echo -e "${GREEN}[OK]${NC} Usando $motor para levantar los servicios..."

    if [[ -f "docker-compose.yml" || -f "docker-compose.yaml" ]]; then
        $motor compose up -d

        # Si falla '$motor compose', intentamos con el ejecutable antiguo en caso de ser podman
        if [ $? -ne 0 ] && [ "$motor" == "podman" ]; then
            echo -e "${YELLOW}Intentando con podman-compose (clásico)...${NC}"
            podman-compose up -d
        fi
    else
        echo -e "${RED}[!]${NC} Error: No hay archivo docker-compose.yml en esta carpeta."
        exit 1
    fi
}

# Lógica de decisión
if command -v podman &> /dev/null; then
    echo -e "${GREEN}[+]${NC} Podman detectado."
    run_compose "podman"

elif command -v docker &> /dev/null; then
    echo -e "${GREEN}[+]${NC} Docker detectado (Podman no encontrado)."
    run_compose "docker"

else
    echo -e "${RED}[!] Error:${NC} No se encontró ni Podman ni Docker en el sistema."
    exit 1
fi

echo "--- Proceso finalizado ---"
