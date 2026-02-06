#!/bin/bash
# Wrapper qui FORCE le reporting automatique

COMMAND="$@"
REPORT_FILE="/tmp/clawdbot-report-$(date +%s).txt"

# Exécuter la commande et capturer la sortie
echo "🚀 LANCEMENT: $COMMAND" | tee -a "$REPORT_FILE"
echo "" | tee -a "$REPORT_FILE"

$COMMAND 2>&1 | tee -a "$REPORT_FILE"
EXIT_CODE=$?

echo "" | tee -a "$REPORT_FILE"
echo "✅ TERMINÉ (code $EXIT_CODE) à $(date +%H:%M:%S)" | tee -a "$REPORT_FILE"
echo "📄 Rapport complet: $REPORT_FILE" | tee -a "$REPORT_FILE"

# Afficher un résumé final FORCÉ
echo ""
echo "=========================================="
echo "RÉSULTAT FINAL À RAPPORTER IMMÉDIATEMENT:"
echo "=========================================="
tail -10 "$REPORT_FILE"
echo "=========================================="

exit $EXIT_CODE
