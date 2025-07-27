'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, XCircle, Clock } from 'lucide-react';

const dataSources = [
  { name: 'BSCL/MX', status: 'connected', lastSync: '2 min ago' },
  { name: 'NMS', status: 'connected', lastSync: '5 min ago' },
  { name: 'DBI', status: 'warning', lastSync: '15 min ago' },
  { name: 'TMT', status: 'error', lastSync: '2 hours ago' },
];

const statusConfig = {
  connected: { icon: CheckCircle, color: 'text-emerald-400', bgColor: 'bg-emerald-400/10' },
  warning: { icon: AlertCircle, color: 'text-amber-400', bgColor: 'bg-amber-400/10' },
  error: { icon: XCircle, color: 'text-red-400', bgColor: 'bg-red-400/10' },
  pending: { icon: Clock, color: 'text-blue-400', bgColor: 'bg-blue-400/10' },
};

export function DataSourceStatus() {
  return (
    <Card className="glass-effect p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Data Sources</h3>
      
      <div className="space-y-3">
        {dataSources.map((source) => {
          const config = statusConfig[source.status as keyof typeof statusConfig];
          const Icon = config.icon;
          
          return (
            <div key={source.name} className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30">
              <div className="flex items-center space-x-3">
                <div className={`p-1 rounded-full ${config.bgColor}`}>
                  <Icon className={`h-4 w-4 ${config.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{source.name}</p>
                  <p className="text-xs text-slate-400">Last sync: {source.lastSync}</p>
                </div>
              </div>
              <Badge 
                variant="secondary" 
                className={`${config.bgColor} ${config.color} capitalize`}
              >
                {source.status}
              </Badge>
            </div>
          );
        })}
      </div>
    </Card>
  );
}