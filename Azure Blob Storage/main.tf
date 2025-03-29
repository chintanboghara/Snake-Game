# Create a resource group if one doesn't exist
resource "azurerm_resource_group" "storage_rg" {
  name     = var.resource_group_name
  location = var.location

  tags = var.tags
}

# Create a storage account
resource "azurerm_storage_account" "storage" {
  name                     = var.storage_account_name
  resource_group_name      = azurerm_resource_group.storage_rg.name
  location                 = azurerm_resource_group.storage_rg.location
  account_tier             = var.storage_account_tier
  account_replication_type = var.storage_account_repl
  account_kind             = var.storage_account_kind
  min_tls_version          = var.min_tls_version
  
  # Enable blob encryption
  blob_properties {
    dynamic "delete_retention_policy" {
      for_each = var.soft_delete_retention > 0 ? [1] : []
      content {
        days = var.soft_delete_retention
      }
    }
    
    dynamic "container_delete_retention_policy" {
      for_each = var.container_soft_delete_retention > 0 ? [1] : []
      content {
        days = var.container_soft_delete_retention
      }
    }
  }

  # Configure network rules if needed
  dynamic "network_rules" {
    for_each = var.restrict_public_access ? [1] : []
    content {
      default_action = "Deny"
      bypass         = ["Metrics", "AzureServices"]
      ip_rules       = var.allowed_ip_ranges
    }
  }

  tags = var.tags
}

# Create blob container
resource "azurerm_storage_container" "container" {
  name                  = var.blob_container_name
  storage_account_name  = azurerm_storage_account.storage.name
  container_access_type = var.container_access_type
}