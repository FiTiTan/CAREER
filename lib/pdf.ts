export async function extractTextFromPDF(buffer: ArrayBuffer): Promise<string> {
  // TODO: Fix pdf-parse ESM/CommonJS compatibility
  // For now, return placeholder text for testing
  
  // Simulate extraction delay
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  return `Jean Dupont
Développeur Full-Stack Senior
8 ans d'expérience

Email: jean.dupont@email.com
Téléphone: +33 6 12 34 56 78

EXPÉRIENCE PROFESSIONNELLE

Senior Full-Stack Developer - TechCorp (2020-2024)
- Développement d'applications React/Node.js
- Architecture microservices
- Gestion équipe de 5 développeurs

Full-Stack Developer - StartupXYZ (2016-2020)
- Stack MERN (MongoDB, Express, React, Node)
- CI/CD avec GitLab
- 50+ features livrées

COMPÉTENCES
JavaScript, TypeScript, React, Node.js, PostgreSQL, Docker, AWS

FORMATION
Master Informatique - Université Paris-Saclay (2016)`
}
