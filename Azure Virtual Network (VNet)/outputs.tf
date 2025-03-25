output "vnet_id" {
  description = "ID of the created Virtual Network"
  value       = azurerm_virtual_network.main_vnet.id
}

output "subnet_ids" {
  description = "Map of subnet names to their IDs"
  value = {
    for name, subnet in azurerm_subnet.subnets : 
    name => subnet.id
  }
}

output "nsg_ids" {
  description = "Map of subnet names to their NSG IDs"
  value = {
    for name, nsg in azurerm_network_security_group.subnet_nsgs : 
    name => nsg.id
  }
}