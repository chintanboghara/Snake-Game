variable "resource_group_name" {
  description = "The name of the resource group"
  type        = string
}

variable "location" {
  description = "The Azure region where resources will be created"
  type        = string
  default     = "eastus"
}

variable "tags" {
  description = "Tags to apply to all resources"
  type        = map(string)
  default     = {}
}

# SQL Server variables
variable "sql_server_name" {
  description = "The name of the SQL Server"
  type        = string
}

variable "sql_server_version" {
  description = "The version of the SQL Server"
  type        = string
  default     = "12.0"
}

variable "sql_admin_login" {
  description = "The administrator login for the SQL Server"
  type        = string
}

variable "sql_admin_password" {
  description = "The administrator password for the SQL Server"
  type        = string
  sensitive   = true
}

variable "azuread_admin_login_username" {
  description = "The login username of the Azure AD administrator"
  type        = string
  default     = ""
}

variable "azuread_admin_object_id" {
  description = "The object ID of the Azure AD administrator"
  type        = string
  default     = ""
}

# SQL Database variables
variable "sql_database_name" {
  description = "The name of the SQL Database"
  type        = string
}

variable "sql_database_collation" {
  description = "The collation for the SQL Database"
  type        = string
  default     = "SQL_Latin1_General_CP1_CI_AS"
}

variable "sql_database_license_type" {
  description = "The license type for the SQL Database"
  type        = string
  default     = "LicenseIncluded"
}

variable "sql_database_max_size_gb" {
  description = "The maximum size of the SQL Database in GB"
  type        = number
  default     = 2
}

variable "sql_database_read_scale_enabled" {
  description = "Whether read scale is enabled for the SQL Database"
  type        = bool
  default     = false
}

variable "sql_database_sku_name" {
  description = "The SKU name for the SQL Database"
  type        = string
  default     = "Basic"
}

variable "sql_database_zone_redundant" {
  description = "Whether the SQL Database is zone redundant"
  type        = bool
  default     = false
}

# Backup configuration
variable "backup_retention_days" {
  description = "The number of days to retain backups"
  type        = number
  default     = 7
}

variable "enable_long_term_retention" {
  description = "Whether to enable long-term retention for the SQL Database"
  type        = bool
  default     = false
}

variable "long_term_retention_weekly" {
  description = "The weekly retention for long-term retention"
  type        = string
  default     = "P1W"
}

variable "long_term_retention_monthly" {
  description = "The monthly retention for long-term retention"
  type        = string
  default     = "P1M"
}

variable "long_term_retention_yearly" {
  description = "The yearly retention for long-term retention"
  type        = string
  default     = "P1Y"
}

variable "long_term_retention_week_of_year" {
  description = "The week of the year for long-term retention"
  type        = number
  default     = 1
}

# Firewall configuration
variable "allowed_ip_ranges" {
  description = "Map of allowed IP ranges with start and end IPs"
  type = map(object({
    start_ip = string
    end_ip   = string
  }))
  default = {}
}

# Private endpoint configuration
variable "enable_private_endpoint" {
  description = "Whether to enable private endpoint for the SQL Server"
  type        = bool
  default     = false
}

variable "vnet_resource_group_name" {
  description = "The name of the resource group for the virtual network (if different from the SQL resource group)"
  type        = string
  default     = ""
}

variable "vnet_name" {
  description = "The name of the virtual network for the private endpoint"
  type        = string
  default     = ""
}

variable "private_endpoint_subnet_name" {
  description = "The name of the subnet for the private endpoint"
  type        = string
  default     = "private-endpoints-subnet"
}

variable "private_endpoint_subnet_address_prefix" {
  description = "The address prefix for the private endpoint subnet"
  type        = string
  default     = "10.0.1.0/24"
}

variable "private_endpoint_subnet_id" {
  description = "The ID of an existing subnet for the private endpoint"
  type        = string
  default     = ""
}