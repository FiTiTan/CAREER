export async function analyzeCV(anonymizedText: string): Promise<{
  score_global: number
  scores: {
    technique: number
    experience: number
    impact: number
    lisibilite: number
  }
  diagnostic: {
    metier: string
    secteur: string
    niveau: string
    experience: string
  }
  forces: string[]
  faiblesses: string[]
  recommandations: string[]
}> {
  const apiKey = process.env.DEEPSEEK_API_KEY

  if (!apiKey) {
    throw new Error('DeepSeek API key not configured')
  }

  const prompt = `Tu es un expert RH et coach carrière. Analyse ce CV anonymisé et retourne un diagnostic complet.

**Retourne UNIQUEMENT un JSON valide** (pas de markdown, pas d'explication) :

{
  "score_global": <nombre entre 0-100>,
  "scores": {
    "technique": <0-100>,
    "experience": <0-100>,
    "impact": <0-100>,
    "lisibilite": <0-100>
  },
  "diagnostic": {
    "metier": "<titre du poste>",
    "secteur": "<secteur d'activité>",
    "niveau": "<Junior/Confirmé/Senior/Expert>",
    "experience": "<nombre> ans"
  },
  "forces": ["<point fort 1>", "<point fort 2>"],
  "faiblesses": ["<point faible 1>", "<point faible 2>"],
  "recommandations": ["<recommandation 1>", "<recommandation 2>", "<recommandation 3>", "<recommandation 4>"]
}

**Critères de scoring :**
- **Technique** : Compétences listées, diversité, pertinence pour le poste
- **Expérience** : Durée, progression, responsabilités
- **Impact** : Résultats quantifiés, réalisations concrètes
- **Lisibilité** : Structure, clarté, absence de fautes

**CV à analyser :**
${anonymizedText}

**JSON :**`

  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        max_tokens: 1500
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('DeepSeek API error:', response.status, errorText)
      throw new Error(`DeepSeek API error: ${response.status}`)
    }

    const data = await response.json()
    const content = data.choices[0].message.content.trim()

    // Clean markdown if present
    const jsonContent = content
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim()

    const result = JSON.parse(jsonContent)
    return result

  } catch (error) {
    console.error('Analysis error:', error)
    throw new Error('Failed to analyze CV')
  }
}
