'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export default function NewCVAnalysisPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files?.[0]) {
      handleFile(files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      alert('Format non supporté. Utilisez PDF ou Word.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('Fichier trop volumineux (max 10MB).');
      return;
    }
    setFile(file);
  };

  const handleAnalyze = async () => {
    if (!file) return;

    setUploading(true);
    setProgress(0);

    try {
      // Simulate upload + analysis steps
      const steps = [
        { label: 'Upload du fichier...', progress: 10 },
        { label: 'Extraction du texte...', progress: 25 },
        { label: 'Anonymisation RGPD...', progress: 40 },
        { label: 'Analyse IA en cours...', progress: 70 },
        { label: 'Génération du rapport...', progress: 90 },
        { label: 'Terminé !', progress: 100 },
      ];

      for (const step of steps) {
        setCurrentStep(step.label);
        setProgress(step.progress);
        await new Promise(r => setTimeout(r, 1500));
      }

      setAnalyzing(false);
      // TODO: Navigate to analysis result
      router.push('/hub/cv-coach/mock-analysis-id');
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
      setUploading(false);
      setAnalyzing(false);
    }
  };

  if (uploading) {
    return (
      <div className="max-w-xl mx-auto py-12">
        <div className="card text-center py-12">
          {/* Orb Animation */}
          <div className="orb-container mx-auto mb-8">
            <div className="orb-core" />
            <div className="orb-ring" />
            <div className="orb-ring orb-ring-2" />
          </div>

          <h2 className="text-xl font-semibold mb-2">{currentStep}</h2>
          
          <div className="progress max-w-sm mx-auto mb-4">
            <div
              className="progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <p className="text-sm text-muted">{progress}%</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analyser un CV</h1>
        <p className="text-secondary mt-1">
          Uploadez votre CV pour recevoir une analyse IA détaillée
        </p>
      </div>

      {/* Dropzone */}
      <div
        className={`
          card border-2 border-dashed text-center py-12 cursor-pointer
          transition-colors duration-200
          ${dragActive ? 'border-primary bg-primary-light' : 'border-subtle hover:border-primary/50'}
          ${file ? 'border-success bg-success/10' : ''}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <input
          id="file-input"
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />

        {file ? (
          <>
            <div className="text-5xl mb-4">✅</div>
            <p className="font-semibold">{file.name}</p>
            <p className="text-sm text-muted mt-1">
              {(file.size / 1024).toFixed(1)} KB
            </p>
            <button
              className="text-sm text-primary mt-4 hover:underline"
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
              }}
            >
              Changer de fichier
            </button>
          </>
        ) : (
          <>
            <div className="text-5xl mb-4">📄</div>
            <p className="font-semibold mb-2">
              Glissez-déposez votre CV ici
            </p>
            <p className="text-sm text-muted">
              ou cliquez pour sélectionner (PDF, Word)
            </p>
          </>
        )}
      </div>

      {/* Info */}
      <div className="card bg-primary-light border-primary/20">
        <h3 className="font-semibold mb-2 flex items-center gap-2">
          <span>🔒</span> RGPD & Confidentialité
        </h3>
        <p className="text-sm text-secondary">
          Vos données personnelles sont automatiquement anonymisées avant l'analyse IA.
          Aucune donnée sensible ne quitte l'Union Européenne.
        </p>
      </div>

      {/* Analyze Button */}
      <button
        className="btn btn-primary btn-lg w-full"
        disabled={!file}
        onClick={handleAnalyze}
      >
        Analyser mon CV
      </button>
    </div>
  );
}
