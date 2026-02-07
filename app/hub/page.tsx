import { ScoreDashboard } from '@/components/features/career-score/score-dashboard';
import { CareerScore } from '@/types/score';

// TODO: Fetch from Supabase
async function getCareerScore(): Promise<CareerScore> {
  // Mock data for development
  return {
    id: '1',
    user_id: 'user-1',
    total: 67,
    pillars: {
      documents: {
        value: 85,
        weight: 0.20,
        module: 'CV Coach',
        factors: [
          { name: 'CV analysé', value: 100, max_impact: 30 },
          { name: 'Score ATS', value: 78, max_impact: 25 },
          { name: 'Suggestions appliquées', value: 60, max_impact: 25 },
          { name: 'Fraîcheur analyse', value: 100, max_impact: 20 },
        ],
        trend: 'up',
      },
      visibility: {
        value: 60,
        weight: 0.20,
        module: 'Portfolio',
        factors: [
          { name: 'Portfolio créé', value: 100, max_impact: 20 },
          { name: 'Portfolio publié', value: 0, max_impact: 30 },
          { name: 'Projets ajoutés', value: 80, max_impact: 20 },
          { name: 'Template premium', value: 0, max_impact: 10 },
          { name: 'Analytics actives', value: 0, max_impact: 20 },
        ],
        trend: 'stable',
      },
      network: {
        value: 45,
        weight: 0.20,
        module: 'LinkedIn',
        factors: [
          { name: 'Profil importé', value: 0, max_impact: 20 },
          { name: 'Score LinkedIn', value: 0, max_impact: 30 },
          { name: 'Suggestions', value: 0, max_impact: 30 },
          { name: 'Plan d\'action', value: 0, max_impact: 20 },
        ],
        trend: 'down',
      },
      dynamique: {
        value: 72,
        weight: 0.15,
        module: 'Job Match',
        factors: [
          { name: 'Critères définis', value: 100, max_impact: 20 },
          { name: 'Offres matchées', value: 80, max_impact: 20 },
          { name: 'Candidatures actives', value: 60, max_impact: 30 },
          { name: 'Entretiens obtenus', value: 50, max_impact: 30 },
        ],
        trend: 'up',
      },
      organisation: {
        value: 30,
        weight: 0.10,
        module: 'Coffre-Fort',
        factors: [
          { name: 'Fichiers stockés', value: 40, max_impact: 30 },
          { name: 'Dossiers organisés', value: 20, max_impact: 30 },
          { name: 'Documents clés', value: 30, max_impact: 40 },
        ],
        trend: 'stable',
      },
      presence: {
        value: 55,
        weight: 0.15,
        module: 'E-Réputation',
        factors: [
          { name: 'Scan effectué', value: 100, max_impact: 20 },
          { name: 'Score global', value: 55, max_impact: 30 },
          { name: 'Plateformes vérifiées', value: 40, max_impact: 30 },
          { name: 'Alertes négatives', value: 80, max_impact: 20 },
        ],
        trend: 'up',
      },
    },
    recommended_action: {
      pillar: 'network',
      module_route: '/hub/linkedin/import',
      title: 'Importez votre profil LinkedIn',
      description: 'Connectez votre profil LinkedIn pour recevoir des recommandations personnalisées et améliorer votre visibilité professionnelle.',
      potential_gain: 15,
      priority: 'high',
    },
    computed_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

export default async function HubPage() {
  const score = await getCareerScore();

  return (
    <div className="max-w-6xl mx-auto">
      <ScoreDashboard score={score} />
    </div>
  );
}
