'use client';

import { Card } from '@/components/ui/card';
import { MetricCard } from '@/components/dashboard/metric-card';
import { ChartContainer } from '@/components/dashboard/chart-container';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { DataSourceStatus } from '@/components/dashboard/data-source-status';
import { useAuth } from '@/components/providers/auth-provider';
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Eye,
  Target,
  BarChart3,
  Database
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();

  const metrics = [
    {
      title: 'Total Reach',
      value: '2.4M',
      change: '+12.5%',
      trend: 'up',
      icon: Eye,
      color: 'text-blue-400'
    },
    {
      title: 'Campaign ROI',
      value: '324%',
      change: '+8.2%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-emerald-400'
    },
    {
      title: 'Media Spend',
      value: '$1.2M',
      change: '-3.1%',
      trend: 'down',
      icon: DollarSign,
      color: 'text-amber-400'
    },
    {
      title: 'Active Campaigns',
      value: '47',
      change: '+5',
      trend: 'up',
      icon: Target,
      color: 'text-purple-400'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Welcome back, {user?.name}
          </h1>
          <p className="text-slate-400 mt-1">
            Here's what's happening with your media campaigns today.
          </p>
        </div>
        <Card className="glass-effect p-4">
          <div className="text-center">
            <p className="text-sm text-slate-400">Today's Date</p>
            <p className="text-lg font-semibold">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </Card>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer
          title="Campaign Performance"
          subtitle="Revenue vs Spend over time"
          type="line"
        />
        <ChartContainer
          title="Audience Breakdown"
          subtitle="Demographics and reach analysis"
          type="pie"
        />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        <div>
          <DataSourceStatus />
        </div>
      </div>
    </div>
  );
}