import { useState, useEffect } from 'react';
import { Wallet, CheckSquare, FolderGit2 } from 'lucide-react';
import FinanceView from './components/module-finance/FinanceView';
import TaskView from './components/module-todo/TaskView';
import ProjectPlaceholder from './components/module-projet/ProjectPlaceholder';
import LoginScreen from './components/LoginScreen'; // <-- L'import du cadenas
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('finance');

  // Au chargement, on vérifie si l'utilisateur s'est déjà connecté dans cet onglet
  useEffect(() => {
    const authStatus = sessionStorage.getItem('isAppUnlocked');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Fonction appelée quand le code PIN est bon
  const handleUnlock = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('isAppUnlocked', 'true'); // Mémorise la connexion
  };

  // 🛑 SI PAS CONNECTÉ : On affiche uniquement l'écran de verrouillage
  if (!isAuthenticated) {
    return (
      <div className="app-container">
        <LoginScreen onSuccess={handleUnlock} />
      </div>
    );
  }

  // ✅ SI CONNECTÉ : On affiche l'application complète
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
          <ProjectPlaceholder />
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