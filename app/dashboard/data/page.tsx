'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Database, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Play,
  Pause,
  Settings,
  Activity
} from 'lucide-react';

const dataSources = [
  {
    id: 1,
    name: 'BSCL/MX',
    type: 'API',
    status: 'connected',
    lastSync: '2 minutes ago',
    records: '2.4M',
    health: 98,
    description: 'Broadcast Standard Code List and Media Exchange data'
  },
  {
    id: 2,
    name: 'NMS',
    type: 'Database',
    status: 'connected',
    lastSync: '5 minutes ago',
    records: '1.8M',
    health: 95,
    description: 'Nielsen Media Services audience measurement data'
  },
  {
    id: 3,
    name: 'DBI',
    type: 'API',
    status: 'warning',
    lastSync: '15 minutes ago',
    records: '950K',
    health: 78,
    description: 'Digital Broadcast Intelligence platform'
  },
  {
    id: 4,
    name: 'TMT',
    type: 'File Transfer',
    status: 'error',
    lastSync: '2 hours ago',
    records: '0',
    health: 0,
    description: 'Television Media Tracking system'
  }
];

const etlJobs = [
  {
    id: 1,
    name: 'Daily Audience Sync',
    source: 'NMS',
    status: 'running',
    progress: 75,
    duration: '12 min',
    nextRun: 'Tomorrow 6:00 AM'
  },
  {
    id: 2,
    name: 'BSCL Data Import',
    source: 'BSCL/MX',
    status: 'completed',
    progress: 100,
    duration: '8 min',
    nextRun: 'In 4 hours'
  },
  {
    id: 3,
    name: 'Campaign Performance ETL',
    source: 'Multiple',
    status: 'scheduled',
    progress: 0,
    duration: '15 min',
    nextRun: 'In 2 hours'
  }
];

export default function DataIntegrationPage() {
  const [selectedSource, setSelectedSource] = useState<number | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-emerald-600/20 text-emerald-400';
      case 'warning': return 'bg-amber-600/20 text-amber-400';
      case 'error': return 'bg-red-600/20 text-red-400';
      default: return 'bg-slate-600/20 text-slate-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'error': return XCircle;
      default: return Database;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Data Integration</h1>
          <p className="text-slate-400 mt-1">
            Manage data sources, ETL pipelines, and real-time synchronization
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-slate-600 hover:bg-slate-700">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync All
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-effect p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Active Sources</p>
              <p className="text-2xl font-bold text-white">4</p>
            </div>
            <Database className="h-8 w-8 text-blue-400" />
          </div>
        </Card>
        <Card className="glass-effect p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Total Records</p>
              <p className="text-2xl font-bold text-white">5.15M</p>
            </div>
            <Activity className="h-8 w-8 text-emerald-400" />
          </div>
        </Card>
        <Card className="glass-effect p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Sync Health</p>
              <p className="text-2xl font-bold text-white">92%</p>
            </div>
            <CheckCircle className="h-8 w-8 text-amber-400" />
          </div>
        </Card>
        <Card className="glass-effect p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">ETL Jobs</p>
              <p className="text-2xl font-bold text-white">12</p>
            </div>
            <RefreshCw className="h-8 w-8 text-purple-400" />
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="sources" className="space-y-6">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="sources" className="data-[state=active]:bg-slate-700">
            Data Sources
          </TabsTrigger>
          <TabsTrigger value="etl" className="data-[state=active]:bg-slate-700">
            ETL Pipelines
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="data-[state=active]:bg-slate-700">
            Monitoring
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sources" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {dataSources.map((source) => {
              const StatusIcon = getStatusIcon(source.status);
              return (
                <Card key={source.id} className="glass-effect p-6 hover:bg-slate-800/70 transition-all cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-slate-700/50">
                        <StatusIcon className="h-6 w-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{source.name}</h3>
                        <p className="text-sm text-slate-400">{source.type}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(source.status)}>
                      {source.status}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-slate-300 mb-4">{source.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Health Score</span>
                      <span className="text-white font-medium">{source.health}%</span>
                    </div>
                    <Progress value={source.health} className="h-2" />
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-400">Records:</span>
                        <span className="text-white ml-2">{source.records}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Last Sync:</span>
                        <span className="text-white ml-2">{source.lastSync}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="etl" className="space-y-6">
          <Card className="glass-effect">
            <div className="p-6 border-b border-slate-700">
              <h3 className="text-lg font-semibold text-white">ETL Pipeline Status</h3>
              <p className="text-sm text-slate-400">Monitor and manage data transformation jobs</p>
            </div>
            
            <div className="divide-y divide-slate-700/50">
              {etlJobs.map((job) => (
                <div key={job.id} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-medium text-white">{job.name}</h4>
                      <p className="text-sm text-slate-400">Source: {job.source}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(job.status)}>
                        {job.status}
                      </Badge>
                      <Button variant="ghost" size="sm" className="hover:bg-slate-700">
                        {job.status === 'running' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Progress</span>
                      <span className="text-white">{job.progress}%</span>
                    </div>
                    <Progress value={job.progress} className="h-2" />
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-400">Duration:</span>
                        <span className="text-white ml-2">{job.duration}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Next Run:</span>
                        <span className="text-white ml-2">{job.nextRun}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <Card className="glass-effect p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Real-time Monitoring</h3>
            <p className="text-slate-400">
              Advanced monitoring dashboard with real-time metrics, alerting, and performance analytics coming soon.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}