export async function anonymizeCV(rawText: string): Promise<{
  anonymizedText: string
  anonymizationMap: Record<string, string>
}> {
  const apiKey = process.env.MISTRAL_API_KEY

  if (!apiKey || apiKey === 'pending') {
    throw new Error('Mistral API key not configured')
  }

  const prompt = `Tu es un assistant qui anonymise les CVs pour respecter le RGPD.

Remplace toutes les données personnelles par des tokens :
- Noms de personnes → [P1], [P2], etc.
- Emails → [E1], [E2], etc.
- Téléphones → [T1], [T2], etc.
- Adresses → [A1], [A2], etc.
- Noms d'entreprises → [ENT1], [ENT2], etc.

Retourne le texte anonymisé UNIQUEMENT (pas de markdown, pas d'explication).

Texte original :
${rawText}

Texte anonymisé :`

  try {
    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'mistral-small-latest',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.1,
        max_tokens: 2000
      })
    })

    if (!response.ok) {
      throw new Error(`Mistral API error: ${response.status}`)
    }

    const data = await response.json()
    const anonymizedText = data.choices[0].message.content.trim()

    // Extract mapping (simple regex for tokens)
    const anonymizationMap: Record<string, string> = {}
    
    // For now, return placeholder map (we'll improve this later)
    // In production, you'd need to track the actual replacements

    return {
      anonymizedText,
      anonymizationMap
    }
  } catch (error) {
    console.error('Anonymization error:', error)
    throw new Error('Failed to anonymize CV')
  }
}
