# CareerCare - Rollout Autonome Nuit 5-6 Fév 2026

## 🎯 Objectif
Avancer au maximum sur la structure du projet pendant que Jean-Louis dort.

## ✅ Phase 1 : Structure Upload CV (22h30-00h30)

### Pages
- [ ] `app/(app)/cv/new/page.tsx` - Upload CV
- [ ] `app/(app)/cv/[id]/page.tsx` - Rapport détaillé
- [ ] `app/(app)/cv/page.tsx` - Liste analyses
- [ ] `app/(app)/dashboard/page.tsx` - Dashboard user
- [ ] `app/(app)/layout.tsx` - Layout avec sidebar

### Composants CV
- [ ] `components/cv/CVUploader.tsx` - Drag & drop
- [ ] `components/cv/AnalysisTicker.tsx` - Animation processing
- [ ] `components/cv/ScoreCard.tsx` - Affichage score
- [ ] `components/cv/ScoreGauge.tsx` - Gauge circulaire
- [ ] `components/cv/ReportView.tsx` - Rapport complet

### API Routes
- [ ] `app/api/cv/upload/route.ts` - Upload PDF (squelette)
- [ ] `app/api/cv/analyze/route.ts` - Lancer analyse (squelette)
- [ ] `app/api/cv/[id]/route.ts` - Get rapport (squelette)

### Services
- [ ] `lib/ai/mistral.ts` - Service Mistral (squelette)
- [ ] `lib/ai/anonymizer.ts` - Anonymisation (migré SOUVERAIN)
- [ ] `lib/ai/prompts/cv-analysis.ts` - Prompt V5
- [ ] `lib/pdf.ts` - Extraction texte PDF
- [ ] `lib/supabase/client.ts` - Client browser (squelette)
- [ ] `lib/supabase/server.ts` - Client server (squelette)

### Types
- [ ] `types/cv.ts` - CVAnalysis, CVResult, etc.
- [ ] `types/database.ts` - Types Supabase
- [ ] `types/ai.ts` - Types services IA

---

## ✅ Phase 2 : Pages Marketing (00h30-01h30)

### Pages
- [ ] `app/(marketing)/pricing/page.tsx` - Tarifs détaillés
- [ ] `app/(marketing)/about/page.tsx` - À propos
- [ ] `app/(marketing)/privacy/page.tsx` - Politique confidentialité
- [ ] `app/(marketing)/terms/page.tsx` - CGU

### Composants Marketing
- [ ] `components/marketing/PricingCard.tsx` - Card tarif
- [ ] `components/marketing/FAQ.tsx` - Section FAQ
- [ ] `components/marketing/Testimonials.tsx` - Témoignages

---

## ✅ Phase 3 : UI Components (01h30-02h30)

### Composants Réutilisables
- [ ] `components/ui/Button.tsx` - Bouton CALM-UI
- [ ] `components/ui/Card.tsx` - Card glassmorphism
- [ ] `components/ui/Modal.tsx` - Modal
- [ ] `components/ui/Toast.tsx` - Notifications
- [ ] `components/ui/Input.tsx` - Input stylisé
- [ ] `components/ui/Spinner.tsx` - Loading spinner

### Hooks
- [ ] `hooks/useAuth.ts` - Hook auth (squelette)
- [ ] `hooks/useToast.ts` - Hook toast
- [ ] `hooks/useSubscription.ts` - Hook subscription (squelette)

---

## ✅ Phase 4 : Migration SOUVERAIN (02h30-03h30)

### Assets à Migrer
- [ ] Prompt V5 depuis `groq-client.cjs` (SOUVERAIN)
- [ ] `profileContextDetector.ts` (adapté)
- [ ] Templates HTML (10 templates → `/public/templates/`)
- [ ] Logique anonymisation

---

## ✅ Phase 5 : Documentation (03h30-04h00)

### Docs
- [ ] `README.md` - Guide complet
- [ ] `SETUP.md` - Installation pas à pas
- [ ] `.env.example` - Toutes les variables
- [ ] `CONTRIBUTING.md` - Guide contribution

---

## 📊 Résultat Attendu Demain Matin

### Prêt à l'emploi
✅ Structure complète du projet
✅ Pages et composants créés
✅ Types TypeScript complets
✅ Services (squelettes avec TODOs)
✅ Prompts migrés et adaptés
✅ Documentation complète

### Reste à faire (nécessite Jean-Louis)
❌ Ajouter credentials dans `.env.local`
❌ Configurer projet Supabase
❌ Tester les API calls réels
❌ Valider les prompts
❌ Design review

---

## 🎯 Critères de Succès

1. **Build réussi** - `npm run build` sans erreur
2. **Types propres** - 0 erreur TypeScript
3. **Structure logique** - Arborescence claire
4. **Code documenté** - Commentaires utiles
5. **Prêt à intégrer** - Juste ajouter les credentials

---

**Estimation totale : 5-6h de travail autonome**
**Livraison prévue : 6 Février 2026, 04h00 UTC**
