variable "subscription_id" {
  description = "Azure subscription ID"
  type        = string
}

variable "location" {
  description = "Azure region"
  type        = string
  default     = "australiaeast"
}

variable "resource_group_name" {
  description = "Name of the resource group"
  type        = string
  default     = "recipevault-rg"
}

variable "acr_name" {
  description = "Azure Container Registry name (must be globally unique, lowercase, no hyphens)"
  type        = string
  default     = "recipevaultacr"
}

variable "aks_cluster_name" {
  description = "AKS cluster name"
  type        = string
  default     = "recipevault-aks"
}

variable "node_count" {
  description = "Number of nodes in AKS cluster"
  type        = number
  default     = 1
}

variable "node_vm_size" {
  description = "VM size for AKS nodes"
  type        = string
  default     = "Standard_B2s"
}