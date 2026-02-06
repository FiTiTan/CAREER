import CVUploader from '@/components/cv/CVUploader'

export default function NewCVPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '2rem',
      backgroundColor: '#FAFAFA'
    }}>
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Analysez votre CV
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#6B7280' }}>
            Obtenez un diagnostic complet en 30 secondes
          </p>
        </div>

        <CVUploader />

        <div style={{ 
          marginTop: '2rem', 
          display: 'flex', 
          gap: '1.5rem', 
          justifyContent: 'center',
          fontSize: '0.875rem',
          color: '#9CA3AF'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <svg style={{ width: '16px', height: '16px', color: '#10B981' }} viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>100% gratuit</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <svg style={{ width: '16px', height: '16px', color: '#10B981' }} viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>Sans inscription</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <svg style={{ width: '16px', height: '16px', color: '#10B981' }} viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>RGPD compliant</span>
          </div>
        </div>
      </div>
    </div>
  )
}
