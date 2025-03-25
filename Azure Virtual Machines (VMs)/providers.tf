# providers.tf
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 2.0"
    }
  }
}

provider "azurerm" {
  features {}
  # Configure these via environment variables or azure cli
  # subscription_id = "your_subscription_id"
  # tenant_id       = "your_tenant_id"
  # client_id       = "your_client_id"
  # client_secret   = "your_client_secret"
}