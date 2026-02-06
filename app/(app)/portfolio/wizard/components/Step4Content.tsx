'use client';

// ============================================================
// Step 4 : Contenu (Réalisations & Projets)
// ============================================================

import { useState } from 'react';
import type { PortfolioFormData, Project } from '@/lib/portfolio/types';

interface Step4Props {
  formData: PortfolioFormData;
  updateFormData: (updates: Partial<PortfolioFormData>) => void;
}

export default function Step4Content({ formData, updateFormData }: Step4Props) {
  const [showAddProject, setShowAddProject] = useState(false);

  const addProject = () => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      title: '',
      description: '',
      category: '',
    };
    updateFormData({ projects: [...formData.projects, newProject] });
    setShowAddProject(false);
  };

  const updateProject = (index: number, updates: Partial<Project>) => {
    const newProjects = [...formData.projects];
    newProjects[index] = { ...newProjects[index], ...updates };
    updateFormData({ projects: newProjects });
  };

  const removeProject = (index: number) => {
    const newProjects = formData.projects.filter((_, i) => i !== index);
    updateFormData({ projects: newProjects });
  };

  return (
    <div className="space-y-6">
      <div className="bg-bg-tertiary rounded-lg p-4 border border-[var(--border-light)]">
        <p className="text-sm text-text-secondary">
          Cette étape est optionnelle. Vous pouvez ajouter vos réalisations, projets ou produits pour enrichir votre portfolio.
        </p>
      </div>

      {/* Liste des projets */}
      {formData.projects.length > 0 && (
        <div className="space-y-4">
          {formData.projects.map((project, index) => (
            <div
              key={project.id || index}
              className="bg-bg-tertiary rounded-lg p-6 border border-[var(--border-light)] space-y-4"
            >
              <div className="flex items-start justify-between">
                <h4 className="font-semibold text-text-primary">Projet {index + 1}</h4>
                <button
                  onClick={() => removeProject(index)}
                  className="text-text-tertiary hover:text-error transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              <input
                type="text"
                value={project.title}
                onChange={(e) => updateProject(index, { title: e.target.value })}
                placeholder="Titre du projet"
                className="w-full px-4 py-3 bg-bg-secondary border border-[var(--border-light)] rounded-lg text-text-primary placeholder:text-text-muted focus:border-[var(--accent-teal)] focus:outline-none transition-colors"
              />

              <textarea
                value={project.description || ''}
                onChange={(e) => updateProject(index, { description: e.target.value })}
                placeholder="Description du projet"
                rows={3}
                className="w-full px-4 py-3 bg-bg-secondary border border-[var(--border-light)] rounded-lg text-text-primary placeholder:text-text-muted focus:border-[var(--accent-teal)] focus:outline-none transition-colors resize-none"
              />

              <input
                type="text"
                value={project.category || ''}
                onChange={(e) => updateProject(index, { category: e.target.value })}
                placeholder="Catégorie (ex: Web, Design, Marketing...)"
                className="w-full px-4 py-3 bg-bg-secondary border border-[var(--border-light)] rounded-lg text-text-primary placeholder:text-text-muted focus:border-[var(--accent-teal)] focus:outline-none transition-colors"
              />
            </div>
          ))}
        </div>
      )}

      {/* Bouton ajouter */}
      {!showAddProject ? (
        <button
          onClick={() => setShowAddProject(true)}
          className="w-full py-4 border-2 border-dashed border-[var(--border-default)] rounded-lg text-text-tertiary hover:text-[var(--accent-teal)] hover:border-[var(--accent-teal)] transition-all"
        >
          + Ajouter un projet
        </button>
      ) : (
        <div className="flex gap-3">
          <button
            onClick={addProject}
            className="flex-1 py-3 bg-[var(--accent-teal)] text-white rounded-lg font-medium hover:bg-[var(--accent-teal-light)] transition-colors"
          >
            Créer le projet
          </button>
          <button
            onClick={() => setShowAddProject(false)}
            className="px-6 py-3 text-text-tertiary hover:text-text-primary transition-colors"
          >
            Annuler
          </button>
        </div>
      )}
    </div>
  );
}
