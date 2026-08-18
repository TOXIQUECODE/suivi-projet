import { useState } from 'react';
import { Wallet, CheckSquare, FolderGit2 } from 'lucide-react';
import ExpenseForm from './components/module-finance/ExpenseForm';
import BudgetDashboard from './components/module-finance/BudgetDashboard';
import TaskView from './components/module-todo/TaskView';
import ProjectPlaceholder from './components/module-projet/ProjectPlaceholder'; // <-- Nouvel import
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('finance');

  return (
    <div className="app-container">
      <main style={{ padding: '20px' }}>
        
        {/* ONGLET FINANCE */}
        {activeTab === 'finance' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <BudgetDashboard />
            <ExpenseForm />
          </div>
        )}
        
        {/* ONGLET TO-DO */}
        {activeTab === 'todo' && (
          <TaskView />
        )}
        
        {/* ONGLET PROJET */}
        {activeTab === 'projet' && (
          <ProjectPlaceholder />
        )}

      </main>

      {/* BARRE DE NAVIGATION */}
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