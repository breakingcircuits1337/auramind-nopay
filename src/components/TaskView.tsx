import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Calendar,
  Plus,
  Filter,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  X
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  dueDate?: Date;
  status: 'pending' | 'in_progress' | 'completed';
  category: string;
}

interface TaskViewProps {
  onBack?: () => void;
}

const TaskView: React.FC<TaskViewProps> = ({ onBack }) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Complete project presentation',
      priority: 'high',
      dueDate: new Date('2025-03-20'),
      status: 'in_progress',
      category: 'Work'
    },
    {
      id: '2',
      title: 'Schedule team meeting',
      priority: 'medium',
      dueDate: new Date('2025-03-21'),
      status: 'pending',
      category: 'Work'
    }
  ]);

  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-error-500';
      case 'medium': return 'text-warning-500';
      case 'low': return 'text-success-500';
      default: return 'text-gray-500';
    }
  };

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      priority: 'medium',
      status: 'pending',
      category: 'General'
    };

    setTasks(prev => [...prev, newTask]);
    setNewTaskTitle('');
    setIsAddingTask(false);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const handlePriorityChange = (taskId: string, direction: 'up' | 'down') => {
    const priorities = ['low', 'medium', 'high'];
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const currentIndex = priorities.indexOf(task.priority);
        const newIndex = direction === 'up' 
          ? Math.min(currentIndex + 1, priorities.length - 1)
          : Math.max(currentIndex - 1, 0);
        return { ...task, priority: priorities[newIndex] as 'low' | 'medium' | 'high' };
      }
      return task;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {onBack && (
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
              </button>
            )}
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Tasks</h2>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              <Filter size={16} />
              <span>Filter</span>
            </button>
            <button 
              onClick={() => setIsAddingTask(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Plus size={16} />
              <span>New Task</span>
            </button>
          </div>
        </div>

        {isAddingTask && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Enter task title..."
                className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                autoFocus
              />
              <button
                onClick={handleAddTask}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Add
              </button>
              <button
                onClick={() => setIsAddingTask(false)}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </motion.div>
        )}

        <div className="space-y-4">
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
            >
              <div className="flex-shrink-0">
                <button 
                  onClick={() => handleDeleteTask(task.id)}
                  className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 hover:border-error-500 dark:hover:border-error-500 transition-colors flex items-center justify-center group"
                >
                  <X size={14} className="text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
              
              <div className="flex-grow">
                <h3 className="text-gray-900 dark:text-white font-medium">{task.title}</h3>
                <div className="flex items-center gap-4 mt-1">
                  <span className={`flex items-center gap-1 text-sm ${getPriorityColor(task.priority)}`}>
                    <AlertCircle size={14} />
                    {task.priority}
                  </span>
                  {task.dueDate && (
                    <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                      <Calendar size={14} />
                      {task.dueDate.toLocaleDateString()}
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <Clock size={14} />
                    {task.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handlePriorityChange(task.id, 'up')}
                  className="p-1 text-gray-400 hover:text-primary-500 transition-colors"
                  disabled={task.priority === 'high'}
                >
                  <ArrowUp size={16} />
                </button>
                <button 
                  onClick={() => handlePriorityChange(task.id, 'down')}
                  className="p-1 text-gray-400 hover:text-primary-500 transition-colors"
                  disabled={task.priority === 'low'}
                >
                  <ArrowDown size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskView;