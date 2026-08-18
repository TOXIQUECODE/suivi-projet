import { useState, FormEvent } from 'react';
import { PlusCircle } from 'lucide-react';

interface ExpenseFormProps {
  onAddExpense: (title: string, amount: number, date: string, priority: string) => void;
}

export default function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState('Normale');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !amount || !date) return;
    
    // On convertit le montant en nombre (float) pour Supabase
    onAddExpense(title, parseFloat(amount), date, priority);
    
    // On vide le formulaire
    setTitle('');
    setAmount('');
    setDate('');
    setPriority('Normale');
  };

  return (
    <div className="liquid-glass" style={{ padding: '24px', borderRadius: '24px' }}>
      <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 0, marginBottom: '20px', fontSize: '20px' }}>
        <PlusCircle color="var(--accent-color)" /> 
        Ajouter une dépense
      </h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input 
          type="text" 
          className="glass-input" 
          placeholder="Quoi / À qui payer ?" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ marginBottom: '0' }}
        />

        <input 
          type="number" 
          className="glass-input" 
          placeholder="Montant ($)" 
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          style={{ marginBottom: '0' }}
        />

        <div style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="date" 
            className="glass-input" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            style={{ marginBottom: '0', flex: 1 }}
          />
          <select 
            className="glass-input" 
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={{ marginBottom: '0', flex: 1 }}
          >
            <option value="Basse" style={{ color: 'black' }}>Priorité : Basse</option>
            <option value="Normale" style={{ color: 'black' }}>Priorité : Normale</option>
            <option value="Haute" style={{ color: 'red' }}>Priorité : Haute</option>
          </select>
        </div>

        <button type="submit" className="glass-button" style={{ marginTop: '5px' }}>
          Valider l'entrée
        </button>
      </form>
    </div>
  );
}