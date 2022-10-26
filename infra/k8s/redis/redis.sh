#!/bin/bash
helm repo add bitnami https://charts.bitnami.com/bitnami
helm install redis-rate-limit bitnami/redis