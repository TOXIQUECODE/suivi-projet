import React, { useState } from 'react';
import { Lock } from 'lucide-react';

interface LoginScreenProps {
  onSuccess: () => void;
}

export default function LoginScreen({ onSuccess }: LoginScreenProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  // 🔒 TON CODE SECRET (Change-le par ce que tu veux)
  const SECRET_CODE = "150811"; 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (code === SECRET_CODE) {
      setError(false);
      onSuccess(); // Déverrouille l'application
    } else {
      setError(true);
      setCode(''); // Efface le champ
      // Retire le message d'erreur après 2 secondes
      setTimeout(() => setError(false), 2000); 
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
      
      <div className="liquid-glass" style={{ padding: '40px 30px', borderRadius: '32px', width: '100%', maxWidth: '340px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', backdropFilter: 'blur(25px)' }}>
        
        {/* Icône de cadenas animée/stylisée */}
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '50%', marginBottom: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <Lock size={40} color={error ? '#ff453a' : 'var(--accent-color)'} style={{ transition: 'color 0.3s' }} />
        </div>
        
        <h1 style={{ margin: '0 0 10px 0', fontSize: '24px', fontWeight: '600', letterSpacing: '1px' }}>Verrouillé</h1>
        <p style={{ margin: '0 0 30px 0', fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>Entrez votre code d'accès personnel</p>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <input 
            type="password" 
            inputMode="numeric"
            maxLength={4}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="glass-input"
            style={{ 
              textAlign: 'center', 
              fontSize: '32px', 
              letterSpacing: '15px', 
              padding: '15px',
              borderRadius: '16px',
              borderColor: error ? '#ff453a' : 'rgba(255,255,255,0.2)',
              transition: 'border-color 0.3s ease'
            }}
            placeholder="••••"
            autoFocus
          />
          
          {/* Espace réservé pour le message d'erreur pour éviter que le bouton saute */}
          <div style={{ height: '20px', marginTop: '10px' }}>
            {error && <span style={{ color: '#ff453a', fontSize: '13px', fontWeight: '500' }}>Code incorrect</span>}
          </div>
          
          <button type="submit" className="glass-button" style={{ marginTop: '15px' }}>
            Déverrouiller
          </button>
        </form>
      </div>
      
    </div>
  );
}