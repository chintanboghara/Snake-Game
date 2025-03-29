output "resource_group_name" {
  value = azurerm_resource_group.main.name
}

output "virtual_network_name" {
  value = azurerm_virtual_network.main.name
}

output "subnet_id" {
  value = azurerm_subnet.internal.id
}

output "vm_ids" {
  value = azurerm_linux_virtual_machine.main[*].id
}

output "vm_names" {
  value = azurerm_linux_virtual_machine.main[*].name
}

output "vm_private_ip_addresses" {
  value = azurerm_network_interface.main[*].private_ip_address
}

output "vm_public_ip_addresses" {
  value = azurerm_public_ip.main[*].ip_address
}