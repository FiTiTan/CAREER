export default function ConfidentialitePage() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1>Politique de Confidentialité</h1>
      <p className="text-secondary">Dernière mise à jour : 7 février 2026</p>

      <h2>1. Introduction</h2>
      <p>
        Chez CareerCare, la protection de vos données personnelles est une 
        priorité. Cette politique explique comment nous collectons, utilisons 
        et protégeons vos informations.
      </p>

      <h2>2. Responsable du traitement</h2>
      <p>
        <strong>CareerCare</strong><br />
        [Adresse]<br />
        Email : privacy@careercare.io<br />
        DPO : dpo@careercare.io
      </p>

      <h2>3. Données collectées</h2>
      <h3>Données fournies directement</h3>
      <ul>
        <li>Informations de compte (email, nom)</li>
        <li>CV et documents uploadés</li>
        <li>Informations de profil professionnel</li>
        <li>Préférences de recherche d'emploi</li>
      </ul>

      <h3>Données collectées automatiquement</h3>
      <ul>
        <li>Données de connexion (IP, navigateur)</li>
        <li>Données d'utilisation (pages visitées, actions)</li>
        <li>Cookies (voir <a href="/cookies">Politique de cookies</a>)</li>
      </ul>

      <h2>4. Finalités du traitement</h2>
      <ul>
        <li>Fourniture et amélioration des services</li>
        <li>Analyse IA de vos documents (avec anonymisation préalable)</li>
        <li>Personnalisation de l'expérience</li>
        <li>Communication (notifications, support)</li>
        <li>Facturation et gestion des abonnements</li>
        <li>Respect des obligations légales</li>
      </ul>

      <h2>5. Anonymisation et IA</h2>
      <div className="bg-primary-light border border-primary/20 rounded-lg p-4 not-prose mb-6">
        <h4 className="font-semibold mb-2">🔒 Notre engagement RGPD</h4>
        <p className="text-sm text-secondary">
          Avant toute analyse par intelligence artificielle, vos données personnelles 
          (nom, email, téléphone, adresses) sont <strong>automatiquement anonymisées</strong> 
          par notre système utilisant Mistral AI hébergé en Europe (Frankfurt). 
          Aucune donnée personnelle identifiable ne quitte l'Union Européenne.
        </p>
      </div>

      <h2>6. Base légale</h2>
      <ul>
        <li><strong>Contrat</strong> : traitement nécessaire à l'exécution du service</li>
        <li><strong>Consentement</strong> : cookies non essentiels, communications marketing</li>
        <li><strong>Intérêt légitime</strong> : amélioration des services, sécurité</li>
        <li><strong>Obligation légale</strong> : conservation des factures</li>
      </ul>

      <h2>7. Destinataires des données</h2>
      <ul>
        <li><strong>Supabase</strong> (hébergement base de données) — UE</li>
        <li><strong>Mistral AI</strong> (anonymisation) — UE (Frankfurt)</li>
        <li><strong>DeepSeek</strong> (analyse IA) — données anonymisées uniquement</li>
        <li><strong>Stripe</strong> (paiements) — certifié Privacy Shield</li>
        <li><strong>OVH</strong> (hébergement) — France</li>
      </ul>

      <h2>8. Durée de conservation</h2>
      <ul>
        <li>Données de compte : durée de l'inscription + 3 ans</li>
        <li>Documents uploadés : jusqu'à suppression par l'utilisateur</li>
        <li>Données de facturation : 10 ans (obligation légale)</li>
        <li>Logs techniques : 12 mois</li>
      </ul>

      <h2>9. Vos droits</h2>
      <p>Conformément au RGPD, vous disposez des droits suivants :</p>
      <ul>
        <li><strong>Accès</strong> : obtenir une copie de vos données</li>
        <li><strong>Rectification</strong> : corriger vos données</li>
        <li><strong>Effacement</strong> : supprimer vos données</li>
        <li><strong>Portabilité</strong> : récupérer vos données dans un format standard</li>
        <li><strong>Opposition</strong> : vous opposer au traitement</li>
        <li><strong>Limitation</strong> : limiter le traitement</li>
      </ul>
      <p>
        Pour exercer ces droits : <strong>privacy@careercare.io</strong> ou depuis 
        Paramètres → Confidentialité dans l'application.
      </p>

      <h2>10. Sécurité</h2>
      <ul>
        <li>Chiffrement des données en transit (TLS 1.3) et au repos</li>
        <li>Authentification sécurisée (Magic Link, OAuth)</li>
        <li>Accès restreint aux données (principe du moindre privilège)</li>
        <li>Audits de sécurité réguliers</li>
      </ul>

      <h2>11. Contact</h2>
      <p>
        Pour toute question relative à cette politique :<br />
        Email : privacy@careercare.io<br />
        DPO : dpo@careercare.io
      </p>
      <p>
        Vous pouvez également adresser une réclamation à la CNIL : 
        <a href="https://www.cnil.fr" target="_blank" rel="noopener">www.cnil.fr</a>
      </p>
    </article>
  );
}
