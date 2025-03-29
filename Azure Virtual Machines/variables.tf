variable "prefix" {
  description = "The prefix which should be used for all resources"
  type        = string
  default     = "azure-vm"
}

variable "resource_group_name" {
  description = "The name of the resource group"
  type        = string
  default     = "azure-vm-resources"
}

variable "location" {
  description = "The Azure Region in which all resources should be created"
  type        = string
  default     = "East US"
}

variable "vm_count" {
  description = "Number of VMs to create"
  type        = number
  default     = 1
}

variable "vm_size" {
  description = "The size of the VM"
  type        = string
  default     = "Standard_B2s"
}

variable "admin_username" {
  description = "Username for the VM"
  type        = string
  default     = "adminuser"
}

variable "ssh_public_key_path" {
  description = "Path to the public SSH key"
  type        = string
  default     = "~/.ssh/id_rsa.pub"
}

variable "image_publisher" {
  description = "The publisher of the VM image"
  type        = string
  default     = "Canonical"
}

variable "image_offer" {
  description = "The offer of the VM image"
  type        = string
  default     = "UbuntuServer"
}

variable "image_sku" {
  description = "The SKU of the VM image"
  type        = string
  default     = "18.04-LTS"
}

variable "image_version" {
  description = "The version of the VM image"
  type        = string
  default     = "latest"
}

variable "tags" {
  description = "Tags to apply to all resources"
  type        = map(string)
  default = {
    environment = "development"
    project     = "azure-vm-deployment"
  }
}