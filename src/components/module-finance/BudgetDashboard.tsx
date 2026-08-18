import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Expense } from './FinanceView';

interface BudgetDashboardProps {
  expenses: Expense[];
}

export default function BudgetDashboard({ expenses }: BudgetDashboardProps) {
  // Calcul du total de toutes les dépenses
  const total = expenses.reduce((acc, curr) => acc + Number(curr.amount), 0);

  // Groupement des données pour le graphique circulaire par Priorité
  const data = [
    { name: 'Haute (Urgente)', value: expenses.filter(e => e.priority === 'Haute').reduce((acc, curr) => acc + Number(curr.amount), 0), color: '#ff453a' }, // Rouge
    { name: 'Normale', value: expenses.filter(e => e.priority === 'Normale').reduce((acc, curr) => acc + Number(curr.amount), 0), color: '#0a84ff' }, // Bleu
    { name: 'Basse', value: expenses.filter(e => e.priority === 'Basse').reduce((acc, curr) => acc + Number(curr.amount), 0), color: '#30d158' }, // Vert
  ].filter(item => item.value > 0); // On cache les parts à 0$

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* --- CARTE : DIAGRAMME DU MOIS --- */}
      <div className="liquid-glass" style={{ padding: '20px', borderRadius: '24px' }}>
        <h3 style={{ margin: '0 0 5px 0', fontSize: '18px', color: 'rgba(255,255,255,0.7)' }}>
          Dépenses du mois
        </h3>
        <p style={{ margin: '0 0 20px 0', fontSize: '24px', fontWeight: 'bold' }}>{total.toFixed(2)} $</p>
        
        {total > 0 ? (
          <div style={{ height: '220px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(30, 30, 30, 0.8)', 
                    borderRadius: '12px', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    color: 'white'
                  }}
                  itemStyle={{ color: 'white' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', padding: '40px 0' }}>Aucune dépense pour l'instant.</p>
        )}

        {/* Légende */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginTop: '10px' }}>
          {data.map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: item.color }}></div>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}