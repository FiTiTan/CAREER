export default function CGVPage() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1>Conditions Générales de Vente</h1>
      <p className="text-secondary">Dernière mise à jour : 7 février 2026</p>

      <h2>1. Objet</h2>
      <p>
        Les présentes Conditions Générales de Vente (CGV) régissent les ventes 
        de services et produits proposés par CareerCare à ses utilisateurs.
      </p>

      <h2>2. Services et tarifs</h2>
      <h3>Plans d'abonnement</h3>
      <table>
        <thead>
          <tr>
            <th>Plan</th>
            <th>Prix mensuel</th>
            <th>Prix annuel</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Free</td>
            <td>Gratuit</td>
            <td>Gratuit</td>
          </tr>
          <tr>
            <td>Pro</td>
            <td>9,99 €/mois</td>
            <td>99,99 €/an</td>
          </tr>
          <tr>
            <td>Business</td>
            <td>29,99 €/mois</td>
            <td>299,99 €/an</td>
          </tr>
        </tbody>
      </table>
      <p>Les prix sont indiqués TTC.</p>

      <h2>3. Commande et paiement</h2>
      <p>
        Le paiement s'effectue en ligne par carte bancaire via notre prestataire 
        sécurisé Stripe. La commande est confirmée après validation du paiement.
      </p>

      <h2>4. Abonnement et renouvellement</h2>
      <p>
        Les abonnements sont reconduits tacitement à chaque échéance (mensuelle 
        ou annuelle). Vous pouvez annuler à tout moment depuis vos paramètres ; 
        l'accès reste actif jusqu'à la fin de la période payée.
      </p>

      <h2>5. Droit de rétractation</h2>
      <p>
        Conformément à l'article L221-28 du Code de la consommation, le droit 
        de rétractation ne s'applique pas aux contenus numériques fournis 
        immédiatement après la commande avec votre accord exprès.
      </p>
      <p>
        Pour les abonnements non utilisés, vous disposez d'un délai de 14 jours 
        pour demander un remboursement à support@careercare.io.
      </p>

      <h2>6. Boutique (achats ponctuels)</h2>
      <p>
        Les services de la boutique (coaching, audits) sont livrés selon les 
        délais indiqués sur chaque fiche produit. Un email de confirmation 
        est envoyé à la livraison.
      </p>

      <h2>7. Limitation de responsabilité</h2>
      <p>
        CareerCare s'engage à fournir des services de qualité mais ne garantit 
        pas de résultats spécifiques (emploi, entretiens). Les conseils IA sont 
        indicatifs et ne remplacent pas un avis professionnel.
      </p>

      <h2>8. Support client</h2>
      <p>
        Notre équipe est disponible par email : support@careercare.io<br />
        Délai de réponse : 48h ouvrées maximum.
      </p>

      <h2>9. Modifications</h2>
      <p>
        CareerCare se réserve le droit de modifier les tarifs et CGV. Les 
        modifications n'affectent pas les commandes en cours.
      </p>

      <h2>10. Litiges</h2>
      <p>
        En cas de litige, une solution amiable sera recherchée avant toute 
        action judiciaire. À défaut, les tribunaux français seront compétents.
      </p>
      <p>
        Médiateur de la consommation : [À compléter]
      </p>

      <h2>Contact</h2>
      <p>
        Pour toute question : billing@careercare.io
      </p>
    </article>
  );
}
