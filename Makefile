COMPOSE_CMD = podman compose
.PHONY: up down restart logs build ps
# Levanta los contenedores en segundo plano
up:
	$(COMPOSE_CMD) up -d

# Detiene y elimina los contenedores
down:
	$(COMPOSE_CMD) down

# Reinicia los servicios
restart:
	$(COMPOSE_CMD) restart

# Muestra los logs en tiempo real
logs:
	$(COMPOSE_CMD) logs -f

# Fuerza la reconstrucción de las imágenes
build:
	$(COMPOSE_CMD) up -d --build

# Muestra el estado de los contenedores
ps:
	$(COMPOSE_CMD) ps
