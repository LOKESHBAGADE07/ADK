export interface Agent {
  id: string;
  name: string;
  role: string;
  status: 'idle' | 'thinking' | 'working' | 'completed' | 'error';
  progress: number;
  currentTask?: string;
  output?: any;
  avatar: string;
  color: string;
}

export interface AgentInteraction {
  id: string;
  fromAgent: string;
  toAgent: string;
  message: string;
  timestamp: Date;
  type: 'request' | 'response' | 'notification';
}

export interface Campaign {
  id: string;
  name: string;
  target: string;
  status: 'planning' | 'creating' | 'reviewing' | 'completed';
  progress: number;
  agents: Agent[];
  interactions: AgentInteraction[];
  outputs: {
    strategy?: string;
    copy?: string;
    design?: string;
    optimization?: string;
  };
}