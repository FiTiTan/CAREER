import React, { useState } from 'react';
import { useTheme } from '../../../ThemeContext';
import { typography, borderRadius, transitions } from '../../../design-system';

interface AIGeneratorButtonProps {
  type: 'slogan' | 'difference';
  activity: string;
  expertises: string[];
  slogan?: string;
  onSelect: (value: string) => void;
}

export const AIGeneratorButton: React.FC<AIGeneratorButtonProps> = ({
  type,
  activity,
  expertises,
  slogan,
  onSelect,
}) => {
  const { theme } = useTheme();
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!activity.trim() || expertises.length === 0) {
      setError('Activité et expertises requises');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setShowModal(true);

    try {
      const prompt =
        type === 'slogan'
          ? `Génère 3 slogans courts et impactants pour un profil professionnel :
Activité : ${activity}
Expertises : ${expertises.join(', ')}

Retourne UNIQUEMENT un tableau JSON de 3 strings, sans markdown ni explications.`
          : `Génère 3 propositions de valeur différenciantes pour un profil professionnel :
Activité : ${activity}
Expertises : ${expertises.join(', ')}
Slogan actuel : ${slogan || 'aucun'}

Retourne UNIQUEMENT un tableau JSON de 3 strings, sans markdown ni explications.`;

      const result = await window.electron.groq.chat([{ role: 'user', content: prompt }], {
        temperature: 0.9,
        max_tokens: 500,
      });

      const content = result.content.trim();
      let parsed: string[];

      try {
        // Essayer de parser directement
        parsed = JSON.parse(content);
      } catch {
        // Sinon extraire le JSON du markdown
        const match = content.match(/\[[\s\S]*\]/);
        if (match) {
          parsed = JSON.parse(match[0]);
        } else {
          throw new Error('Format invalide');
        }
      }

      if (!Array.isArray(parsed) || parsed.length === 0) {
        throw new Error('Aucune suggestion générée');
      }

      setSuggestions(parsed);
    } catch (err: any) {
      console.error('[AIGeneratorButton] Error:', err);
      setError(err.message || 'Erreur génération');
      setSuggestions([]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelect = (suggestion: string) => {
    onSelect(suggestion);
    setShowModal(false);
    setSuggestions([]);
  };

  const buttonStyle: React.CSSProperties = {
    padding: '8px 12px',
    background: theme.surface,
    border: `1px solid ${theme.border}`,
    borderRadius: borderRadius.md,
    color: theme.textSecondary,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    transition: transitions.default,
    whiteSpace: 'nowrap',
  };

  const buttonHoverStyle: React.CSSProperties = {
    background: theme.surfaceHover,
    borderColor: theme.primary,
    color: theme.primary,
  };

  const modalOverlayStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  };

  const modalStyle: React.CSSProperties = {
    background: theme.background,
    borderRadius: borderRadius.lg,
    padding: '24px',
    maxWidth: '600px',
    width: '90%',
    maxHeight: '80vh',
    overflow: 'auto',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  };

  const suggestionStyle: React.CSSProperties = {
    padding: '12px',
    background: theme.surface,
    border: `1px solid ${theme.border}`,
    borderRadius: borderRadius.md,
    cursor: 'pointer',
    transition: transitions.default,
    marginBottom: '8px',
  };

  const suggestionHoverStyle: React.CSSProperties = {
    borderColor: theme.primary,
    background: theme.surfaceHover,
  };

  return (
    <>
      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        style={buttonStyle}
        onMouseEnter={(e) => Object.assign(e.currentTarget.style, buttonHoverStyle)}
        onMouseLeave={(e) => Object.assign(e.currentTarget.style, buttonStyle)}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12h14" />
        </svg>
        {isGenerating ? 'Génération...' : 'Générer'}
      </button>

      {showModal && (
        <div style={modalOverlayStyle} onClick={() => setShowModal(false)}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <h3
              style={{
                fontSize: typography.fontSize.lg,
                fontWeight: typography.fontWeight.semibold,
                color: theme.text,
                marginBottom: '16px',
              }}
            >
              {type === 'slogan' ? 'Suggestions de slogans' : 'Propositions de valeur'}
            </h3>

            {error && (
              <div
                style={{
                  padding: '12px',
                  background: theme.error + '20',
                  color: theme.error,
                  borderRadius: borderRadius.md,
                  marginBottom: '16px',
                  fontSize: typography.fontSize.sm,
                }}
              >
                {error}
              </div>
            )}

            {isGenerating && (
              <div style={{ textAlign: 'center', padding: '32px', color: theme.textSecondary }}>
                Génération en cours...
              </div>
            )}

            {!isGenerating && suggestions.length > 0 && (
              <div>
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    style={suggestionStyle}
                    onClick={() => handleSelect(suggestion)}
                    onMouseEnter={(e) => Object.assign(e.currentTarget.style, suggestionHoverStyle)}
                    onMouseLeave={(e) => Object.assign(e.currentTarget.style, suggestionStyle)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setShowModal(false)}
              style={{
                marginTop: '16px',
                padding: '8px 16px',
                background: theme.surface,
                border: `1px solid ${theme.border}`,
                borderRadius: borderRadius.md,
                color: theme.text,
                cursor: 'pointer',
                width: '100%',
              }}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </>
  );
};
