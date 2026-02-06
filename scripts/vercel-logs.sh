#!/bin/bash
# Script pour récupérer les logs de build Vercel

VERCEL_TOKEN="E0WXFGivNjfKWJOMVibEVtB1"
PROJECT_ID="prj_W6paLWBXe0ylJeaRR8G2Vhmqyrdc"

# Récupérer le dernier déploiement
echo "🔍 Récupération du dernier déploiement..."
DEPLOYMENT=$(curl -s "https://api.vercel.com/v6/deployments?projectId=${PROJECT_ID}&limit=1" \
  -H "Authorization: Bearer ${VERCEL_TOKEN}")

DEPLOY_ID=$(echo "$DEPLOYMENT" | jq -r '.deployments[0].uid')
STATE=$(echo "$DEPLOYMENT" | jq -r '.deployments[0].state')
COMMIT=$(echo "$DEPLOYMENT" | jq -r '.deployments[0].meta.githubCommitSha[0:7]')
URL=$(echo "$DEPLOYMENT" | jq -r '.deployments[0].url')

echo ""
echo "📦 Déploiement : $DEPLOY_ID"
echo "🌿 Commit : $COMMIT"
echo "📊 État : $STATE"
echo "🔗 URL : https://$URL"
echo ""

if [ "$STATE" = "ERROR" ] || [ "$STATE" = "FAILED" ]; then
  echo "❌ Build échoué - Récupération des logs d'erreur..."
  echo ""
  
  # Récupérer les logs d'erreur
  curl -s "https://api.vercel.com/v2/deployments/${DEPLOY_ID}/events" \
    -H "Authorization: Bearer ${VERCEL_TOKEN}" \
    | jq -r '.[] | select(.type == "stderr" or .type == "stdout") | .payload.text' \
    | grep -E "error|Error|ERROR|failed|Failed|FAILED|Build error" -A 5 -B 2 \
    | tail -100
    
elif [ "$STATE" = "BUILDING" ] || [ "$STATE" = "QUEUED" ]; then
  echo "⏳ Build en cours... Attente de 30 secondes..."
  sleep 30
  exec "$0" # Relancer le script
  
elif [ "$STATE" = "READY" ]; then
  echo "✅ Build réussi !"
  
else
  echo "⚠️ État inconnu : $STATE"
fi

echo ""
echo "🔗 Voir dans Vercel : https://vercel.com/carreercares-projects/careercare/$DEPLOY_ID"
