#!/bin/bash
kubectl exec -it testcurl -- sh

curl --location --request POST 'http://keycloak.iam/realms/posts/protocol/openid-connect/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'client_id=kong' \
--data-urlencode 'grant_type=password' \
--data-urlencode 'username=richiebono' \
--data-urlencode 'password=123456' \
--data-urlencode 'client_secret=ePM9uDlLCyZSQChuOz3vqC91ObP95cvA' \
--data-urlencode 'scope=openid'
