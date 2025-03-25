# Configure the Azure provider
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.85.0"
    }
  }
}

provider "azurerm" {
  features {}
}

# Resource group for networking resources
resource "azurerm_resource_group" "network_rg" {
  name     = var.resource_group_name
  location = var.location
}