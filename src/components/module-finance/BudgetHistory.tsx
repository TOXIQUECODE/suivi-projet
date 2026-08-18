import { Archive } from 'lucide-react';
import { Expense } from './FinanceView';

interface BudgetHistoryProps {
  archivedExpenses: Expense[];
}

export default function BudgetHistory({ archivedExpenses }: BudgetHistoryProps) {
  if (archivedExpenses.length === 0) {
    return (
      <div className="liquid-glass" style={{ padding: '20px', borderRadius: '24px', textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
        <Archive size={24} style={{ marginBottom: '10px', opacity: 0.5 }} />
        <p style={{ margin: 0 }}>Aucun historique pour le moment.</p>
      </div>
    );
  }

  return (
    <div className="liquid-glass" style={{ padding: '20px', borderRadius: '24px', opacity: 0.9 }}>
      <h3 style={{ margin: '0 0 15px 0', fontSize: '18px', color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Archive size={18} />
        Historique des budgets
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {archivedExpenses.map(expense => (
          <div 
            key={expense.id} 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.05)'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '15px' }}>{expense.title}</span>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
                {expense.date_expense} • Priorité: {expense.priority}
              </span>
            </div>
            <span style={{ fontWeight: 'bold', color: 'rgba(255,255,255,0.7)' }}>
              {expense.amount} $
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}