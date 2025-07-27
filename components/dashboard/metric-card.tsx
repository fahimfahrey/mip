'use client';

import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DivideIcon as LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
  color: string;
}

export function MetricCard({ title, value, change, trend, icon: Icon, color }: MetricCardProps) {
  return (
    <Card className="metric-card">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-slate-400">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
          <div className="flex items-center space-x-1">
            {trend === 'up' ? (
              <TrendingUp className="h-4 w-4 text-emerald-400" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-400" />
            )}
            <span className={cn(
              "text-sm font-medium",
              trend === 'up' ? "text-emerald-400" : "text-red-400"
            )}>
              {change}
            </span>
          </div>
        </div>
        <div className="p-3 rounded-lg bg-slate-700/50">
          <Icon className={cn("h-6 w-6", color)} />
        </div>
      </div>
    </Card>
  );
}