import { useState } from 'react';
import { Wallet, CheckSquare, FolderGit2 } from 'lucide-react';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('finance');

  return (
    <div className="app-container">
      {/* Zone d'affichage dynamique en fonction de l'onglet actif */}
      <main style={{ padding: '20px' }}>
        {activeTab === 'finance' && <h2>💰 Module Finance</h2>}
        {activeTab === 'todo' && <h2>✅ To-Do List</h2>}
        {activeTab === 'projet' && <h2>🚀 Projets à suivre</h2>}
      </main>

      {/* Barre de navigation Liquid Glass */}
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