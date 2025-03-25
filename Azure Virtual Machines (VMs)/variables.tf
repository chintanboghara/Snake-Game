# variables.tf
variable "resource_group_name" {
  description = "Name of the resource group"
  type        = string
  default     = "azure-vm-rg"
}

variable "location" {
  description = "Azure region for resources"
  type        = string
  default     = "East US"
}

variable "vm_name_prefix" {
  description = "Prefix for VM names"
  type        = string
  default     = "azurevm"
}

variable "vm_count" {
  description = "Number of VMs to create"
  type        = number
  default     = 2
}

variable "vm_size" {
  description = "Size of the Virtual Machine"
  type        = string
  default     = "Standard_B1s"
}

variable "admin_username" {
  description = "Administrator username"
  type        = string
  default     = "azureuser"
}

variable "admin_password" {
  description = "Administrator password"
  type        = string
  sensitive   = true
}

variable "image_publisher" {
  description = "Publisher of the VM image"
  type        = string
  default     = "Canonical"
}

variable "image_offer" {
  description = "Offer of the VM image"
  type        = string
  default     = "UbuntuServer"
}

variable "image_sku" {
  description = "SKU of the VM image"
  type        = string
  default     = "18.04-LTS"
}

variable "image_version" {
  description = "Version of the VM image"
  type        = string
  default     = "latest"
}

variable "disk_type" {
  description = "Type of managed disk"
  type        = string
  default     = "Standard_LRS"
}