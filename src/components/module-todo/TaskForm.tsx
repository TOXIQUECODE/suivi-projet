import { useState } from 'react';
import { PlusCircle } from 'lucide-react';

// On définit ce que le formulaire va renvoyer au parent
interface TaskFormProps {
  onAddTask: (title: string, sphere: string, date: string) => void;
}

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [newTask, setNewTask] = useState('');
  const [newSphere, setNewSphere] = useState('Général');
  const [newDate, setNewDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    // On envoie les données au composant parent (TaskView)
    onAddTask(newTask, newSphere, newDate || 'À planifier');
    
    // On vide le formulaire
    setNewTask('');
    setNewDate('');
  };

  return (
    <div className="liquid-glass" style={{ padding: '20px', borderRadius: '24px' }}>
      <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 0, marginBottom: '20px', fontSize: '20px' }}>
        <PlusCircle color="var(--accent-color)" /> 
        Nouvelle Tâche
      </h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input 
          type="text" 
          className="glass-input" 
          placeholder="Quoi faire ?" 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          required
          style={{ marginBottom: '0' }}
        />
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="date" 
            className="glass-input" 
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            style={{ marginBottom: '0', flex: 1 }}
          />
          <select 
            className="glass-input" 
            value={newSphere}
            onChange={(e) => setNewSphere(e.target.value)}
            style={{ marginBottom: '0', flex: 1 }}
          >
            <option value="Général" style={{ color: 'black' }}>Général</option>
            <option value="Finance" style={{ color: 'black' }}>Finance</option>
            <option value="Projet" style={{ color: 'black' }}>Projet</option>
          </select>
        </div>

        <button type="submit" className="glass-button" style={{ marginTop: '5px' }}>
          Ajouter la tâche
        </button>
      </form>
    </div>
  );
}