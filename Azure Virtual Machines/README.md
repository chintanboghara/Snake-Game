# Azure VM Infrastructure with Terraform

This repository contains Terraform code to deploy Azure Virtual Machines with all necessary supporting infrastructure.

## Architecture

This Terraform configuration creates the following resources:

- Resource Group
- Virtual Network with Subnet
- Network Security Group with SSH access rule
- Public IP addresses
- Network Interfaces
- Linux Virtual Machines
- Availability Set for high availability

## Prerequisites

- [Terraform](https://www.terraform.io/downloads.html) v1.2.0 or newer
- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli) installed and configured
- An SSH key pair (the public key is referenced in the VM configuration)

## Getting Started

1. **Clone this repository**

```bash
git clone <repository-url>
cd <repository-directory>
```

2. **Initialize Terraform**

```bash
terraform init
```

3. **Create an SSH key pair** (if you don't already have one)

```bash
ssh-keygen -t rsa -b 4096
```

4. **Configure variables**

Copy the example terraform.tfvars file:

```bash
cp terraform.tfvars.example terraform.tfvars
```

Edit the `terraform.tfvars` file to set your desired values.

5. **Plan the deployment**

```bash
terraform plan -out=tfplan
```

6. **Apply the configuration**

```bash
terraform apply tfplan
```

## Configuration Options

You can customize the deployment by modifying the variables in `terraform.tfvars` or by passing them directly to the terraform command. The available variables are:

| Variable | Description | Default |
|----------|-------------|---------|
| environment | Environment name (dev, staging, prod) | dev |
| project_name | Project name used for resource naming | app |
| location | Azure region for resources | eastus |
| vm_size | Size of the Virtual Machine | Standard_B2s |
| admin_username | Username for VM administration | azureadmin |
| vm_count | Number of virtual machines to create | 2 |
| vm_image | VM image configuration | Ubuntu 22.04 LTS |

## Resource Naming Convention

All resources follow a consistent naming convention: `<project>-<environment>-<resource-type>[-<index>]`

## Remote State

The configuration includes a commented backend block for storing state in Azure Storage. To enable it:

1. Create a storage account and container for state
2. Uncomment the backend block in `main.tf`
3. Configure with your storage account details

## Security Considerations

- The default configuration enables SSH access from any source IP. For production environments, restrict this to specific IPs.
- VM authentication uses SSH keys only (password authentication is disabled)
- Consider adding Azure Key Vault integration for secrets management

## Outputs

After successful deployment, Terraform will output:

- Resource Group name
- Virtual Machine IDs
- Public IP addresses of the VMs
- FQDNs of the VMs
- Network Security Group ID
- Virtual Network ID

## Cleanup

To destroy all resources created by this configuration:

```bash
terraform destroy
```

## Contributing

Please follow the standard Git workflow:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.