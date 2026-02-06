// ============================================================================
// CareerCare — Client DeepSeek V3 (Analyse CV)
// ============================================================================
//
// DeepSeek V3 est utilisé pour l'analyse approfondie du CV.
// Il reçoit UNIQUEMENT du texte anonymisé (aucune donnée personnelle).
//
// L'API DeepSeek est compatible OpenAI, donc même format de requête.
//
// ============================================================================

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

interface DeepSeekMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface DeepSeekResponse {
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
 * Appelle l'API DeepSeek V3 pour l'analyse de CV anonymisé.
 * 
 * @param messages - Messages de la conversation (system + user)
 * @returns Le contenu JSON de la réponse + tokens utilisés
 */
export async function callDeepSeek(
  messages: DeepSeekMessage[]
): Promise<{ content: string; tokensUsed: number }> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    throw new Error('DEEPSEEK_API_KEY manquante dans les variables d\'environnement');
  }

  const response = await fetch(DEEPSEEK_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages,
      temperature: 0.3,       // Un peu de flexibilité pour les recommandations
      max_tokens: 6000,        // Réponse structurée complète
      top_p: 0.9,
      response_format: { type: 'json_object' },  // Force la sortie JSON
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`DeepSeek API error (${response.status}): ${error}`);
  }

  const data = (await response.json()) as DeepSeekResponse;

  const content = data.choices[0]?.message?.content;
  if (!content) {
    throw new Error('DeepSeek a retourné une réponse vide');
  }

  return {
    content,
    tokensUsed: data.usage.total_tokens,
  };
}
