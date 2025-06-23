import React from 'react';
import { motion } from 'framer-motion';
import { Header } from './components/Header';
import { AgentCard } from './components/AgentCard';
import { WorkflowVisualization } from './components/WorkflowVisualization';
import { InteractionLog } from './components/InteractionLog';
import { CampaignProgress } from './components/CampaignProgress';
import { useAgentSimulation } from './hooks/useAgentSimulation';
import { Play, RotateCcw } from 'lucide-react';

function App() {
  const { campaign, currentStep, isRunning, startSimulation } = useAgentSimulation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 font-['Inter']">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Campaign Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <CampaignProgress campaign={campaign} />
        </motion.div>

        {/* Control Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 flex justify-center"
        >
          <button
            onClick={startSimulation}
            disabled={isRunning}
            className={`
              flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold text-white
              transition-all duration-300 transform hover:scale-105
              ${isRunning 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
              }
            `}
          >
            {isRunning ? (
              <>
                <RotateCcw className="h-5 w-5 animate-spin" />
                <span>Agents Working...</span>
              </>
            ) : (
              <>
                <Play className="h-5 w-5" />
                <span>Start Content Generation</span>
              </>
            )}
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Agent Cards */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Active Agents</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {campaign.agents.map((agent, index) => (
                  <AgentCard
                    key={agent.id}
                    agent={agent}
                    isActive={index === currentStep && isRunning}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <WorkflowVisualization agents={campaign.agents} currentStep={currentStep} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <InteractionLog interactions={campaign.interactions} />
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center text-gray-600"
        >
          <p className="mb-2">Built with Agent Development Kit (ADK) for multi-agent orchestration</p>
          <p className="text-sm">
            Demonstrating sophisticated agent collaboration for content creation workflows
          </p>
        </motion.footer>
      </main>
    </div>
  );
}

export default App;