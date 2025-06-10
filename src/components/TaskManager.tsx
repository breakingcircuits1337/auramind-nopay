import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Brain, 
  Calendar, 
  Clock, 
  Battery, 
  Users, 
  Focus, 
  CheckCircle2,
  AlertCircle,
  Zap,
  Trash2,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  energyLevel: 'high' | 'medium' | 'low';
  duration: number;
  category: string;
  delegateTo?: string;
  completed: boolean;
}

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Review quarterly presentation',
    priority: 'high',
    energyLevel: 'high',
    duration: 60,
    category: 'Work',
    completed: false
  },
  {
    id: '2',
    title: 'Team sync meeting',
    priority: 'medium',
    energyLevel: 'medium',
    duration: 30,
    category: 'Work',
    completed: false
  },
  {
    id: '3',
    title: 'Plan weekly meal prep',
    priority: 'low',
    energyLevel: 'low',
    duration: 20,
    category: 'Personal',
    delegateTo: 'Family',
    completed: false
  }
];

interface TaskManagerProps {
  currentEnergyLevel: 'high' | 'medium' | 'low';
  setCurrentEnergyLevel: (level: 'high' | 'medium' | 'low') => void;
  focusModeActive: boolean;
  setFocusModeActive: (active: boolean) => void;
}

const TaskManager: React.FC<TaskManagerProps> = ({
  currentEnergyLevel,
  setCurrentEnergyLevel,
  focusModeActive,
  setFocusModeActive
}) => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getEnergyLevelColor = (level: 'high' | 'medium' | 'low') => {
    switch (level) {
      case 'high': return 'bg-success-500 dark:bg-success-600';
      case 'medium': return 'bg-warning-500 dark:bg-warning-600';
      case 'low': return 'bg-error-500 dark:bg-error-600';
    }
  };

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'text-error-500 dark:text-error-400';
      case 'medium': return 'text-warning-500 dark:text-warning-400';
      case 'low': return 'text-success-500 dark:text-success-400';
    }
  };

  const addTask = useCallback((title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      priority: 'medium',
      energyLevel: currentEnergyLevel,
      duration: 30,
      category: 'Personal',
      completed: false
    };
    setTasks(prev => [...prev, newTask]);
  }, [currentEnergyLevel]);

  const deleteTask = useCallback((taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  }, []);

  const toggleTaskCompletion = useCallback((taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  }, []);

  const setTaskPriority = useCallback((taskId: string, priority: 'high' | 'medium' | 'low') => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, priority } : task
    ));
  }, []);

  const getOptimalTasks = () => {
    return tasks.filter(task => 
      !task.completed && 
      (focusModeActive ? task.priority === 'high' : true) &&
      (currentEnergyLevel === 'low' ? task.energyLevel !== 'high' : true)
    ).sort((a, b) => {
      if (a.priority === 'high' && b.priority !== 'high') return -1;
      if (a.priority !== 'high' && b.priority === 'high') return 1;
      return 0;
    });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/50 rounded-lg flex items-center justify-center text-primary-600 dark:text-primary-400">
            <Brain size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Intelligent Task Manager</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Adapts to your energy and focus levels</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setFocusModeActive(!focusModeActive)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              focusModeActive 
                ? 'bg-primary-600 dark:bg-primary-500 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <Focus size={18} />
            Focus Mode
          </button>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Battery size={16} className="text-gray-500 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Energy Level</span>
        </div>
        <div className="flex gap-3">
          {(['high', 'medium', 'low'] as const).map((level) => (
            <button
              key={level}
              onClick={() => setCurrentEnergyLevel(level)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentEnergyLevel === level
                  ? `${getEnergyLevelColor(level)} text-white`
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {getOptimalTasks().map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-primary-100 dark:hover:border-primary-800 transition-colors bg-white dark:bg-gray-800"
          >
            <button
              onClick={() => toggleTaskCompletion(task.id)}
              className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                task.completed
                  ? 'bg-primary-500 dark:bg-primary-600 border-primary-500 dark:border-primary-600'
                  : 'border-gray-300 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-400'
              }`}
            >
              {task.completed && <CheckCircle2 size={16} className="text-white" />}
            </button>
            
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-gray-900 dark:text-white">{task.title}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setTaskPriority(task.id, 'high')}
                    className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      task.priority === 'high' ? 'text-error-500' : 'text-gray-400'
                    }`}
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button
                    onClick={() => setTaskPriority(task.id, 'low')}
                    className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      task.priority === 'low' ? 'text-success-500' : 'text-gray-400'
                    }`}
                  >
                    <ArrowDown size={14} />
                  </button>
                </div>
                <span className={`text-sm ${getPriorityColor(task.priority)}`}>
                  • {task.priority} priority
                </span>
              </div>
              
              <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  {task.duration}m
                </div>
                <div className="flex items-center gap-1">
                  <Zap size={14} />
                  {task.energyLevel} energy
                </div>
                {task.delegateTo && (
                  <div className="flex items-center gap-1">
                    <Users size={14} />
                    {task.delegateTo}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {task.delegateTo && (
                <button className="px-3 py-1 text-sm text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/50 rounded-md transition-colors">
                  Delegate
                </button>
              )}
              <button
                onClick={() => deleteTask(task.id)}
                className="p-2 text-gray-400 hover:text-error-500 dark:hover:text-error-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-primary-50 dark:bg-primary-900/50 rounded-lg border border-primary-100 dark:border-primary-800">
        <div className="flex items-center gap-2 mb-2">
          <Brain size={16} className="text-primary-600 dark:text-primary-400" />
          <span className="font-medium text-primary-700 dark:text-primary-300">AI Suggestions</span>
        </div>
        <p className="text-sm text-primary-600 dark:text-primary-300">
          Based on your current energy level ({currentEnergyLevel}) and {focusModeActive ? 'focus mode being active' : 'schedule'},
          I recommend tackling high-priority tasks that match your energy state.
        </p>
      </div>
    </motion.div>
  );
};

export default TaskManager;