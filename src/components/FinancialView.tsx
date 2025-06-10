import React from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  CreditCard,
  PieChart,
  ArrowRight,
  Bell
} from 'lucide-react';

const FinancialView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/50 rounded-lg flex items-center justify-center text-primary-600 dark:text-primary-400">
              <DollarSign size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Balance</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">$5,240.00</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-success-100 dark:bg-success-900/50 rounded-lg flex items-center justify-center text-success-600 dark:text-success-400">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Income</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">$3,850.00</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-error-100 dark:bg-error-900/50 rounded-lg flex items-center justify-center text-error-600 dark:text-error-400">
              <TrendingDown size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Expenses</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">$2,150.00</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Subscriptions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Active Subscriptions</h2>
          <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {[
            { name: 'Netflix', amount: 15.99, date: '03/25/2025' },
            { name: 'Spotify', amount: 9.99, date: '03/28/2025' }
          ].map((sub, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="flex items-center gap-4">
                <CreditCard size={24} className="text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{sub.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Next payment: {sub.date}</p>
                </div>
              </div>
              <p className="font-medium text-gray-900 dark:text-white">${sub.amount}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Financial Insights</h2>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-warning-50 dark:bg-warning-900/20 rounded-lg border border-warning-200 dark:border-warning-800">
            <Bell size={24} className="text-warning-600 dark:text-warning-400" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Unusual spending detected</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your entertainment expenses are 40% higher than last month
              </p>
            </div>
            <button className="ml-auto">
              <ArrowRight size={20} className="text-warning-600 dark:text-warning-400" />
            </button>
          </div>

          <div className="flex items-center gap-4 p-4 bg-success-50 dark:bg-success-900/20 rounded-lg border border-success-200 dark:border-success-800">
            <PieChart size={24} className="text-success-600 dark:text-success-400" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Savings goal progress</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                You're 75% towards your vacation savings goal
              </p>
            </div>
            <button className="ml-auto">
              <ArrowRight size={20} className="text-success-600 dark:text-success-400" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FinancialView;