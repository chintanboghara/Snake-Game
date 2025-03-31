# Azure SQL Database Terraform Module

This Terraform module provisions an Azure SQL Database with associated resources.

## Architecture

This module creates:
- Azure Resource Group
- Azure SQL Server
- Azure SQL Database
- Azure SQL Firewall Rules

## Prerequisites

- [Terraform](https://www.terraform.io/downloads.html) (>= 1.0.0)
- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli) installed and authenticated
- Azure subscription

## Usage

1. Clone this repository
2. Navigate to the directory
3. Initialize Terraform:
   ```
   terraform init
   ```
4. Create a `terraform.tfvars` file with your specific values:
   ```
   resource_group_name = "my-sql-rg"
   location            = "eastus"
   sql_server_name     = "my-sql-server"
   sql_database_name   = "mydatabase"
   sql_admin_login     = "sqladmin"
   sql_admin_password  = "SecurePassword123!"
   ```
5. Review the plan:
   ```
   terraform plan
   ```
6. Apply the configuration:
   ```
   terraform apply
   ```

## Variables

See `variables.tf` for a complete list of variables and their descriptions.

## Outputs

See `outputs.tf` for a complete list of outputs and their descriptions.

## Clean Up

To destroy all resources created by Terraform:
```
terraform destroy
```