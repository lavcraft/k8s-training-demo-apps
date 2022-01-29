#!/bin/bash


PASSWORD=read -p password;
helm repo add ext-rbru-container-community-virtual-helm "https://artifactory.raiffeisen.ru/artifactory/ext-rbru-container-community-virtual-helm/" \
    --username "$USER" \
    --password "$PASSWORD"
