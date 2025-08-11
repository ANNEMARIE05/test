# ========================
# DEV
# ========================
dev-build:
	docker-compose build frontend-dev mock-api

dev-up:
	docker-compose up frontend-dev mock-api

dev-down:
	docker-compose down

# ========================
# PROD
# ========================
prod-build:
	docker-compose build frontend-prod

prod-up:
	docker-compose up -d frontend-prod

prod-down:
	docker-compose down

# ========================
# CLEAN
# ========================
clean:
	docker-compose down -v --rmi all --remove-orphans
