import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AgentInteraction } from '../types/agents';
import { MessageSquare, Send, Bell } from 'lucide-react';

interface InteractionLogProps {
  interactions: AgentInteraction[];
}

export const InteractionLog: React.FC<InteractionLogProps> = ({ interactions }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'request':
        return <Send className="h-4 w-4" />;
      case 'response':
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'request':
        return 'text-blue-600 bg-blue-50';
      case 'response':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-purple-600 bg-purple-50';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Agent Interactions</h3>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {interactions.slice(-10).map((interaction) => (
            <motion.div
              key={interaction.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50"
            >
              <div className={`p-2 rounded-full ${getTypeColor(interaction.type)}`}>
                {getIcon(interaction.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-gray-900">
                    {interaction.fromAgent}
                  </span>
                  <span className="text-gray-400">→</span>
                  <span className="font-medium text-gray-700">
                    {interaction.toAgent}
                  </span>
                  <span className="text-xs text-gray-500">
                    {interaction.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{interaction.message}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};