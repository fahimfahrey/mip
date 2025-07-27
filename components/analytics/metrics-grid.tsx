'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, Eye, Target, Users } from 'lucide-react';

const metrics = [
  {
    title: 'Total Revenue',
    value: '$2.4M',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'text-emerald-400'
  },
  {
    title: 'Impressions',
    value: '45.2M',
    change: '+8.1%',
    trend: 'up',
    icon: Eye,
    color: 'text-blue-400'
  },
  {
    title: 'Conversion Rate',
    value: '3.24%',
    change: '-0.5%',
    trend: 'down',
    icon: Target,
    color: 'text-amber-400'
  },
  {
    title: 'Unique Reach',
    value: '1.8M',
    change: '+15.3%',
    trend: 'up',
    icon: Users,
    color: 'text-purple-400'
  }
];

export function MetricsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index} className="glass-effect p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm text-slate-400">{metric.title}</p>
              <p className="text-2xl font-bold text-white">{metric.value}</p>
              <div className="flex items-center space-x-1">
                {metric.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-400" />
                )}
                <span className={`text-sm font-medium ${
                  metric.trend === 'up' ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {metric.change}
                </span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-slate-700/50">
              <metric.icon className={`h-6 w-6 ${metric.color}`} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}