resource "azurerm_resource_group" "sql_rg" {
  name     = var.resource_group_name
  location = var.location

  tags = var.tags
}

resource "azurerm_mssql_server" "sql_server" {
  name                         = var.sql_server_name
  resource_group_name          = azurerm_resource_group.sql_rg.name
  location                     = azurerm_resource_group.sql_rg.location
  version                      = var.sql_server_version
  administrator_login          = var.sql_admin_login
  administrator_login_password = var.sql_admin_password
  minimum_tls_version          = "1.2"

  azuread_administrator {
    login_username = var.azuread_admin_login_username
    object_id      = var.azuread_admin_object_id
  }

  tags = var.tags
}

resource "azurerm_mssql_database" "sql_db" {
  name                = var.sql_database_name
  server_id           = azurerm_mssql_server.sql_server.id
  collation           = var.sql_database_collation
  license_type        = var.sql_database_license_type
  max_size_gb         = var.sql_database_max_size_gb
  read_scale          = var.sql_database_read_scale_enabled
  sku_name            = var.sql_database_sku_name
  zone_redundant      = var.sql_database_zone_redundant

  tags = var.tags

  short_term_retention_policy {
    retention_days = var.backup_retention_days
  }

  dynamic "long_term_retention_policy" {
    for_each = var.enable_long_term_retention ? [1] : []
    content {
      weekly_retention  = var.long_term_retention_weekly
      monthly_retention = var.long_term_retention_monthly
      yearly_retention  = var.long_term_retention_yearly
      week_of_year      = var.long_term_retention_week_of_year
    }
  }
}

# Azure SQL Firewall Rule to allow Azure services
resource "azurerm_mssql_firewall_rule" "allow_azure_services" {
  name             = "AllowAzureServices"
  server_id        = azurerm_mssql_server.sql_server.id
  start_ip_address = "0.0.0.0"
  end_ip_address   = "0.0.0.0"
}

# Azure SQL Firewall Rule for client IP ranges
resource "azurerm_mssql_firewall_rule" "client_ip_rules" {
  for_each = var.allowed_ip_ranges

  name             = "AllowIP-${each.key}"
  server_id        = azurerm_mssql_server.sql_server.id
  start_ip_address = each.value.start_ip
  end_ip_address   = each.value.end_ip
}

# Private endpoint configuration (if enabled)
resource "azurerm_subnet" "private_endpoint_subnet" {
  count                = var.enable_private_endpoint ? 1 : 0
  name                 = var.private_endpoint_subnet_name
  resource_group_name  = var.vnet_resource_group_name != "" ? var.vnet_resource_group_name : azurerm_resource_group.sql_rg.name
  virtual_network_name = var.vnet_name
  address_prefixes     = [var.private_endpoint_subnet_address_prefix]

  enforce_private_link_endpoint_network_policies = true
}

resource "azurerm_private_endpoint" "sql_private_endpoint" {
  count               = var.enable_private_endpoint ? 1 : 0
  name                = "${var.sql_server_name}-private-endpoint"
  location            = azurerm_resource_group.sql_rg.location
  resource_group_name = azurerm_resource_group.sql_rg.name
  subnet_id           = var.private_endpoint_subnet_id != "" ? var.private_endpoint_subnet_id : azurerm_subnet.private_endpoint_subnet[0].id

  private_service_connection {
    name                           = "${var.sql_server_name}-private-connection"
    private_connection_resource_id = azurerm_mssql_server.sql_server.id
    subresource_names              = ["sqlServer"]
    is_manual_connection           = false
  }

  tags = var.tags
}