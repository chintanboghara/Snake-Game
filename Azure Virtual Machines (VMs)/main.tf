# main.tf
resource "azurerm_resource_group" "vm_rg" {
  name     = var.resource_group_name
  location = var.location
}

resource "azurerm_virtual_machine" "main" {
  count                 = var.vm_count
  name                  = "${var.vm_name_prefix}-${count.index + 1}"
  location              = azurerm_resource_group.vm_rg.location
  resource_group_name   = azurerm_resource_group.vm_rg.name
  network_interface_ids = [azurerm_network_interface.main[count.index].id]
  vm_size               = var.vm_size

  storage_image_reference {
    publisher = var.image_publisher
    offer     = var.image_offer
    sku       = var.image_sku
    version   = var.image_version
  }

  storage_os_disk {
    name              = "${var.vm_name_prefix}-osdisk-${count.index + 1}"
    caching           = "ReadWrite"
    create_option     = "FromImage"
    managed_disk_type = var.disk_type
  }

  os_profile {
    computer_name  = "${var.vm_name_prefix}-${count.index + 1}"
    admin_username = var.admin_username
    admin_password = var.admin_password
  }

  os_profile_linux_config {
    disable_password_authentication = false
  }
}