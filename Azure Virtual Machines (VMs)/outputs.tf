# outputs.tf
output "vm_names" {
  description = "Names of the created Virtual Machines"
  value       = azurerm_virtual_machine.main[*].name
}

output "public_ip_addresses" {
  description = "Public IP addresses of the VMs"
  value       = azurerm_public_ip.main[*].ip_address
}

output "resource_group_name" {
  description = "Name of the resource group"
  value       = azurerm_resource_group.vm_rg.name
}