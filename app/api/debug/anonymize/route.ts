import { NextRequest, NextResponse } from 'next/server';
import { callMistral } from '@/lib/ai/mistral';

export const maxDuration = 10;

export async function GET(request: NextRequest) {
  try {
    const testText = "Jean Dupont, développeur senior chez TechCorp, email: jean@example.com";
    
    const response = await callMistral([
      { 
        role: 'system', 
        content: 'Anonymise le texte en remplaçant les données personnelles par des tokens. Retourne un JSON avec {anonymized_text, map}.'
      },
      { 
        role: 'user', 
        content: `Anonymise ce texte:\n\n${testText}`
      },
    ]);

    return NextResponse.json({
      success: true,
      response: response.content,
      tokensUsed: response.tokensUsed
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}
