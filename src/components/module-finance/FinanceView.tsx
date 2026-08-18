import { useState, useEffect } from 'react';
import BudgetDashboard from './BudgetDashboard';
import ExpenseForm from './ExpenseForm';
import BudgetHistory from './BudgetHistory';
import { supabase } from '../../supabaseClient';
import { History, LayoutDashboard, SendToBack } from 'lucide-react';

export interface Expense {
  id: number;
  title: string;
  amount: number;
  date_expense: string;
  priority: string;
  is_archived: boolean;
}

export default function FinanceView() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState<'actuel' | 'historique'>('actuel');

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

  const handleAddExpense = async (title: string, amount: number, date: string, priority: string) => {
    const { data, error } = await supabase
      .from('expenses')
      .insert([{ title, amount, date_expense: date, priority, is_archived: false }])
      .select();

    if (error) {
      console.error("Erreur ajout :", error);
    } else if (data && data.length > 0) {
      setExpenses([data[0] as Expense, ...expenses]);
    }
  };

  // Fonction pour envoyer toute la semaine actuelle dans l'historique
  const handleArchiveWeek = async () => {
    const isConfirmed = window.confirm("Es-tu sûr de vouloir clôturer la semaine et envoyer ces données dans l'historique ?");
    if (!isConfirmed) return;

    // Met à jour la base de données : tout ce qui n'est pas archivé devient archivé
    const { error } = await supabase
      .from('expenses')
      .update({ is_archived: true })
      .eq('is_archived', false);

    if (error) {
      console.error("Erreur lors de l'archivage :", error);
    } else {
      // Recharge les données pour rafraîchir l'interface
      fetchExpenses();
      alert("Semaine clôturée avec succès ! Le template est de nouveau vierge.");
    }
  };

  if (loading) {
    return <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>Chargement des finances...</p>;
  }

  // Séparation des données
  const activeExpenses = expenses.filter(e => !e.is_archived);
  const archivedExpenses = expenses.filter(e => e.is_archived);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Sélecteur d'onglets (Actuel vs Historique) */}
      <div className="liquid-glass" style={{ display: 'flex', padding: '5px', borderRadius: '20px' }}>
        <button 
          onClick={() => setCurrentTab('actuel')}
          style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', borderRadius: '16px', border: 'none', background: currentTab === 'actuel' ? 'rgba(255,255,255,0.1)' : 'transparent', color: currentTab === 'actuel' ? 'white' : 'rgba(255,255,255,0.4)', fontWeight: currentTab === 'actuel' ? 'bold' : 'normal', cursor: 'pointer', transition: 'all 0.3s' }}
        >
          <LayoutDashboard size={18} /> Semaine
        </button>
        <button 
          onClick={() => setCurrentTab('historique')}
          style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', borderRadius: '16px', border: 'none', background: currentTab === 'historique' ? 'rgba(255,255,255,0.1)' : 'transparent', color: currentTab === 'historique' ? 'white' : 'rgba(255,255,255,0.4)', fontWeight: currentTab === 'historique' ? 'bold' : 'normal', cursor: 'pointer', transition: 'all 0.3s' }}
        >
          <History size={18} /> Historique
        </button>
      </div>

      {currentTab === 'actuel' ? (
        <>
          <BudgetDashboard expenses={activeExpenses} />
          <ExpenseForm onAddExpense={handleAddExpense} />
          
          {/* BOUTON POUR ARCHIVER LA SEMAINE */}
          {activeExpenses.length > 0 && (
            <button 
              onClick={handleArchiveWeek}
              className="glass-button" 
              style={{ background: 'rgba(255, 69, 58, 0.2)', color: '#ff453a', border: '1px solid rgba(255, 69, 58, 0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}
            >
              <SendToBack size={20} />
              Clôturer et Archiver la semaine
            </button>
          )}
        </>
      ) : (
        <BudgetHistory archivedExpenses={archivedExpenses} />
      )}

    </div>
  );
}