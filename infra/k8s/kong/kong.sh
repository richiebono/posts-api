#!/bin/bash
docker build -f ./k8s/kong/docker/Dockerfile -t richiebono/kong-oidc-jwt:latest -t richiebono/kong-oidc-jwt:latest .
docker login
docker push richiebono/kong-oidc-jwt
helm repo add kong https://charts.konghq.com
kubectl create ns kong
helm install kong kong/kong -f ./k8s/kong/kong-conf.yaml --set proxy.type=NodePort,proxy.http.nodePort=30000,proxy.tls.nodePort=30003 --set ingressController.installCRDs=false --set serviceMonitor.enabled=true --set serviceMonitor.labels.release=promstack --namespace kong


