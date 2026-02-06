#!/bin/bash
# Test du pipeline complet avec suivi jusqu'à completion

set -e

SUPABASE_URL="https://ftlhzmlcrjaoiojqefdf.supabase.co"
SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0bGh6bWxjcmphb2lvanFlZmRmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDI5MDIwNywiZXhwIjoyMDg1ODY2MjA3fQ.TAQBzdBVst0qaN-AQz1DKhoSudFcUiPXKVkodnWLtGU"
CV_FILE="/home/ubuntu/.clawdbot/media/inbound/93f5ce8e-bbd5-4732-813d-803b7433064d.pdf"

echo "🚀 TEST PIPELINE COMPLET"
echo ""

# 1. Upload
echo "📤 UPLOAD..."
UPLOAD_RESULT=$(curl -s -X POST https://careercare.vercel.app/api/cv/upload -F "cv=@$CV_FILE")
ANALYSIS_ID=$(echo "$UPLOAD_RESULT" | jq -r '.id // empty')

if [ -z "$ANALYSIS_ID" ]; then
  echo "❌ Upload échoué: $(echo "$UPLOAD_RESULT" | jq -r '.error')"
  exit 1
fi

echo "✅ Upload OK - ID: $ANALYSIS_ID"
echo ""

# 2. Boucle jusqu'à completion
MAX_LOOPS=30
for i in $(seq 1 $MAX_LOOPS); do
  sleep 5
  
  # Vérifier le statut dans Supabase
  STATUS_RESULT=$(curl -s "$SUPABASE_URL/rest/v1/cv_analyses?id=eq.$ANALYSIS_ID&select=status" \
    -H "apikey: sb_publishable_MxDUQj9oITajv12t1G2mow_agB-O34A" \
    -H "Authorization: Bearer $SUPABASE_KEY")
  
  STATUS=$(echo "$STATUS_RESULT" | jq -r '.[0].status // "unknown"')
  
  echo "[$i/30] ⏰ $(date +%H:%M:%S) - Status: $STATUS"
  
  case "$STATUS" in
    "pending")
      # Lancer extraction
      curl -s -X POST https://careercare.vercel.app/api/cv/extract \
        -H "Content-Type: application/json" \
        -d "{\"analysisId\":\"$ANALYSIS_ID\"}" > /dev/null
      echo "  → Extraction lancée"
      ;;
    
    "anonymizing")
      # Lancer anonymisation
      curl -s -X POST https://careercare.vercel.app/api/cv/anonymize \
        -H "Content-Type: application/json" \
        -d "{\"analysisId\":\"$ANALYSIS_ID\"}" > /dev/null
      echo "  → Anonymisation lancée"
      ;;
    
    "analyzing")
      # Lancer analyse
      curl -s -X POST https://careercare.vercel.app/api/cv/analyze \
        -H "Content-Type: application/json" \
        -d "{\"analysisId\":\"$ANALYSIS_ID\"}" > /dev/null
      echo "  → Analyse lancée"
      ;;
    
    "done")
      # Récupérer le score
      RESULTS=$(curl -s "$SUPABASE_URL/rest/v1/cv_results?analysis_id=eq.$ANALYSIS_ID&select=score_global" \
        -H "apikey: sb_publishable_MxDUQj9oITajv12t1G2mow_agB-O34A" \
        -H "Authorization: Bearer $SUPABASE_KEY")
      
      SCORE=$(echo "$RESULTS" | jq -r '.[0].score_global // "N/A"')
      
      echo ""
      echo "🎉 SUCCÈS COMPLET !"
      echo "📊 Score: $SCORE/100"
      echo "🔗 https://careercare.vercel.app/cv/$ANALYSIS_ID"
      exit 0
      ;;
    
    "error")
      echo ""
      echo "❌ ERREUR détectée dans le pipeline"
      exit 1
      ;;
    
    *)
      echo "  → Attente..."
      ;;
  esac
done

echo ""
echo "⏱️ TIMEOUT après $MAX_LOOPS tentatives"
echo "Dernier statut: $STATUS"
exit 1
