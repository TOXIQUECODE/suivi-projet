import { useState } from 'react';
import { Calendar as CalendarIcon, CalendarDays, Check, Loader2 } from 'lucide-react';
import { Expense } from './FinanceView';
import { useGoogleLogin } from '@react-oauth/google';

interface CalendarSyncProps {
  expenses: Expense[];
}

export default function CalendarSync({ expenses }: CalendarSyncProps) {
  const [syncing, setSyncing] = useState(false);
  const [synced, setSynced] = useState(false);

  // On trie les dépenses chronologiquement
  const sortedExpenses = [...expenses].sort((a, b) => 
    new Date(a.date_expense).getTime() - new Date(b.date_expense).getTime()
  );

  // Fonction qui pousse les données vers l'API Google
  const syncToGoogleCalendar = async (accessToken: string) => {
    setSyncing(true);
    try {
      for (const exp of sortedExpenses) {
        // Formatage pour un événement sur "Toute la journée"
        const startDate = new Date(exp.date_expense);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 1); // Google exige que la fin soit le jour d'après
        
        const event = {
          summary: `💳 Dépense : ${exp.title}`,
          description: `Montant : ${exp.amount} $\nPriorité : ${exp.priority}\n\nAjouté automatiquement depuis l'application Suivi-Projet.`,
          start: { date: startDate.toISOString().split('T')[0] },
          end: { date: endDate.toISOString().split('T')[0] },
        };

        // Requête officielle vers Google Calendar API
        await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(event),
        });
      }
      
      setSynced(true);
      setTimeout(() => setSynced(false), 3000); // Remet le bouton normal après 3s
    } catch (error) {
      console.error('Erreur API Google:', error);
      alert("Erreur lors de la synchronisation avec Google Agenda.");
    } finally {
      setSyncing(false);
    }
  };

  // Déclenche la popup de connexion sécurisée Google
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => syncToGoogleCalendar(tokenResponse.access_token),
    scope: 'https://www.googleapis.com/auth/calendar.events', // Demande l'autorisation d'écrire des événements
    onError: () => alert('La connexion à Google a échoué.')
  });

  return (
    <div className="liquid-glass" style={{ padding: '20px', borderRadius: '24px' }}>
      
      {/* En-tête de la section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3 style={{ margin: 0, fontSize: '18px', color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CalendarDays size={20} />
          Agenda des paiements
        </h3>
        
        {/* Bouton de synchronisation intelligent */}
        <button 
          onClick={() => handleGoogleLogin()} 
          disabled={syncing || sortedExpenses.length === 0}
          style={{ 
            background: synced ? 'rgba(48, 209, 88, 0.2)' : 'rgba(255,255,255,0.1)', 
            border: `1px solid ${synced ? '#30d158' : 'rgba(255,255,255,0.2)'}`, 
            color: synced ? '#30d158' : 'white', 
            padding: '8px 12px', 
            borderRadius: '12px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '5px', 
            cursor: (syncing || sortedExpenses.length === 0) ? 'not-allowed' : 'pointer', 
            fontSize: '12px', 
            transition: 'all 0.3s' 
          }}
        >
          {syncing ? <Loader2 size={14} className="animate-spin" /> : synced ? <Check size={14} /> : <CalendarIcon size={14} />}
          {syncing ? 'Envoi...' : synced ? 'Synchronisé' : 'Sync Google'}
        </button>
      </div>

      {/* Liste chronologique des paiements */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {sortedExpenses.length > 0 ? sortedExpenses.map(exp => {
          const dateObj = new Date(exp.date_expense);
          dateObj.setDate(dateObj.getDate() + 1); 
          const day = dateObj.toLocaleDateString('fr-FR', { day: '2-digit' });
          const month = dateObj.toLocaleDateString('fr-FR', { month: 'short' });

          return (
            <div key={exp.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', borderLeft: `4px solid ${exp.priority === 'Haute' ? '#ff453a' : exp.priority === 'Basse' ? '#30d158' : '#ffd60a'}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: 'rgba(255,255,255,0.1)', color: 'white', padding: '6px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', textAlign: 'center', minWidth: '40px' }}>
                  <div style={{ fontSize: '14px' }}>{day}</div>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>{month}</div>
                </div>
                <span style={{ fontSize: '14px', fontWeight: '500' }}>{exp.title}</span>
              </div>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: 'rgba(255,255,255,0.8)' }}>
                {exp.amount} $
              </span>
            </div>
          );
        }) : (
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '14px', margin: '20px 0' }}>
            Aucun paiement prévu.
          </p>
        )}
      </div>
    </div>
  );
}