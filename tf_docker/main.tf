provider "docker" {}

resource "docker_image" "nginx" {
  name         = "nginx:latest"
  keep_locally = false
}

resource "docker_container" "nginx" {
  image = docker_image.nginx.image_id
  name  = "tutorial"
  ports {
    internal = 80
    external = 8000
  }
}

resource "docker_image" "postgres" {
  name         = "postgres:17-alpine"
  keep_locally = true
}

resource "docker_volume" "postgres_data" {
  name = "itube-postgres-data"
}

resource "docker_network" "database" {
  name = "itube-database"
}

resource "docker_container" "postgres" {
  image = docker_image.postgres.image_id
  name  = "itube-postgres"

  env = [
    "POSTGRES_DB=itube",
    "POSTGRES_USER=itube",
    "POSTGRES_PASSWORD=itube-dev-password",
  ]

  ports {
    internal = 5432
    external = 5434
  }

  volumes {
    volume_name    = docker_volume.postgres_data.name
    container_path = "/var/lib/postgresql/data"
  }

  networks_advanced {
    name = docker_network.database.name
  }
}

resource "docker_image" "pgadmin" {
  name         = "dpage/pgadmin4:latest"
  keep_locally = true
}

resource "docker_container" "pgadmin" {
  image = docker_image.pgadmin.image_id
  name  = "itube-pgadmin"

  env = [
    "PGADMIN_DEFAULT_EMAIL=admin@example.com",
    "PGADMIN_DEFAULT_PASSWORD=itube-admin-password",
  ]

  ports {
    internal = 80
    external = 5050
  }

  networks_advanced {
    name = docker_network.database.name
  }
}

output "postgres_connection" {
  value     = "postgresql://itube:itube-dev-password@localhost:5432/itube"
  sensitive = true
}
