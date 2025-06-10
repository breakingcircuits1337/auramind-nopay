import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  MessageSquare, 
  Calendar, 
  Globe, 
  Star,
  AlertCircle,
  MapPin,
  Users,
  Clock,
  ChevronRight,
  Languages,
  Bell
} from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  translated?: boolean;
}

interface Event {
  id: string;
  title: string;
  datetime: string;
  location: string;
  participants: string[];
  details: string;
}

const mockMessages: Message[] = [
  {
    id: '1',
    sender: 'Project Lead',
    content: 'Team meeting rescheduled to 3 PM today. Important updates to discuss.',
    timestamp: '10:30 AM',
    priority: 'high',
    category: 'Work'
  },
  {
    id: '2',
    sender: 'Sarah Chen',
    content: '¿Podemos revisar el informe mañana?',
    timestamp: '10:15 AM',
    priority: 'medium',
    category: 'Work',
    translated: true
  },
  {
    id: '3',
    sender: 'Doctor\'s Office',
    content: 'Reminder: Your appointment is scheduled for tomorrow at 2 PM.',
    timestamp: '9:45 AM',
    priority: 'high',
    category: 'Health'
  }
];

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Quarterly Review Meeting',
    datetime: '2025-03-20T15:00:00',
    location: 'Conference Room A',
    participants: ['John Smith', 'Sarah Chen', 'Mike Johnson'],
    details: 'Q1 performance review and Q2 planning discussion'
  },
  {
    id: '2',
    title: 'Doctor\'s Appointment',
    datetime: '2025-03-21T14:00:00',
    location: 'City Medical Center',
    participants: ['Dr. Williams'],
    details: 'Annual check-up'
  }
];

const CommunicationHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'messages' | 'events' | 'briefing'>('messages');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'text-error-500 dark:text-error-400';
      case 'medium': return 'text-warning-500 dark:text-warning-400';
      case 'low': return 'text-success-500 dark:text-success-400';
    }
  };

  const formatEventDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
    >
      {/* Header */}
      <div className="bg-primary-600 dark:bg-primary-900 text-white p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <MessageSquare size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold">Communication Hub</h2>
            <p className="text-primary-100">Intelligent message filtering & event management</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'messages'
                ? 'bg-white text-primary-600 dark:bg-gray-800 dark:text-primary-400'
                : 'bg-primary-700/50 text-white hover:bg-primary-700'
            }`}
          >
            Messages
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'events'
                ? 'bg-white text-primary-600 dark:bg-gray-800 dark:text-primary-400'
                : 'bg-primary-700/50 text-white hover:bg-primary-700'
            }`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => setActiveTab('briefing')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'briefing'
                ? 'bg-white text-primary-600 dark:bg-gray-800 dark:text-primary-400'
                : 'bg-primary-700/50 text-white hover:bg-primary-700'
            }`}
          >
            Daily Briefing
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'messages' && (
          <div className="space-y-4">
            {mockMessages.map((message) => (
              <div
                key={message.id}
                className="p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-primary-100 dark:hover:border-primary-800 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 dark:text-white">{message.sender}</span>
                    <span className={`text-sm ${getPriorityColor(message.priority)}`}>
                      • {message.priority} priority
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{message.timestamp}</span>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-2">{message.content}</p>
                
                <div className="flex items-center gap-4">
                  {message.translated && (
                    <div className="flex items-center gap-1 text-sm text-primary-600 dark:text-primary-400">
                      <Globe size={14} />
                      <span>Translated from Spanish</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <Star size={14} />
                    <span>{message.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'events' && (
          <div className="space-y-4">
            {mockEvents.map((event) => (
              <div
                key={event.id}
                className="p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-primary-100 dark:hover:border-primary-800 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">{event.title}</h3>
                  <span className="text-sm text-primary-600 dark:text-primary-400">{formatEventDate(event.datetime)}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin size={14} />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Users size={14} />
                    <span>{event.participants.length} participants</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-700 dark:text-gray-300">{event.details}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'briefing' && (
          <div className="space-y-6">
            <div className="bg-primary-50 dark:bg-primary-900/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={16} className="text-primary-600 dark:text-primary-400" />
                <span className="font-medium text-primary-700 dark:text-primary-300">Today's Overview</span>
              </div>
              <p className="text-sm text-primary-600 dark:text-primary-300">
                Good morning! You have 2 high-priority messages and 2 upcoming events today.
                The weather forecast suggests bringing an umbrella.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-primary-100 dark:hover:border-primary-800 transition-colors">
                  <div className="flex items-center gap-2">
                    <Bell size={16} className="text-primary-600 dark:text-primary-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Review Notifications</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </button>
                <button className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-primary-100 dark:hover:border-primary-800 transition-colors">
                  <div className="flex items-center gap-2">
                    <Languages size={16} className="text-primary-600 dark:text-primary-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Translation Settings</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CommunicationHub;