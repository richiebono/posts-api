#!/bin/bash
kubectl create ns monitoring
helm install prometheus-stack prometheus-community/kube-prometheus-stack -f ./k8s/prometheus/prometheus.yaml --namespace monitoring
