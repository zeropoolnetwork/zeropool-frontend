terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0.1"
    }
  }
}

provider "docker" {
  host = "ssh://zp.dev"
}

locals {
  // List of environments and related IP's
  envs = {
    dev = "45.131.67.82"
    test = "45.131.67.83"
    prod = "45.131.67.84"
  }
  compose = base64encode(templatefile("${path.module}/_compose.yml.tmpl", {
    // Take value from environment variable VIRTUAL_HOST and change it's 'ENV' part to value from environment variable ENV
    VIRTUAL_HOST = replace(var.VIRTUAL_HOST, "ENV", var.ENV),
    VIRTUAL_HOST = var.VIRTUAL_HOST,
    NETWORK_NAME = var.NETWORK_NAME,
    TRANSACTION = var.TRANSACTION,
    TOKEN_NAME = var.TOKEN_NAME,
    CONTRACT = var.CONTRACT,
    RPC_HOST = var.RPC_HOST,
    NETWORK = var.NETWORK,
    RELAYER = var.RELAYER,
    FAUCET = var.FAUCET,
    TOKEN = var.TOKEN,
  }))
}

resource "null_resource" "this" {
  provisioner "remote-exec" {
    inline = [
      "set -e",
      "mkdir -p ~/wallet",
      "docker compose -f ~/wallet/docker-compose-${var.NETWORK}.yml down || true",
      "rm -f ~/wallet/docker-compose-${var.NETWORK}.yml",
      "sudo bash -c 'echo ${local.compose} | base64 --decode > ~/wallet/docker-compose-${var.NETWORK}.yml'",
      "docker network create zeropool-testnet || true",
      "docker compose -f ~/wallet/docker-compose-${var.NETWORK}.yml pull",
      "docker compose -f ~/wallet/docker-compose-${var.NETWORK}.yml up -d",
    ]

    connection {
      type        = "ssh"
      user        = "root"                  # Replace with your SSH username
      private_key = file("~/.ssh/zeropool") # Specify your private key path
      host        = envs[var.ENV]           # Replace with your instance's IP or DNS
      timeout     = "2m"                    # Set a timeout to wait for the SSH connection
    }
  }
}

output "compose" {
  description = "Content of the file"
  value = local.compose
}