import { Archive, Trash2 } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  sphere: string;
  date: string;
  completed: boolean;
}

interface TaskHistoryProps {
  completedTasks: Task[];
  onDelete: (id: number) => void;
}

export default function TaskHistory({ completedTasks, onDelete }: TaskHistoryProps) {
  if (completedTasks.length === 0) return null; // Ne s'affiche pas s'il n'y a pas d'historique

  return (
    <div className="liquid-glass" style={{ padding: '20px', borderRadius: '24px', opacity: 0.8 }}>
      <h3 style={{ margin: '0 0 15px 0', fontSize: '18px', color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Archive size={18} />
        Historique (Terminées)
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {completedTasks.map(task => (
          <div 
            key={task.id} 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px',
              background: 'rgba(0,0,0,0.2)',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.05)'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '14px', textDecoration: 'line-through', color: 'rgba(255,255,255,0.6)' }}>
                {task.title}
              </span>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>
                {task.sphere} • {task.date}
              </span>
            </div>
            <button 
              onClick={() => onDelete(task.id)}
              style={{ background: 'none', border: 'none', color: '#ff453a', cursor: 'pointer', padding: '5px' }}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}