#!/bin/bash
echo "Provisioning Kind Cluster"
sh ./k8s/kind/kind.sh

echo "Provisioning metalllb for local environment ingress"
sh ./k8s/metallb/metallb.sh

echo "Provisioning Kong Gateway"
sh ./k8s/kong/kong.sh

echo "Provisioning prometheus"
sh ./k8s/prometheus/prometheus.sh

echo "Provisioning Elastic"
sh ./k8s/efk/elastic/elastic.sh

echo "Provisioning Fluentd"
sh ./k8s/efk/fluentd/fluentd.sh

echo "Provisioning Kibana"
sh ./k8s/efk/kibana/kibana.sh

echo "Provisioning Keycloak"
sh ./k8s/keycloak/keycloak.sh

echo "Provisioning MongoDB"
sh ./k8s/mongodb/mongodb.sh

echo "Provisioning MongoDB"
sh ./k8s/mongodb/mongodb.sh

echo "Provisioning Argo"
sh ./k8s/argo/argo.sh

echo "Provisioning kongs apis Here"
kubectl apply -f ./k8s/kong/kong-apis/ --recursive

echo "Create Namespaces"
kubectl apply -f ./k8s/apps/namespace/

echo "Create All ConfigMap"
kubectl apply -f ./k8s/apps/configmap/

echo "Create All Deloy"
kubectl apply -f ./k8s/apps/deploy/

echo "Create All Service"
kubectl apply -f ./k8s/apps/service/

echo "Create All HPA"
kubectl apply -f ./k8s/apps/hpa/

echo "Create ArgoCD Apps"
kubectl apply -f ./argo-apps/




