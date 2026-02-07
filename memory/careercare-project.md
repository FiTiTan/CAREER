# Projet CareerCare

## Contexte
Travail exclusif sur le projet CareerCare.

## Repository
- **GitHub:** https://github.com/FiTiTan/CAREER
- **Local:** /home/ubuntu/CAREER
- **Project:** /home/ubuntu/careercare

## SSH Key (publique)
```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIA0Bn/Nsr4c2SfEzBY64/60r7rFVCpugX/TEQyl9eJ8T vps-careercare
```

## Supabase (EU Frankfurt)
- **URL:** https://ftlhzmlcrjaoiojqefdf.supabase.co
- **Anon Key:** sb_publishable_MxDUQj9oITajv12t1G2mow_agB-O34A
- **Service Role:** eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0bGh6bWxjcmphb2lvanFlZmRmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDI5MDIwNywiZXhwIjoyMDg1ODY2MjA3fQ.TAQBzdBVst0qaN-AQz1DKhoSudFcUiPXKVkodnWLtGU

## AI Services - Pipeline RGPD
- **Mistral AI (anonymisation EU):** nyVGNnVowSw0cmIqrlaF8HHU9JEoUpFC
- **DeepSeek (analyse):** sk-2ce5f9ed6214485bac6f8335cdc04a83

### Workflow
1. CV brut → Mistral Small (EU) → Anonymisation [P1], [E1]...
2. Texte anonyme → DeepSeek (Chine) → Analyse CV
3. Résultat anonyme → Dé-anonymisation → Rapport final

## État actuel
- Fichier principal : `preview-ui.html`
- Derniers commits : ajustements UI (badge éclair, spacing header, boutons)
- Design system : CALM-UI v3

## Notes
- SOUVERAIN en sommeil
- Focus 100% CareerCare
