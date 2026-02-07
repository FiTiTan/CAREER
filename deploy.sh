#!/bin/bash
set -e

APP_DIR="/home/ubuntu/clawd"
LOG_FILE="/var/log/careercare/deploy.log"

echo "🚀 Déploiement CareerCare — $(date)" | tee -a $LOG_FILE

cd $APP_DIR

echo "📥 Pull des changements..." | tee -a $LOG_FILE
git pull origin main

echo "📦 Installation des dépendances..." | tee -a $LOG_FILE
npm ci --production=false

echo "🔨 Build de l'application..." | tee -a $LOG_FILE
npm run build

echo "🔄 Redémarrage PM2..." | tee -a $LOG_FILE
pm2 reload careercare || pm2 start ecosystem.config.js

echo "✅ Déploiement terminé — $(date)" | tee -a $LOG_FILE
