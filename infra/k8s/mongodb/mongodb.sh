helm repo add bitnami https://charts.bitnami.com/bitnami
helm install mongodb bitnami/mongodb \
--set auth.rootPassword=mongoadmins \
--set auth.rootUser=mongoadmin \
--set auth.passwords=["mongoadmin"] \
--set auth.usernames=["mongoadmin"] \
--set replicaSetConfigurationSettings.enabled=true