import { useState } from 'react';
import { Wallet, CheckSquare, FolderGit2 } from 'lucide-react';
import ExpenseForm from './components/module-finance/ExpenseForm';
import BudgetDashboard from './components/module-finance/BudgetDashboard'; // <-- Ajout ici
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('finance');

  return (
    <div className="app-container">
      <main style={{ padding: '20px' }}>
        {activeTab === 'finance' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <BudgetDashboard /> {/* <-- Ajout ici */}
            <ExpenseForm />
          </div>
        )}
        {activeTab === 'todo' && <h2>✅ To-Do List</h2>}
        {activeTab === 'projet' && <h2>🚀 Projets à suivre</h2>}
      </main>

      {/* ... (La barre de navigation reste inchangée) ... */}
      <nav className="bottom-nav liquid-glass">
        <button 
          className={`nav-item ${activeTab === 'finance' ? 'active' : ''}`}
          onClick={() => setActiveTab('finance')}
        >
          <Wallet size={24} />
        </button>

        <button 
          className={`nav-item ${activeTab === 'todo' ? 'active' : ''}`}
          onClick={() => setActiveTab('todo')}
        >
          <CheckSquare size={24} />
        </button>

        <button 
          className={`nav-item ${activeTab === 'projet' ? 'active' : ''}`}
          onClick={() => setActiveTab('projet')}
        >
          <FolderGit2 size={24} />
        </button>
      </nav>
    </div>
  );
}

export default App;