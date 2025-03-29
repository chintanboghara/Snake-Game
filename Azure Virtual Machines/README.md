# Azure Virtual Machine Terraform Configuration

This Terraform configuration deploys Linux Virtual Machines in Azure along with the necessary networking infrastructure.

## Resources Created

- Resource Group
- Virtual Network
- Subnet
- Public IP Addresses
- Network Interfaces
- Network Security Group
- Linux Virtual Machines

## Prerequisites

- [Terraform](https://www.terraform.io/downloads.html) (version >= 1.0.0)
- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli) installed and configured
- SSH key pair (for VM access)

## Getting Started

1. **Login to Azure**

   ```bash
   az login
   ```

2. **Initialize Terraform**

   ```bash
   terraform init
   ```

3. **Configure Variables (Optional)**

   Create a `terraform.tfvars` file to override default variable values:

   ```hcl
   prefix             = "myproject"
   resource_group_name = "myproject-resources"
   location           = "West US 2"
   vm_count           = 2
   vm_size            = "Standard_D2s_v3"
   admin_username     = "myadmin"
   ssh_public_key_path = "~/.ssh/id_rsa.pub"
   ```

4. **Plan the Deployment**

   ```bash
   terraform plan -out=tfplan
   ```

5. **Apply the Configuration**

   ```bash
   terraform apply tfplan
   ```

6. **Access the VMs**

   After deployment, you can SSH into your VMs using:

   ```bash
   ssh [admin_username]@[public_ip_address]
   ```

   The public IP addresses are available in the Terraform outputs.

## Customization

This configuration provides sensible defaults but can be customized by modifying the variables in `variables.tf` or by providing a `terraform.tfvars` file.

## Clean Up

To destroy all resources created by this configuration:

```bash
terraform destroy
```

## Security Notes

- The default configuration opens SSH (port 22) to all IP addresses. For production, restrict this to specific IP ranges.
- Consider using Azure Key Vault to store and manage sensitive information.
- Review Azure security best practices for virtual machines.