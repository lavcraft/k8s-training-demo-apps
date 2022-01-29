#!/bin/bash

helm install --generate-name container-community/rbru-filebeat \
    --set fields.kubernetes_cluster="k8s-dt-conc-01.k8s" \
    --set fields.team_name="$USER_team" \
    --set fields.application_name="training-$USER-filebeat" \
    --set fields.team_contact="$USER@raiffeisen.ru" \
    --set config.output.kafka.hosts[0]="s-msk-v-elk-mq1.raiffeisen.ru:9092" \
    --set config.output.kafka.hosts[1]="s-msk-v-elk-mq2.raiffeisen.ru:9092" \
    --set config.output.kafka.hosts[2]="s-msk-v-elk-mq3.raiffeisen.ru:9092" \
    --set config.output.kafka.topic="training-k8s-knife-and-butter" \
    --set image.pullSecrets[0]="regcred" \
    --namespace="$USER"
