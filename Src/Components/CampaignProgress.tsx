import React from 'react';
import { motion } from 'framer-motion';
import { Campaign } from '../types/agents';
import { Target, Clock, CheckCircle, TrendingUp } from 'lucide-react';

interface CampaignProgressProps {
  campaign: Campaign;
}

export const CampaignProgress: React.FC<CampaignProgressProps> = ({ campaign }) => {
  const getStatusColor = () => {
    switch (campaign.status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'reviewing':
        return 'text-purple-600 bg-purple-100';
      case 'creating':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-orange-600 bg-orange-100';
    }
  };

  const getStatusIcon = () => {
    switch (campaign.status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5" />;
      case 'reviewing':
        return <TrendingUp className="h-5 w-5" />;
      case 'creating':
        return <Clock className="h-5 w-5 animate-spin" />;
      default:
        return <Target className="h-5 w-5" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">{campaign.name}</h2>
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getStatusColor()}`}>
          {getStatusIcon()}
          <span className="font-medium capitalize">{campaign.status}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Target Audience</h3>
          <p className="text-gray-600">{campaign.target}</p>
        </div>
        
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Overall Progress</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Completion</span>
              <span className="font-medium text-blue-600">{campaign.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${campaign.progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
              ></motion.div>
            </div>
          </div>
        </div>
      </div>

      {campaign.outputs.strategy && (
        <div className="border-t border-gray-200 pt-6">
          <h3 className="font-semibold text-gray-900 mb-3">Generated Content Preview</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {campaign.outputs.strategy && (
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Strategy Overview</h4>
                <p className="text-blue-700 text-sm">{campaign.outputs.strategy}</p>
              </div>
            )}
            {campaign.outputs.copy && (
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-medium text-green-900 mb-2">Copy Sample</h4>
                <p className="text-green-700 text-sm">{campaign.outputs.copy}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};