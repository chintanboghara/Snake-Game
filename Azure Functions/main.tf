# Create a resource group
resource "azurerm_resource_group" "function_app" {
  name     = var.resource_group_name
  location = var.location
  tags     = var.tags
}

# Create a storage account for the function app
resource "azurerm_storage_account" "function_app" {
  name                     = var.storage_account_name
  resource_group_name      = azurerm_resource_group.function_app.name
  location                 = azurerm_resource_group.function_app.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  tags                     = var.tags
}

# Create a service plan for the function app
resource "azurerm_service_plan" "function_app" {
  name                = var.app_service_plan_name
  resource_group_name = azurerm_resource_group.function_app.name
  location            = azurerm_resource_group.function_app.location
  os_type             = "Windows"
  sku_name            = var.app_service_plan_sku
  tags                = var.tags
}

# Create the function app
resource "azurerm_windows_function_app" "function_app" {
  name                = var.function_app_name
  resource_group_name = azurerm_resource_group.function_app.name
  location            = azurerm_resource_group.function_app.location
  
  storage_account_name       = azurerm_storage_account.function_app.name
  storage_account_access_key = azurerm_storage_account.function_app.primary_access_key
  service_plan_id            = azurerm_service_plan.function_app.id
  
  https_only                  = true
  functions_extension_version = "~4" # Uses the latest version of the Azure Functions runtime
  
  site_config {
    application_stack {
      dotnet_version = "6.0"
    }
    always_on = var.app_service_plan_sku == "Y1" ? false : true
  }
  
  app_settings = {
    WEBSITE_RUN_FROM_PACKAGE = "1"
    FUNCTIONS_WORKER_RUNTIME = "dotnet"
  }
  
  tags = var.tags
}