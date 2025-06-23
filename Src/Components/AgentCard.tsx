import React from 'react';
import { motion } from 'framer-motion';
import { Agent } from '../types/agents';
import { CheckCircle, AlertCircle, Loader2, Circle } from 'lucide-react';

interface AgentCardProps {
  agent: Agent;
  isActive: boolean;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent, isActive }) => {
  const getStatusIcon = () => {
    switch (agent.status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'working':
      case 'thinking':
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = () => {
    switch (agent.status) {
      case 'completed':
        return 'border-green-200 bg-green-50';
      case 'working':
      case 'thinking':
        return 'border-blue-200 bg-blue-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        borderColor: isActive ? agent.color : undefined
      }}
      whileHover={{ scale: 1.02 }}
      className={`
        relative bg-white rounded-xl border-2 p-6 transition-all duration-300
        ${isActive ? 'shadow-lg' : 'shadow-sm hover:shadow-md'}
        ${getStatusColor()}
      `}
    >
      {isActive && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
      )}
      
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
            style={{ backgroundColor: agent.color }}
          >
            {agent.avatar}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{agent.name}</h3>
            <p className="text-sm text-gray-600">{agent.role}</p>
          </div>
        </div>
        {getStatusIcon()}
      </div>

      {agent.currentTask && (
        <div className="mb-4">
          <p className="text-sm text-gray-700 font-medium">Current Task:</p>
          <p className="text-sm text-gray-600">{agent.currentTask}</p>
        </div>
      )}

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Progress</span>
          <span className="font-medium" style={{ color: agent.color }}>
            {agent.progress}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${agent.progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-2 rounded-full"
            style={{ backgroundColor: agent.color }}
          ></motion.div>
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-500 capitalize">
        Status: {agent.status.replace('_', ' ')}
      </div>
    </motion.div>
  );
};