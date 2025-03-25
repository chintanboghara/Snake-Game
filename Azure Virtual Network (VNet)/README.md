# Azure Virtual Network Infrastructure with Terraform

## Project Overview
This Terraform project creates a robust Azure Virtual Network (VNet) infrastructure with multiple subnets, network security groups, and related networking components.

## Prerequisites
- Azure CLI installed
- Terraform (version 1.5.0 or later)
- Azure subscription
- Service principal with contributor access

## Project Structure
```
Azure Virtual Network (VNet)/
│
├── main.tf
├── variables.tf
├── outputs.tf
├── network.tf
├── security.tf
├── README.md
└── .gitignore
```

## Getting Started

### 1. Authentication
Authenticate with Azure using one of these methods:
- Azure CLI: `az login`
- Service Principal Environment Variables
- Terraform Azure Provider authentication

### 2. Initialize Terraform
```bash
terraform init
```

### 3. Plan and Apply
```bash
terraform plan
terraform apply
```

## Components Created
- Virtual Network
- Multiple Subnets
- Network Security Groups
- Subnet-NSG Associations

## Variables
Customize deployment by modifying `variables.tf`

## Outputs
The project provides outputs for:
- VNet ID
- Subnet IDs
- NSG IDs

## Clean Up
```bash
terraform destroy
```