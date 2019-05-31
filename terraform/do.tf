variable "do_token" {}

# Configure the DigitalOcean Provider
provider "digitalocean" {
  token = "${var.do_token}"
}


# Create a web server
resource "digitalocean_droplet" "web" {
  name = "weather-api"
  image  = "ubuntu-18-04-x64"
  region = "fra1"
  size = "s-1vcpu-1gb"
}

resource "digitalocean_project" "weather-project" {
  name        = "weather-wps"
  description = "Project for the weather"
  purpose     = "Class project / Educational purposes"
  environment = "Staging"
  resources   = ["${digitalocean_droplet.web.urn}"]
}