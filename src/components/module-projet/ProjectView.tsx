import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2, Activity, Minus, Plus } from 'lucide-react';
import { supabase } from '../../supabaseClient';

export interface Project {
  id: number;
  name: string;
  status: string;
  progress: number;
  color: string;
  created_at?: string;
}

export default function ProjectView() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // États pour le formulaire
  const [newName, setNewName] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [newColor, setNewColor] = useState('#0a84ff');

  useEffect(() => {
    fetchProjects();
  }, []);

  // 1. LIRE LES PROJETS
  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erreur lors du chargement des projets :', error);
    } else {
      setProjects((data as Project[]) || []);
    }
    setLoading(false);
  };

  // 2. AJOUTER UN PROJET
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newStatus.trim()) return;

    const { data, error } = await supabase
      .from('projects')
      .insert([{ name: newName, status: newStatus, progress: 0, color: newColor }])
      .select();

    if (error) {
      console.error("Erreur lors de l'ajout :", error);
    } else if (data && data.length > 0) {
      setProjects([data[0] as Project, ...projects]);
      setNewName('');
      setNewStatus('');
    }
  };

  // 3. MODIFIER LA PROGRESSION
  const updateProgress = async (id: number, currentProgress: number, change: number) => {
    const newProgress = Math.min(Math.max(currentProgress + change, 0), 100);
    if (newProgress === currentProgress) return;

    setProjects(projects.map(p => p.id === id ? { ...p, progress: newProgress } : p));

    const { error } = await supabase
      .from('projects')
      .update({ progress: newProgress })
      .eq('id', id);

    if (error) {
      console.error('Erreur lors de la mise à jour :', error);
      fetchProjects();
    }
  };

  // 4. SUPPRIMER UN PROJET
  const deleteProject = async (id: number) => {
    const isConfirmed = window.confirm("Veux-tu vraiment supprimer ce projet ?");
    if (!isConfirmed) return;

    setProjects(projects.filter(p => p.id !== id));
    const { error } = await supabase.from('projects').delete().eq('id', id);

    if (error) console.error('Erreur suppression :', error);
  };

  if (loading) {
    return <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>Chargement des projets...</p>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* FORMULAIRE D'AJOUT */}
      <div className="liquid-glass" style={{ padding: '24px', borderRadius: '24px' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 0, marginBottom: '20px', fontSize: '20px' }}>
          <PlusCircle color="var(--accent-color)" /> 
          Nouveau Projet
        </h2>
        
        <form onSubmit={handleAddProject} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input 
            type="text" 
            className="glass-input" 
            placeholder="Nom du projet" 
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
            style={{ marginBottom: '0' }}
          />
          <input 
            type="text" 
            className="glass-input" 
            placeholder="Statut (ex: En développement)" 
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            required
            style={{ marginBottom: '0' }}
          />
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
            <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>Couleur :</span>
            {['#0a84ff', '#30d158', '#ff9f0a', '#ff453a', '#bf5af2'].map(color => (
              <div 
                key={color}
                onClick={() => setNewColor(color)}
                style={{
                  width: '24px', height: '24px', borderRadius: '50%', backgroundColor: color,
                  cursor: 'pointer', border: newColor === color ? '2px solid white' : '2px solid transparent',
                  boxShadow: newColor === color ? `0 0 10px ${color}` : 'none', transition: 'all 0.2s'
                }}
              />
            ))}
          </div>

          <button type="submit" className="glass-button" style={{ marginTop: '10px' }}>
            Créer le projet
          </button>
        </form>
      </div>

      {/* LISTE DES PROJETS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {projects.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', padding: '20px' }}>Aucun projet en cours.</p>
        ) : projects.map(project => (
          <div key={project.id} className="liquid-glass" style={{ padding: '20px', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', color: project.color }}>
                  <Activity size={20} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>{project.name}</h3>
                  <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{project.status}</p>
                </div>
              </div>
              <button 
                onClick={() => deleteProject(project.id)}
                style={{ background: 'none', border: 'none', color: '#ff453a', cursor: 'pointer', padding: '5px' }}
              >
                <Trash2 size={18} />
              </button>
            </div>

            {/* Barre de progression avec contrôles */}
            <div style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>Progression</span>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button onClick={() => updateProgress(project.id, project.progress, -10)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <Minus size={14} />
                  </button>
                  <span style={{ fontSize: '14px', fontWeight: 'bold', minWidth: '40px', textAlign: 'center' }}>
                    {project.progress}%
                  </span>
                  <button onClick={() => updateProgress(project.id, project.progress, 10)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <Plus size={14} />
                  </button>
                </div>
              </div>
              
              <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                <div 
                  style={{ 
                    width: `${project.progress}%`, 
                    height: '100%', 
                    backgroundColor: project.color,
                    borderRadius: '4px',
                    transition: 'width 0.5s ease-in-out'
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