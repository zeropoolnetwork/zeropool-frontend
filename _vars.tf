
variable "RPC_HOST" {
  type    = string
  default = "sepolia.rpc.zeropool.network"
}

variable "VIRTUAL_HOST" {
  type    = string
  default = "sepolia.testnet.frontend.ENV.v2.zeropool.network"
}

variable "NETWORK_NAME" {
  type    = string
  default = "sepolia"
}

variable "TOKEN_NAME" {
  type    = string
  default = "eth"
}

variable "NETWORK" {
  type    = string
  default = "ethereum"
}

variable "TOKEN" {
  type    = string
  default = "0x25004028Dd2743FF487454eAB2216d3495667189"
}

variable "FAUCET" {
  type    = string
  default = "https://sepoliafaucet.com"
}

variable "RELAYER" {
  type    = string
  default = "https://sepolia.testnet.relayer.v2.zeropool.network"
}

variable "CONTRACT" {
  type    = string
  default = "0xEcbD5fabA99139B2cA25f19B568fF74991a01eD3"
}

variable "TRANSACTION" {
  type    = string
  default = "https://sepolia.etherscan.io/tx/{{hash}}"
}

variable "ENV" {
  type    = string
  default = "dev"
}

variable "VERSION" {
  type    = string
  default = "antonpegov/zeropool-frontend:latest"
}
