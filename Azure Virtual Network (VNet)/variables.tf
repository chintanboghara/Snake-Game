variable "resource_group_name" {
  description = "Name of the resource group"
  type        = string
  default     = "network-infrastructure-rg"
}

variable "location" {
  description = "Azure region for resources"
  type        = string
  default     = "eastus"
}

variable "vnet_name" {
  description = "Name of the Virtual Network"
  type        = string
  default     = "main-vnet"
}

variable "vnet_address_space" {
  description = "Address space for the Virtual Network"
  type        = list(string)
  default     = ["10.0.0.0/16"]
}

variable "subnets" {
  description = "Subnets to create in the VNet"
  type        = map(string)
  default = {
    "frontend-subnet" = "10.0.1.0/24"
    "backend-subnet"  = "10.0.2.0/24"
    "data-subnet"     = "10.0.3.0/24"
  }
}