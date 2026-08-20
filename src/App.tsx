import { useState, useEffect } from 'react';
import { Wallet, CheckSquare, FolderGit2 } from 'lucide-react';
import FinanceView from './components/module-finance/FinanceView';
import TaskView from './components/module-todo/TaskView';
import ProjectView from './components/module-projet/ProjectView'; // <-- On utilise le nouveau composant connecté
import LoginScreen from './components/LoginScreen';
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('finance');

  useEffect(() => {
    const authStatus = sessionStorage.getItem('isAppUnlocked');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleUnlock = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('isAppUnlocked', 'true');
  };

  // 🛑 ÉCRAN DE VERROUILLAGE
  if (!isAuthenticated) {
    return (
      <div className="app-container">
        <LoginScreen onSuccess={handleUnlock} />
      </div>
    );
  }

  // ✅ APPLICATION DÉVERROUILLÉE
  return (
    <div className="app-container">
      <main style={{ padding: '20px' }}>
        
        {activeTab === 'finance' && (
          <FinanceView />
        )}
        
        {activeTab === 'todo' && (
          <TaskView />
        )}
        
        {activeTab === 'projet' && (
          <ProjectView /> // <-- Le nouveau composant connecté s'affiche ici
        )}

      </main>

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