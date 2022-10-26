#!/bin/bash
kind create cluster --name posts --config ./k8s/kind/clusterconfig.yaml
kubectl cluster-info --context kind-posts
