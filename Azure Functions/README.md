# Azure Functions Infrastructure

This repository contains Terraform code to provision Azure Functions infrastructure. The code creates the following resources:

- Resource Group
- Storage Account (required for Azure Functions)
- App Service Plan
- Function App

## Prerequisites

- [Terraform](https://www.terraform.io/downloads.html) (v1.0.0 or newer)
- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli) (for authentication)
- Azure subscription

## Getting Started

1. **Login to Azure**

   ```bash
   az login
   ```

2. **Initialize Terraform**

   ```bash
   terraform init
   ```

3. **Create a terraform.tfvars file**

   Create a `terraform.tfvars` file with the following variables:

   ```hcl
   resource_group_name     = "my-function-app-rg"
   location                = "East US"
   storage_account_name    = "myfunctionappsa"
   app_service_plan_name   = "my-function-app-plan"
   function_app_name       = "my-function-app"
   ```

4. **Plan the deployment**

   ```bash
   terraform plan -out=tfplan
   ```

5. **Apply the configuration**

   ```bash
   terraform apply tfplan
   ```

## Customization

You can customize the deployment by modifying the variables in `terraform.tfvars` or by directly editing the `variables.tf` file.

## Clean Up

To remove all resources created by Terraform:

```bash
terraform destroy
```

## Notes

- The function app is configured with the Consumption plan (serverless) by default
- HTTPS is enforced
- The storage account created uses the Standard LRS tier