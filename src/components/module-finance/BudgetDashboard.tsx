import { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Expense } from './FinanceView';

interface BudgetDashboardProps {
  expenses: Expense[];
}

export default function BudgetDashboard({ expenses }: BudgetDashboardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const total = expenses.reduce((acc, curr) => acc + Number(curr.amount), 0);

  const data = [
    { name: 'Haute', value: expenses.filter(e => e.priority === 'Haute').reduce((acc, curr) => acc + Number(curr.amount), 0), color: '#ff453a' },
    { name: 'Normale', value: expenses.filter(e => e.priority === 'Normale').reduce((acc, curr) => acc + Number(curr.amount), 0), color: '#ffd60a' }, // Jaune pour normal selon ton image
    { name: 'Basse', value: expenses.filter(e => e.priority === 'Basse').reduce((acc, curr) => acc + Number(curr.amount), 0), color: '#30d158' },
  ].filter(item => item.value > 0);

  // Groupes pour le tableau détaillé
  const haute = expenses.filter(e => e.priority === 'Haute');
  const normale = expenses.filter(e => e.priority === 'Normale');
  const basse = expenses.filter(e => e.priority === 'Basse');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="liquid-glass" style={{ padding: '20px', borderRadius: '24px' }}>
        <h3 style={{ margin: '0 0 5px 0', fontSize: '18px', color: 'rgba(255,255,255,0.7)' }}>
          Budget de la semaine
        </h3>
        <p style={{ margin: '0 0 5px 0', fontSize: '28px', fontWeight: 'bold' }}>{total.toFixed(2)} $</p>
        <p style={{ margin: '0 0 20px 0', fontSize: '12px', color: 'var(--accent-color)', cursor: 'pointer' }} onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? "Masquer les détails ▲" : "Appuyez sur le graphique ou ici pour détailler ▼"}
        </p>
        
        {total > 0 ? (
          <div style={{ height: '220px', width: '100%', cursor: 'pointer' }} onClick={() => setShowDetails(!showDetails)}>
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
                  contentStyle={{ backgroundColor: 'rgba(30,30,30,0.9)', borderRadius: '12px', border: 'none', color: 'white' }}
                  itemStyle={{ color: 'white' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', padding: '40px 0' }}>Aucune dépense cette semaine.</p>
        )}

        {/* --- VUE DÉTAILLÉE STYLE "image_a02ca0.png" --- */}
        {showDetails && total > 0 && (
          <div style={{ marginTop: '20px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
            
            {/* SECTION HAUTE */}
            {haute.length > 0 && (
              <>
                <div style={{ backgroundColor: '#000000', padding: '10px', textAlign: 'center', color: '#ff453a', fontWeight: 'bold', fontSize: '14px', letterSpacing: '1px' }}>
                  HAUTE
                </div>
                {haute.map(e => (
                  <div key={e.id} style={{ backgroundColor: 'rgba(255,255,255,0.15)', padding: '12px 15px', borderBottom: '1px solid rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span>{e.title}</span>
                    <span style={{ fontWeight: '500' }}>{e.amount} $</span>
                  </div>
                ))}
              </>
            )}

            {/* SECTION NORMALE */}
            {normale.length > 0 && (
              <>
                <div style={{ backgroundColor: '#000000', padding: '10px', textAlign: 'center', color: '#ffd60a', fontWeight: 'bold', fontSize: '14px', letterSpacing: '1px' }}>
                  NORMAL
                </div>
                {normale.map(e => (
                  <div key={e.id} style={{ backgroundColor: 'rgba(255,255,255,0.15)', padding: '12px 15px', borderBottom: '1px solid rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span>{e.title}</span>
                    <span style={{ fontWeight: '500' }}>{e.amount} $</span>
                  </div>
                ))}
              </>
            )}

            {/* SECTION BASSE */}
            {basse.length > 0 && (
              <>
                <div style={{ backgroundColor: '#000000', padding: '10px', textAlign: 'center', color: '#30d158', fontWeight: 'bold', fontSize: '14px', letterSpacing: '1px' }}>
                  BAS
                </div>
                {basse.map(e => (
                  <div key={e.id} style={{ backgroundColor: 'rgba(255,255,255,0.15)', padding: '12px 15px', borderBottom: '1px solid rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span>{e.title}</span>
                    <span style={{ fontWeight: '500' }}>{e.amount} $</span>
                  </div>
                ))}
              </>
            )}

          </div>
        )}
      </div>
    </div>
  );
}