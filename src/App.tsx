import { useState } from 'react';
import { Wallet, CheckSquare, FolderGit2 } from 'lucide-react';
import FinanceView from './components/module-finance/FinanceView';
import TaskView from './components/module-todo/TaskView';
import ProjectPlaceholder from './components/module-projet/ProjectPlaceholder';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('finance');

  return (
    <div className="app-container">
      <main style={{ padding: '20px' }}>
        
        {/* ONGLET FINANCE */}
        {activeTab === 'finance' && (
          <FinanceView />
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