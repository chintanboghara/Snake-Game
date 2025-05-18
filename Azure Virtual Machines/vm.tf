# Resource Group
resource "azurerm_resource_group" "main" {
  name     = "${local.project}-${local.environment}-rg"
  location = local.location

  tags = {
    Environment = local.environment
    Project     = local.project
    ManagedBy   = "Terraform"
  }
}

# Virtual Network
resource "azurerm_virtual_network" "main" {
  name                = "${local.project}-${local.environment}-vnet"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name

  tags = {
    Environment = local.environment
    Project     = local.project
    ManagedBy   = "Terraform"
  }
}

# Subnet
resource "azurerm_subnet" "main" {
  name                 = "${local.project}-${local.environment}-subnet"
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes     = ["10.0.1.0/24"]
}

# Network Security Group
resource "azurerm_network_security_group" "main" {
  name                = "${local.project}-${local.environment}-nsg"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name

  security_rule {
    name                       = "SSH"
    priority                   = 1001
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "22"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }

  tags = {
    Environment = local.environment
    Project     = local.project
    ManagedBy   = "Terraform"
  }
}

# Associate subnet with NSG
resource "azurerm_subnet_network_security_group_association" "main" {
  subnet_id                 = azurerm_subnet.main.id
  network_security_group_id = azurerm_network_security_group.main.id
}

# Public IPs
resource "azurerm_public_ip" "main" {
  count               = var.vm_count
  name                = "${local.project}-${local.environment}-pip-${count.index}"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  allocation_method   = "Dynamic"
  domain_name_label   = "${local.project}-${local.environment}-vm-${count.index}"

  tags = {
    Environment = local.environment
    Project     = local.project
    ManagedBy   = "Terraform"
  }
}

# Network Interfaces
resource "azurerm_network_interface" "main" {
  count               = var.vm_count
  name                = "${local.project}-${local.environment}-nic-${count.index}"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.main.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.main[count.index].id
  }

  tags = {
    Environment = local.environment
    Project     = local.project
    ManagedBy   = "Terraform"
  }
}

# Associate NICs with NSG
resource "azurerm_network_interface_security_group_association" "main" {
  count                     = var.vm_count
  network_interface_id      = azurerm_network_interface.main[count.index].id
  network_security_group_id = azurerm_network_security_group.main.id
}

# Virtual Machines
resource "azurerm_linux_virtual_machine" "main" {
  count                           = var.vm_count
  name                            = "${local.project}-${local.environment}-vm-${count.index}"
  location                        = azurerm_resource_group.main.location
  resource_group_name             = azurerm_resource_group.main.name
  size                            = var.vm_size
  admin_username                  = var.admin_username
  network_interface_ids           = [azurerm_network_interface.main[count.index].id]
  disable_password_authentication = true

  admin_ssh_key {
    username   = var.admin_username
    public_key = file("~/.ssh/id_rsa.pub")  # Make sure to generate this key pair locally
  }

  os_disk {
    name                 = "${local.project}-${local.environment}-osdisk-${count.index}"
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
    disk_size_gb         = 30
  }

  source_image_reference {
    publisher = var.vm_image.publisher
    offer     = var.vm_image.offer
    sku       = var.vm_image.sku
    version   = var.vm_image.version
  }

  boot_diagnostics {
    storage_account_uri = null  # Uses managed storage account
  }

  tags = {
    Environment = local.environment
    Project     = local.project
    ManagedBy   = "Terraform"
    Name        = "${local.project}-${local.environment}-vm-${count.index}"
  }
}

# Optional: Availability Set for VM HA
resource "azurerm_availability_set" "main" {
  name                         = "${local.project}-${local.environment}-avset"
  location                     = azurerm_resource_group.main.location
  resource_group_name          = azurerm_resource_group.main.name
  platform_fault_domain_count  = 2
  platform_update_domain_count = 5
  managed                      = true

  tags = {
    Environment = local.environment
    Project     = local.project
    ManagedBy   = "Terraform"
  }
}