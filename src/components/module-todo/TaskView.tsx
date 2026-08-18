import { useState, useEffect } from 'react';
import { Circle } from 'lucide-react';
import TaskForm from './TaskForm';
import TaskHistory from './TaskHistory';
import { supabase } from '../../supabaseClient'; // Assure-toi que le chemin est bon

export interface Task {
  id: number;
  title: string;
  sphere: string;
  date_task: string; // Nom mis à jour pour correspondre au SQL
  completed: boolean;
}

export default function TaskView() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. CHARGER LES TÂCHES AU DÉMARRAGE (READ)
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erreur lors du chargement des tâches :', error);
    } else {
      setTasks(data || []);
    }
    setLoading(false);
  };

  // 2. AJOUTER UNE TÂCHE (CREATE)
  const handleAddTask = async (title: string, sphere: string, date: string) => {
    const { data, error } = await supabase
      .from('tasks')
      .insert([{ title, sphere, date_task: date, completed: false }])
      .select();

    if (error) {
      console.error("Erreur lors de l'ajout :", error);
    } else if (data) {
      setTasks([data[0], ...tasks]); // Met à jour l'UI instantanément
    }
  };

  // 3. COCHER / DÉCOCHER (UPDATE)
  const toggleTask = async (id: number, currentStatus: boolean) => {
    // Mise à jour optimiste (l'interface réagit avant même la réponse du serveur)
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !currentStatus } : task
    ));

    const { error } = await supabase
      .from('tasks')
      .update({ completed: !currentStatus })
      .eq('id', id);

    if (error) {
      console.error('Erreur lors de la mise à jour :', error);
      // En cas d'erreur, on recharge la liste pour corriger l'UI
      fetchTasks();
    }
  };

  // 4. SUPPRIMER (DELETE)
  const deleteTask = async (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));

    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erreur lors de la suppression :', error);
      fetchTasks();
    }
  };

  // Séparation pour l'affichage
  const activeTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  if (loading) {
    return <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>Chargement des données...</p>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <TaskForm onAddTask={handleAddTask} />

      <div className="liquid-glass" style={{ padding: '20px', borderRadius: '24px' }}>
        <h3 style={{ margin: '0 0 15px 0', fontSize: '18px', color: 'rgba(255,255,255,0.7)' }}>
          À faire ({activeTasks.length})
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {activeTasks.map(task => (
            <div 
              key={task.id} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: '12px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.1)',
                cursor: 'pointer'
              }}
              onClick={() => toggleTask(task.id, task.completed)}
            >
              <Circle color="rgba(255,255,255,0.5)" size={24} style={{ marginRight: '12px' }} />
              
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '16px', fontWeight: '500' }}>{task.title}</span>
                <span style={{ fontSize: '12px', color: 'var(--accent-color)' }}>
                  {task.sphere} • {task.date_task}
                </span>
              </div>
            </div>
          ))}
          
          {activeTasks.length === 0 && (
            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>
              Tout est à jour ! 🎉
            </p>
          )}
        </div>
      </div>

      <TaskHistory completedTasks={completedTasks} onDelete={deleteTask} />

    </div>
  );
}