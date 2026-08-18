import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

// Données fictives pour le graphique (on les rendra dynamiques plus tard)
const data = [
  { name: 'Loyer & Factures', value: 850, color: '#0a84ff' }, // Bleu iOS
  { name: 'Épicerie', value: 300, color: '#30d158' },         // Vert iOS
  { name: 'Loisirs', value: 150, color: '#ff9f0a' },          // Orange iOS
  { name: 'Transport', value: 100, color: '#ff453a' },        // Rouge iOS
];

export default function BudgetDashboard() {
  // Calcul du total
  const total = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* --- CARTE : RÉSUMÉ DE LA SEMAINE --- */}
      <div className="liquid-glass" style={{ padding: '20px', borderRadius: '24px' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', color: 'rgba(255,255,255,0.7)' }}>
          Budget de la semaine
        </h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold' }}>320.00 $</p>
            <p style={{ margin: 0, fontSize: '14px', color: '#30d158' }}>Restant : 80.00 $</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: 0, fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>Limite</p>
            <p style={{ margin: 0, fontSize: '18px', fontWeight: '500' }}>400.00 $</p>
          </div>
        </div>
        
        {/* Petite barre de progression style Apple */}
        <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginTop: '15px', overflow: 'hidden' }}>
          <div style={{ width: '80%', height: '100%', background: 'linear-gradient(90deg, #0a84ff, #30d158)', borderRadius: '4px' }}></div>
        </div>
      </div>

      {/* --- CARTE : DIAGRAMME DU MOIS --- */}
      <div className="liquid-glass" style={{ padding: '20px', borderRadius: '24px' }}>
        <h3 style={{ margin: '0 0 5px 0', fontSize: '18px', color: 'rgba(255,255,255,0.7)' }}>
          Dépenses du mois
        </h3>
        <p style={{ margin: '0 0 20px 0', fontSize: '24px', fontWeight: 'bold' }}>{total} $</p>
        
        <div style={{ height: '220px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                stroke="none" /* Enlève la bordure moche autour des parts */
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

        {/* Légende du graphique */}
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