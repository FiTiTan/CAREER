// ============================================================================
// CareerCare — Client Mistral AI (Anonymisation)
// ============================================================================
//
// Mistral Small 3.1 hébergé en EU (Frankfurt).
// Utilisé UNIQUEMENT pour l'anonymisation des données personnelles
// avant envoi vers DeepSeek (hors EU).
//
// Architecture RGPD :
//   CV brut (EU) → Mistral (EU) → texte anonymisé → DeepSeek (Chine)
//
// ============================================================================

const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions';

interface MistralMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface MistralResponse {
  choices: {
    message: {
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * Appelle l'API Mistral avec les paramètres optimisés pour l'anonymisation.
 * 
 * @param messages - Messages de la conversation
 * @returns Le contenu de la réponse + tokens utilisés
 */
export async function callMistral(
  messages: MistralMessage[]
): Promise<{ content: string; tokensUsed: number }> {
  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) {
    throw new Error('MISTRAL_API_KEY manquante dans les variables d\'environnement');
  }

  const response = await fetch(MISTRAL_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'mistral-small-latest',
      messages,
      temperature: 0.1,      // Très bas — on veut de la précision, pas de créativité
      max_tokens: 8000,       // Un CV anonymisé fait ~3-5K tokens
      top_p: 0.95,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Mistral API error (${response.status}): ${error}`);
  }

  const data = (await response.json()) as MistralResponse;

  const content = data.choices[0]?.message?.content;
  if (!content) {
    throw new Error('Mistral a retourné une réponse vide');
  }

  return {
    content,
    tokensUsed: data.usage.total_tokens,
  };
}
