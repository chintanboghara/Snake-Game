# Azure VM Terraform Infrastructure

## Overview
This Terraform project automates the deployment of multiple Azure Virtual Machines with configurable settings.

## Prerequisites
- Azure CLI
- Terraform
- Azure Subscription

## Authentication
Configure Azure credentials using one of the following methods:
1. Azure CLI: `az login`
2. Environment Variables:
   ```
   export ARM_SUBSCRIPTION_ID="your_subscription_id"
   export ARM_TENANT_ID="your_tenant_id"
   export ARM_CLIENT_ID="your_client_id"
   export ARM_CLIENT_SECRET="your_client_secret"
   ```

## Configuration
Modify `variables.tf` to customize:
- Number of VMs
- VM Size
- Image Details
- Location
- Disk Type

## Usage
1. Initialize Terraform:
   ```
   terraform init
   ```

2. Plan the deployment:
   ```
   terraform plan
   ```

3. Apply the configuration:
   ```
   terraform apply
   ```

4. Destroy resources when no longer needed:
   ```
   terraform destroy
   ```

## Security Considerations
- Use strong, unique passwords
- Implement network security groups
- Consider using SSH keys instead of passwords
- Rotate credentials regularly

## Outputs
After deployment, Terraform will output:
- VM Names
- Public IP Addresses
- Resource Group Name