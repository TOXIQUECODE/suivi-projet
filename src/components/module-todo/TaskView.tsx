import { useState } from 'react';
import { Circle } from 'lucide-react';
import TaskForm from './TaskForm';
import TaskHistory from './TaskHistory';

export interface Task {
  id: number;
  title: string;
  sphere: string;
  date: string;
  completed: boolean;
}

export default function TaskView() {
  // L'état central de toutes les tâches
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Réviser le budget hebdomadaire', sphere: 'Finance', date: 'Aujourd\'hui', completed: false },
    { id: 2, title: 'Commander les pièces', sphere: 'Projet', date: 'Demain', completed: true },
  ]);

  // Fonction pour ajouter depuis TaskForm
  const handleAddTask = (title: string, sphere: string, date: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      sphere,
      date,
      completed: false
    };
    setTasks([newTask, ...tasks]);
  };

  // Fonction pour cocher/décocher
  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Fonction pour supprimer
  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // On sépare les tâches actives et terminées
  const activeTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Composant Formulaire importé */}
      <TaskForm onAddTask={handleAddTask} />

      {/* Liste des tâches ACTIVES à cocher */}
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
              onClick={() => toggleTask(task.id)}
            >
              <Circle color="rgba(255,255,255,0.5)" size={24} style={{ marginRight: '12px' }} />
              
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '16px', fontWeight: '500' }}>{task.title}</span>
                <span style={{ fontSize: '12px', color: 'var(--accent-color)' }}>
                  {task.sphere} • {task.date}
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

      {/* Composant Historique importé */}
      <TaskHistory completedTasks={completedTasks} onDelete={deleteTask} />

    </div>
  );
}