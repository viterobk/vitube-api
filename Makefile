getdbip: ## gets the ip address of the vitube-api-db-1 container
	docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' vitube-api-db-1

getdbreadip: ## gets the ip address of the vitube-api-db-1 container
	docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' vitube-api-db-read-1