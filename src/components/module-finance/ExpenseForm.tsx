import { useState } from 'react';
import { PlusCircle } from 'lucide-react';

// Typage des données du formulaire
interface FormData {
  title: string;
  amount: string;
  date: string;
  priority: string;
}

export default function ExpenseForm() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    amount: '',
    date: '',
    priority: 'Normale' // Basse, Normale, Haute
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nouvelle entrée à sauvegarder :', formData);
    // Ici on connectera plus tard la base de données
    
    // Reset du formulaire après soumission
    setFormData({ title: '', amount: '', date: '', priority: 'Normale' });
  };

  return (
    <div className="liquid-glass" style={{ padding: '24px', borderRadius: '24px' }}>
      <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 0, marginBottom: '20px' }}>
        <PlusCircle color="var(--accent-color)" /> 
        Ajouter une dépense
      </h2>

      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          className="glass-input" 
          placeholder="Quoi / À qui payer ?" 
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
        />

        <input 
          type="number" 
          className="glass-input" 
          placeholder="Montant ($)" 
          step="0.01"
          value={formData.amount}
          onChange={(e) => setFormData({...formData, amount: e.target.value})}
          required
        />

        <input 
          type="date" 
          className="glass-input" 
          value={formData.date}
          onChange={(e) => setFormData({...formData, date: e.target.value})}
          required
        />

        <select 
          className="glass-input" 
          value={formData.priority}
          onChange={(e) => setFormData({...formData, priority: e.target.value})}
        >
          <option value="Basse" style={{ color: 'black' }}>Priorité : Basse</option>
          <option value="Normale" style={{ color: 'black' }}>Priorité : Normale</option>
          <option value="Haute" style={{ color: 'black' }}>Priorité : Haute</option>
        </select>

        <button type="submit" className="glass-button">
          Valider l'entrée
        </button>
      </form>
    </div>
  );
}