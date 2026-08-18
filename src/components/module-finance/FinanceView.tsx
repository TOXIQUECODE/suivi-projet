import { useState, useEffect } from 'react';
import BudgetDashboard from './BudgetDashboard';
import ExpenseForm from './ExpenseForm';
import { supabase } from '../../supabaseClient';

export interface Expense {
  id: number;
  title: string;
  amount: number;
  date_expense: string;
  priority: string;
}

export default function FinanceView() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  // Charger les dépenses au démarrage
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .order('date_expense', { ascending: false });

    if (error) {
      console.error('Erreur lors du chargement des dépenses :', error);
    } else {
      setExpenses((data as Expense[]) || []);
    }
    setLoading(false);
  };

  // Ajouter une dépense dans Supabase
  const handleAddExpense = async (title: string, amount: number, date: string, priority: string) => {
    const { data, error } = await supabase
      .from('expenses')
      .insert([{ title, amount, date_expense: date, priority }])
      .select();

    if (error) {
      console.error("Erreur lors de l'ajout de la dépense :", error);
    } else if (data && data.length > 0) {
      setExpenses([data[0] as Expense, ...expenses]); // Met à jour l'interface instantanément
    }
  };

  if (loading) {
    return <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>Chargement des finances...</p>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* On envoie les données au Dashboard pour le graphique */}
      <BudgetDashboard expenses={expenses} />
      
      {/* On envoie la fonction d'ajout au Formulaire */}
      <ExpenseForm onAddExpense={handleAddExpense} />
    </div>
  );
}