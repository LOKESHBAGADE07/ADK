import { useState, useEffect, useCallback } from 'react';
import { Agent, AgentInteraction, Campaign } from '../types/agents';

const initialAgents: Agent[] = [
  {
    id: 'strategy',
    name: 'Strategy Agent',
    role: 'Campaign Planning & Market Analysis',
    status: 'idle',
    progress: 0,
    avatar: 'ST',
    color: '#3B82F6'
  },
  {
    id: 'copywriter',
    name: 'Copywriting Agent',
    role: 'Content Writing & Messaging',
    status: 'idle',
    progress: 0,
    avatar: 'CW',
    color: '#10B981'
  },
  {
    id: 'designer',
    name: 'Design Agent',
    role: 'Visual Design & Brand Guidelines',
    status: 'idle',
    progress: 0,
    avatar: 'DS',
    color: '#8B5CF6'
  },
  {
    id: 'optimizer',
    name: 'Optimization Agent',
    role: 'Performance Review & Enhancement',
    status: 'idle',
    progress: 0,
    avatar: 'OP',
    color: '#F59E0B'
  }
];

const sampleMessages = [
  { from: 'Strategy Agent', to: 'Copywriting Agent', message: 'Target audience analysis complete. Focus on tech-savvy millennials aged 25-35.' },
  { from: 'Copywriting Agent', to: 'Design Agent', message: 'Headlines created. Please design visuals that complement the modern, professional tone.' },
  { from: 'Design Agent', to: 'Optimization Agent', message: 'Visual concepts ready. Brand colors: blue #3B82F6, accent purple #8B5CF6.' },
  { from: 'Optimization Agent', to: 'Strategy Agent', message: 'Initial review complete. Suggest A/B testing two headline variations.' },
  { from: 'Strategy Agent', to: 'All Agents', message: 'Campaign framework approved. Proceeding with content generation phase.' }
];

export const useAgentSimulation = () => {
  const [campaign, setCampaign] = useState<Campaign>({
    id: 'campaign-1',
    name: 'TechFlow SaaS Launch Campaign',
    target: 'Tech professionals and SaaS decision makers aged 25-45',
    status: 'planning',
    progress: 0,
    agents: initialAgents,
    interactions: [],
    outputs: {}
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const addInteraction = useCallback((from: string, to: string, message: string, type: 'request' | 'response' | 'notification' = 'notification') => {
    const interaction: AgentInteraction = {
      id: Date.now().toString(),
      fromAgent: from,
      toAgent: to,
      message,
      timestamp: new Date(),
      type
    };

    setCampaign(prev => ({
      ...prev,
      interactions: [...prev.interactions, interaction]
    }));
  }, []);

  const updateAgentStatus = useCallback((agentId: string, status: Agent['status'], progress: number, currentTask?: string) => {
    setCampaign(prev => ({
      ...prev,
      agents: prev.agents.map(agent =>
        agent.id === agentId
          ? { ...agent, status, progress, currentTask }
          : agent
      )
    }));
  }, []);

  const simulateAgentWork = useCallback(async (agentIndex: number) => {
    const agent = campaign.agents[agentIndex];
    if (!agent) return;

    // Start thinking
    updateAgentStatus(agent.id, 'thinking', 0, 'Analyzing requirements...');
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Working phase
    updateAgentStatus(agent.id, 'working', 25, 'Processing data...');
    await new Promise(resolve => setTimeout(resolve, 1500));

    updateAgentStatus(agent.id, 'working', 50, 'Generating content...');
    await new Promise(resolve => setTimeout(resolve, 1500));

    updateAgentStatus(agent.id, 'working', 75, 'Finalizing output...');
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Complete
    updateAgentStatus(agent.id, 'completed', 100);

    // Add sample output
    const outputs = {
      strategy: 'Multi-channel approach targeting SaaS decision makers through LinkedIn, content marketing, and webinar series. Focus on ROI and efficiency messaging.',
      copy: '"Transform your workflow in 30 days or less. Join 10,000+ teams who\'ve boosted productivity by 40% with TechFlow."',
      design: 'Modern minimal design with blue-purple gradient, clean typography, and mobile-first responsive layout.',
      optimization: 'A/B test recommendation: Test CTA buttons "Start Free Trial" vs "Get Started Today". Optimize for mobile conversion rates.'
    };

    setCampaign(prev => ({
      ...prev,
      outputs: {
        ...prev.outputs,
        [agent.id === 'strategy' ? 'strategy' :
         agent.id === 'copywriter' ? 'copy' :
         agent.id === 'designer' ? 'design' : 'optimization']: 
         outputs[agent.id === 'strategy' ? 'strategy' :
                agent.id === 'copywriter' ? 'copy' :
                agent.id === 'designer' ? 'design' : 'optimization' as keyof typeof outputs]
      }
    }));

    // Add interaction message
    if (agentIndex < sampleMessages.length) {
      const msg = sampleMessages[agentIndex];
      addInteraction(msg.from, msg.to, msg.message);
    }
  }, [campaign.agents, updateAgentStatus, addInteraction]);

  const startSimulation = useCallback(async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setCampaign(prev => ({ ...prev, status: 'creating' }));

    for (let i = 0; i < campaign.agents.length; i++) {
      setCurrentStep(i);
      await simulateAgentWork(i);
      
      // Update overall progress
      const overallProgress = Math.round(((i + 1) / campaign.agents.length) * 100);
      setCampaign(prev => ({ ...prev, progress: overallProgress }));
      
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setCampaign(prev => ({ ...prev, status: 'completed' }));
    setIsRunning(false);
    addInteraction('System', 'All Agents', 'Campaign generation completed successfully!');
  }, [isRunning, campaign.agents.length, simulateAgentWork, addInteraction]);

  return {
    campaign,
    currentStep,
    isRunning,
    startSimulation
  };
};