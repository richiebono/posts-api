# Profix is the company name
prefix = "bono"
cluster_name = "bono-cluster"
aws_instance_types = ["t3.medium"]
retention_days = 30
desired_size = 2
max_size = 4
min_size = 2
node_group_number = 3
vpc_cidr_block = "10.0.0.0/16"