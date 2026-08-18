import { Calendar as CalendarIcon, CalendarDays } from 'lucide-react';
import { Expense } from './FinanceView';

interface CalendarSyncProps {
  expenses: Expense[];
}

export default function CalendarSync({ expenses }: CalendarSyncProps) {
  // On trie les dépenses de la plus proche à la plus lointaine
  const sortedExpenses = [...expenses].sort((a, b) => 
    new Date(a.date_expense).getTime() - new Date(b.date_expense).getTime()
  );

  const handleGoogleSync = () => {
    // Ceci est un message temporaire en attendant de configurer l'API Google Cloud
    alert("Pour envoyer ces dates vers ton vrai Google Agenda, nous devrons configurer une clé 'Google API' (OAuth) dans un prochain temps !");
  };

  return (
    <div className="liquid-glass" style={{ padding: '20px', borderRadius: '24px' }}>
      
      {/* En-tête de l'agenda */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3 style={{ margin: 0, fontSize: '18px', color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CalendarDays size={20} />
          Agenda des paiements
        </h3>
        <button 
          onClick={handleGoogleSync} 
          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '8px 12px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', fontSize: '12px', transition: 'background 0.2s' }}
        >
          <CalendarIcon size={14} />
          Sync Google
        </button>
      </div>

      {/* Liste chronologique des paiements */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {sortedExpenses.length > 0 ? sortedExpenses.map(exp => {
          // Formatage de la date pour un affichage propre (ex: 15 Août)
          const dateObj = new Date(exp.date_expense);
          // On ajoute un jour pour corriger le décalage de fuseau horaire de Javascript
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