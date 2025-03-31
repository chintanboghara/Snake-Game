output "resource_group_name" {
  description = "The name of the resource group"
  value       = azurerm_resource_group.function_app.name
}

output "storage_account_name" {
  description = "The name of the storage account"
  value       = azurerm_storage_account.function_app.name
}

output "function_app_name" {
  description = "The name of the function app"
  value       = azurerm_windows_function_app.function_app.name
}

output "function_app_default_hostname" {
  description = "The default hostname of the function app"
  value       = azurerm_windows_function_app.function_app.default_hostname
}

output "function_app_id" {
  description = "The ID of the function app"
  value       = azurerm_windows_function_app.function_app.id
}

output "function_app_principal_id" {
  description = "The Principal ID of the function app's managed identity"
  value       = azurerm_windows_function_app.function_app.identity.0.principal_id
  sensitive   = true
}

output "function_app_outbound_ip_addresses" {
  description = "Outbound IP addresses of the function app"
  value       = azurerm_windows_function_app.function_app.outbound_ip_addresses
}