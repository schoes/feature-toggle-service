#!/usr/bin/env bash

npm run prestart:prod

docker build -t svenschoeni/feature-toggle-service:latest .

docker push svenschoeni/feature-toggle-service

