variable "resource_group_name" {
  description = "Name of the resource group to create"
  type        = string
}

variable "location" {
  description = "Azure region where resources will be created"
  type        = string
  default     = "eastus"
}

variable "storage_account_name" {
  description = "Name of the storage account. Must be globally unique and between 3-24 characters, lowercase letters and numbers only."
  type        = string
}

variable "storage_account_tier" {
  description = "Storage account tier (Standard or Premium)"
  type        = string
  default     = "Standard"
}

variable "storage_account_repl" {
  description = "Storage account replication type (LRS, GRS, RAGRS, ZRS)"
  type        = string
  default     = "LRS"
}

variable "storage_account_kind" {
  description = "Storage account kind (BlobStorage, BlockBlobStorage, FileStorage, Storage or StorageV2)"
  type        = string
  default     = "StorageV2"
}

variable "blob_container_name" {
  description = "Name of the blob container"
  type        = string
}

variable "container_access_type" {
  description = "Access type for the container (blob, container, or private)"
  type        = string
  default     = "private"
}

variable "min_tls_version" {
  description = "Minimum TLS version for the storage account"
  type        = string
  default     = "TLS1_2"
}

variable "soft_delete_retention" {
  description = "Number of days to retain deleted blobs (0 to disable)"
  type        = number
  default     = 7
}

variable "container_soft_delete_retention" {
  description = "Number of days to retain deleted containers (0 to disable)"
  type        = number
  default     = 7
}

variable "restrict_public_access" {
  description = "Whether to restrict public access to the storage account"
  type        = bool
  default     = false
}

variable "allowed_ip_ranges" {
  description = "List of IP ranges to allow if public access is restricted"
  type        = list(string)
  default     = []
}

variable "tags" {
  description = "Tags to apply to all resources"
  type        = map(string)
  default = {
    environment = "dev"
    managed_by  = "terraform"
  }
}