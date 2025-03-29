# Azure Blob Storage Terraform Configuration

This Terraform configuration provisions an Azure Storage Account with a Blob Container.

## Prerequisites

- [Terraform](https://www.terraform.io/downloads.html) (v1.0.0+)
- Azure subscription
- Azure CLI installed and authenticated

## Configuration

1. Initialize the Terraform working directory:
   ```
   terraform init
   ```

2. Create a `terraform.tfvars` file to set your specific variables:
   ```
   resource_group_name     = "my-storage-rg"
   location                = "eastus"
   storage_account_name    = "mystorageaccount"
   blob_container_name     = "mycontainer"
   storage_account_tier    = "Standard"
   storage_account_repl    = "LRS"
   ```

3. Review the execution plan:
   ```
   terraform plan
   ```

4. Apply the configuration:
   ```
   terraform apply
   ```

5. To clean up resources when no longer needed:
   ```
   terraform destroy
   ```

## Variables

See `variables.tf` for all configurable options.

## Outputs

After successful deployment, the following outputs will be available:
- `storage_account_id`: The ID of the created storage account
- `storage_account_name`: The name of the created storage account
- `primary_blob_endpoint`: The primary blob endpoint URL
- `blob_container_name`: The name of the created blob container

## Notes

- The storage account name must be globally unique across all Azure
- This configuration uses the Azure provider which must be authenticated