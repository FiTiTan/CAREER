// ============================================================
// API Route : /api/portfolio/generate
// Enrichissement IA via DeepSeek V3
// ============================================================

import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/portfolio/generate
 * Enrichit les données du portfolio via DeepSeek
 */
export async function POST(request: NextRequest) {
  try {
    const { systemPrompt, userPrompt, profileContext } = await request.json();

    // Validation
    if (!systemPrompt || !userPrompt || !profileContext) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Vérifier la clé API DeepSeek
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      console.error('[Portfolio Generate] DEEPSEEK_API_KEY not configured');
      return NextResponse.json(
        { error: 'API configuration error' },
        { status: 500 }
      );
    }

    // Appel à DeepSeek V3
    const deepseekResponse = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 3000,
        response_format: { type: 'json_object' },
      }),
    });

    if (!deepseekResponse.ok) {
      const errorText = await deepseekResponse.text();
      console.error('[Portfolio Generate] DeepSeek API error:', errorText);
      return NextResponse.json(
        { error: 'AI service unavailable' },
        { status: 503 }
      );
    }

    const deepseekData = await deepseekResponse.json();

    // Extraire le contenu JSON de la réponse
    const content = deepseekData.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content in DeepSeek response');
    }

    // Parser le JSON
    let enrichedData;
    try {
      enrichedData = JSON.parse(content);
    } catch (parseError) {
      console.error('[Portfolio Generate] Failed to parse JSON:', content);
      throw new Error('Invalid JSON from AI');
    }

    // Retourner les données enrichies
    return NextResponse.json({
      enrichedData,
      tokensUsed: deepseekData.usage?.total_tokens || 0,
      model: 'deepseek-chat',
    });
  } catch (error) {
    console.error('[Portfolio Generate] Error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
