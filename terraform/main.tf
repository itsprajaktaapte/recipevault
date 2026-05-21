# Resource Group — like a folder that holds all our Azure resources
resource "azurerm_resource_group" "main" {
  name     = var.resource_group_name
  location = var.location
}

# Azure Container Registry — stores our Docker images (like AWS ECR)
resource "azurerm_container_registry" "acr" {
  name                = var.acr_name
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  sku                 = "Basic"
  admin_enabled       = true
}

# AKS Cluster — our Kubernetes cluster (like AWS ECS but full Kubernetes)
resource "azurerm_kubernetes_cluster" "aks" {
  name                = var.aks_cluster_name
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  dns_prefix          = "recipevault"

  # Default node pool — the VMs that run our containers
  default_node_pool {
    name       = "default"
    node_count = var.node_count
    vm_size    = var.node_vm_size
  }

  # Managed identity — AKS uses this to talk to other Azure services
  identity {
    type = "SystemAssigned"
  }

  tags = {
    project     = "recipevault"
    environment = "dev"
  }
}

# Allow AKS to pull images from ACR — critical link between the two
resource "azurerm_role_assignment" "aks_acr_pull" {
  principal_id                     = azurerm_kubernetes_cluster.aks.kubelet_identity[0].object_id
  role_definition_name             = "AcrPull"
  scope                            = azurerm_container_registry.acr.id
  skip_service_principal_aad_check = true
}