# Network Security Groups
resource "azurerm_network_security_group" "subnet_nsgs" {
  for_each = var.subnets

  name                = "${each.key}-nsg"
  location            = azurerm_resource_group.network_rg.location
  resource_group_name = azurerm_resource_group.network_rg.name
}

# NSG-Subnet Association
resource "azurerm_subnet_network_security_group_association" "nsg_subnet_assoc" {
  for_each = var.subnets

  subnet_id                 = azurerm_subnet.subnets[each.key].id
  network_security_group_id = azurerm_network_security_group.subnet_nsgs[each.key].id
}