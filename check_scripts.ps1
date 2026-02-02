# Script pour vérifier package.json depuis Windows
Get-Content "C:\Users\jltsm\Desktop\SOUVERAIN\package.json" | ConvertFrom-Json | Select-Object -ExpandProperty scripts
