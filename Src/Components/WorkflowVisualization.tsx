import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { Agent } from '../types/agents';

interface WorkflowVisualizationProps {
  agents: Agent[];
  currentStep: number;
}

export const WorkflowVisualization: React.FC<WorkflowVisualizationProps> = ({ 
  agents, 
  currentStep 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Agent Workflow</h3>
      
      <div className="space-y-6">
        {agents.map((agent, index) => (
          <div key={agent.id} className="flex items-center">
            <div className="flex items-center space-x-4 flex-1">
              <motion.div
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ 
                  scale: index <= currentStep ? 1 : 0.9,
                  opacity: index <= currentStep ? 1 : 0.5
                }}
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-white font-bold
                  ${index < currentStep ? 'bg-green-500' : 
                    index === currentStep ? agent.color : 'bg-gray-300'}
                `}
              >
                {agent.avatar}
              </motion.div>
              
              <div className="flex-1">
                <div className={`
                  font-medium
                  ${index <= currentStep ? 'text-gray-900' : 'text-gray-500'}
                `}>
                  {agent.name}
                </div>
                <div className={`
                  text-sm
                  ${index <= currentStep ? 'text-gray-600' : 'text-gray-400'}
                `}>
                  {agent.role}
                </div>
              </div>
              
              {index < currentStep && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-green-500"
                >
                  ✓
                </motion.div>
              )}
            </div>
            
            {index < agents.length - 1 && (
              <div className="ml-6">
                <motion.div
                  initial={{ opacity: 0.3 }}
                  animate={{ 
                    opacity: index < currentStep ? 1 : 0.3,
                    color: index < currentStep ? '#10B981' : '#9CA3AF'
                  }}
                >
                  <ArrowDown className="h-5 w-5" />
                </motion.div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};