import { FolderGit2, ChevronRight, Activity, Wrench } from 'lucide-react';

export default function ProjectPlaceholder() {
  // Liste de tes projets en cours avec un pourcentage d'avancement
  const projects = [
    { id: 1, name: 'Webapp Charlevoix', status: 'Base de données', progress: 85, color: '#0a84ff', icon: <Activity size={20} /> },
    { id: 2, name: 'Le Coin Vert x Snack', status: 'Effets visuels', progress: 60, color: '#30d158', icon: <Activity size={20} /> },
    { id: 3, name: 'Serveur Minecraft Homestead', status: 'En ligne', progress: 100, color: '#bf5af2', icon: <FolderGit2 size={20} /> },
    { id: 4, name: 'Maintenance Ford Fusion 2008 SE', status: 'Recherche de pièces', progress: 15, color: '#ff9f0a', icon: <Wrench size={20} /> },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* En-tête du module */}
      <div className="liquid-glass" style={{ padding: '24px', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FolderGit2 color="var(--accent-color)" />
            Projets Actifs
          </h2>
          <p style={{ margin: '5px 0 0 0', color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
            {projects.filter(p => p.progress < 100).length} projets en cours
          </p>
        </div>
      </div>

      {/* Liste des projets */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {projects.map(project => (
          <div key={project.id} className="liquid-glass" style={{ padding: '20px', borderRadius: '20px', cursor: 'pointer', transition: 'transform 0.2s', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', color: project.color }}>
                  {project.icon}
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>{project.name}</h3>
                  <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{project.status}</p>
                </div>
              </div>
              <ChevronRight color="rgba(255,255,255,0.3)" />
            </div>

            {/* Barre de progression */}
            <div style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>
                <span>Progression</span>
                <span>{project.progress}%</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                <div 
                  style={{ 
                    width: `${project.progress}%`, 
                    height: '100%', 
                    backgroundColor: project.color,
                    borderRadius: '3px',
                    transition: 'width 1s ease-in-out'
                  }} 
                />
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}