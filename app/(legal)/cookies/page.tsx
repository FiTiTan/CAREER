export default function CookiesPage() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1>Politique de Cookies</h1>
      <p className="text-secondary">Dernière mise à jour : 7 février 2026</p>

      <h2>1. Qu'est-ce qu'un cookie ?</h2>
      <p>
        Un cookie est un petit fichier texte stocké sur votre appareil lors de 
        votre visite sur notre site. Les cookies nous permettent de vous 
        reconnaître et de mémoriser vos préférences.
      </p>

      <h2>2. Cookies utilisés</h2>

      <h3>Cookies strictement nécessaires</h3>
      <p>Ces cookies sont indispensables au fonctionnement du site.</p>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Finalité</th>
            <th>Durée</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>sb-*-auth-token</td>
            <td>Authentification Supabase</td>
            <td>Session</td>
          </tr>
          <tr>
            <td>__stripe_mid</td>
            <td>Prévention de la fraude Stripe</td>
            <td>1 an</td>
          </tr>
        </tbody>
      </table>

      <h3>Cookies de performance</h3>
      <p>Ces cookies nous aident à comprendre comment vous utilisez le site.</p>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Finalité</th>
            <th>Durée</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>_ga, _gid</td>
            <td>Google Analytics (anonymisé)</td>
            <td>2 ans / 24h</td>
          </tr>
        </tbody>
      </table>

      <h3>Cookies de fonctionnalité</h3>
      <p>Ces cookies permettent de mémoriser vos préférences.</p>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Finalité</th>
            <th>Durée</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>theme</td>
            <td>Préférence thème (clair/sombre)</td>
            <td>1 an</td>
          </tr>
          <tr>
            <td>locale</td>
            <td>Langue préférée</td>
            <td>1 an</td>
          </tr>
        </tbody>
      </table>

      <h2>3. Gestion des cookies</h2>
      <p>
        Lors de votre première visite, un bandeau vous permet d'accepter ou 
        de refuser les cookies non essentiels. Vous pouvez modifier vos choix 
        à tout moment depuis les paramètres de votre navigateur :
      </p>
      <ul>
        <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener">Chrome</a></li>
        <li><a href="https://support.mozilla.org/fr/kb/activer-desactiver-cookies" target="_blank" rel="noopener">Firefox</a></li>
        <li><a href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac" target="_blank" rel="noopener">Safari</a></li>
        <li><a href="https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge" target="_blank" rel="noopener">Edge</a></li>
      </ul>

      <h2>4. Cookies tiers</h2>
      <p>
        Nous utilisons des services tiers qui peuvent déposer leurs propres 
        cookies. Consultez leurs politiques respectives :
      </p>
      <ul>
        <li><a href="https://stripe.com/fr/privacy" target="_blank" rel="noopener">Stripe</a></li>
        <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google Analytics</a></li>
      </ul>

      <h2>5. Contact</h2>
      <p>
        Pour toute question : privacy@careercare.io
      </p>
    </article>
  );
}
