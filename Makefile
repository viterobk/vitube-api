getdbip: ## gets the ip address of the vitube-api-db-1 container
	docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' vitube-api-db-1

getdbreadip: ## gets the ip address of the vitube-api-db-1 container
	docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' vitube-api-db-read-1

cleandocker: ## Removes docker images and volumes
	docker kill $$(docker ps -q)
	docker system prune -a -f
	docker volume rm $$(docker volume ls -q)