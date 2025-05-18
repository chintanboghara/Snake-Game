output "resource_group_name" {
  description = "Name of the resource group"
  value       = azurerm_resource_group.main.name
}

output "virtual_machine_ids" {
  description = "IDs of the created VMs"
  value       = [for vm in azurerm_linux_virtual_machine.main : vm.id]
}

output "virtual_machine_public_ips" {
  description = "Public IP addresses of the VMs"
  value       = [for pip in azurerm_public_ip.main : pip.ip_address]
}

output "virtual_machine_fqdns" {
  description = "FQDNs of the VMs"
  value       = [for pip in azurerm_public_ip.main : pip.fqdn]
}

output "network_security_group_id" {
  description = "ID of the network security group"
  value       = azurerm_network_security_group.main.id
}

output "virtual_network_id" {
  description = "ID of the virtual network"
  value       = azurerm_virtual_network.main.id
}