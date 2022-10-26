terraform {
    required_version = ">=0.13.1"
    required_providers {
      aws = ">=3.54.0"
      local = ">=2.1.0"
    }    
    backend "s3" {
      bucket = "bono-terraform-tfstate-bucket"
      key    = "bono-terraform.tfstate"
      region = "us-east-1"
    }
}

provider "aws" {
  region = "us-east-1"  
  access_key = var.AWS_ACCESS_KEY_ID
  secret_key = var.AWS_SECRET_ACCESS_KEY
}

module "new-vpc" {
  source = "./modules/vpc"
  prefix = var.prefix
  vpc_cidr_block = var.vpc_cidr_block
}

module "eks" {
    source = "./modules/eks"
    prefix = var.prefix
    vpc_id = module.new-vpc.vpc_id
    cluster_name = var.cluster_name
    retention_days = var.retention_days
    subnet_ids = module.new-vpc.subnet_ids
    desired_size = var.desired_size
    max_size = var.max_size
    min_size = var.min_size
    node_group_number = var.node_group_number
    aws_instance_types = var.aws_instance_types
}