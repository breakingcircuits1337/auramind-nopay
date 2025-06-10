import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Bell,
  Lock,
  Globe,
  Palette,
  Volume2,
  Mic,
  Moon,
  Sun,
  ToggleLeft,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { useTheme } from './ThemeProvider';
import VoiceSettings from './VoiceSettings';

interface SettingsViewProps {
  onBack: () => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ onBack }) => {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState<string>('main');

  const settingsSections = [
    {
      title: 'Account',
      icon: <User size={20} />,
      items: [
        { name: 'Profile Information', description: 'Update your personal details', section: 'profile' },
        { name: 'Notification Preferences', description: 'Manage how you receive alerts', section: 'notifications' },
        { name: 'Privacy Settings', description: 'Control your data and permissions', section: 'privacy' }
      ]
    },
    {
      title: 'Appearance',
      icon: <Palette size={20} />,
      items: [
        { name: 'Theme', description: 'Choose between light and dark mode', section: 'theme' },
        { name: 'Language', description: 'Select your preferred language', section: 'language' },
        { name: 'Text Size', description: 'Adjust the application font size', section: 'text-size' }
      ]
    },
    {
      title: 'Voice Assistant',
      icon: <Mic size={20} />,
      items: [
        { name: 'Voice Settings', description: 'Configure voice assistant settings', section: 'voice' },
        { name: 'Speech Output', description: 'Adjust voice response settings', section: 'speech' },
        { name: 'Wake Word', description: 'Customize activation phrase', section: 'wake-word' }
      ]
    }
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'voice':
      case 'wake-word':
        return <VoiceSettings />;
      default:
        return (
          <div className="space-y-6">
            {settingsSections.map((section, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                  {section.icon}
                  <h3 className="font-medium">{section.title}</h3>
                </div>

                <div className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <button
                      key={itemIndex}
                      onClick={() => setActiveSection(item.section)}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="text-left">
                        <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                      </div>
                      <ChevronRight size={20} className="text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Quick Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Quick Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Toggle dark mode on/off</p>
                    </div>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700"
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Bell size={20} />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Notifications</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Enable push notifications</p>
                    </div>
                  </div>
                  <ToggleLeft size={24} className="text-gray-400" />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Volume2 size={20} />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Sound Effects</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Enable interface sounds</p>
                    </div>
                  </div>
                  <ToggleLeft size={24} className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6"
      >
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => activeSection === 'main' ? onBack() : setActiveSection('main')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {activeSection === 'main' ? 'Settings' : settingsSections.find(s => 
              s.items.some(i => i.section === activeSection))?.items.find(i => 
              i.section === activeSection)?.name || 'Settings'}
          </h2>
        </div>

        {renderSection()}
      </motion.div>
    </div>
  );
};

export default SettingsView;