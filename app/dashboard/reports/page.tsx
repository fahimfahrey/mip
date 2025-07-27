'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, 
  Download, 
  Calendar, 
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Clock,
  Users,
  BarChart3
} from 'lucide-react';

const reports = [
  {
    id: 1,
    name: 'Q4 Campaign Performance',
    type: 'Performance',
    status: 'completed',
    createdBy: 'Sarah Johnson',
    createdAt: '2024-01-15',
    lastRun: '2 hours ago',
    format: 'PDF',
    size: '2.4 MB',
    description: 'Comprehensive analysis of Q4 campaign metrics and ROI'
  },
  {
    id: 2,
    name: 'Audience Demographics Report',
    type: 'Audience',
    status: 'scheduled',
    createdBy: 'Mike Chen',
    createdAt: '2024-01-10',
    lastRun: 'Tomorrow 9:00 AM',
    format: 'Excel',
    size: '1.8 MB',
    description: 'Weekly audience breakdown and demographic insights'
  },
  {
    id: 3,
    name: 'Media Spend Analysis',
    type: 'Financial',
    status: 'running',
    createdBy: 'Emily Rodriguez',
    createdAt: '2024-01-12',
    lastRun: 'Running now',
    format: 'PowerPoint',
    size: '3.2 MB',
    description: 'Monthly media spend allocation and optimization recommendations'
  },
  {
    id: 4,
    name: 'Channel Performance Dashboard',
    type: 'Performance',
    status: 'draft',
    createdBy: 'David Kim',
    createdAt: '2024-01-14',
    lastRun: 'Never',
    format: 'PDF',
    size: '0 MB',
    description: 'Cross-channel performance comparison and insights'
  }
];

const templates = [
  {
    id: 1,
    name: 'Campaign Performance Template',
    category: 'Performance',
    description: 'Standard template for campaign performance reporting',
    usage: 45,
    lastUpdated: '2024-01-10'
  },
  {
    id: 2,
    name: 'Audience Analysis Template',
    category: 'Audience',
    description: 'Demographic and behavioral audience insights template',
    usage: 32,
    lastUpdated: '2024-01-08'
  },
  {
    id: 3,
    name: 'ROI Analysis Template',
    category: 'Financial',
    description: 'Return on investment and financial performance template',
    usage: 28,
    lastUpdated: '2024-01-12'
  }
];

export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || report.type.toLowerCase() === selectedType;
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-600/20 text-emerald-400';
      case 'running': return 'bg-blue-600/20 text-blue-400';
      case 'scheduled': return 'bg-amber-600/20 text-amber-400';
      case 'draft': return 'bg-slate-600/20 text-slate-400';
      default: return 'bg-slate-600/20 text-slate-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return FileText;
      case 'running': return BarChart3;
      case 'scheduled': return Clock;
      case 'draft': return Edit;
      default: return FileText;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Reports</h1>
          <p className="text-slate-400 mt-1">
            Generate, schedule, and manage custom reports and analytics
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Report
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-effect p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Total Reports</p>
              <p className="text-2xl font-bold text-white">24</p>
            </div>
            <FileText className="h-8 w-8 text-blue-400" />
          </div>
        </Card>
        <Card className="glass-effect p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Scheduled</p>
              <p className="text-2xl font-bold text-white">8</p>
            </div>
            <Clock className="h-8 w-8 text-amber-400" />
          </div>
        </Card>
        <Card className="glass-effect p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">This Month</p>
              <p className="text-2xl font-bold text-white">156</p>
            </div>
            <BarChart3 className="h-8 w-8 text-emerald-400" />
          </div>
        </Card>
        <Card className="glass-effect p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Templates</p>
              <p className="text-2xl font-bold text-white">12</p>
            </div>
            <Users className="h-8 w-8 text-purple-400" />
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="reports" className="space-y-6">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="reports" className="data-[state=active]:bg-slate-700">
            My Reports
          </TabsTrigger>
          <TabsTrigger value="templates" className="data-[state=active]:bg-slate-700">
            Templates
          </TabsTrigger>
          <TabsTrigger value="scheduled" className="data-[state=active]:bg-slate-700">
            Scheduled
          </TabsTrigger>
          <TabsTrigger value="builder" className="data-[state=active]:bg-slate-700">
            Report Builder
          </TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-6">
          {/* Search and Filters */}
          <Card className="glass-effect p-6">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search reports..."
                  className="pl-10 bg-slate-700/50 border-slate-600"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-48 bg-slate-700/50 border-slate-600">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                  <SelectItem value="audience">Audience</SelectItem>
                  <SelectItem value="financial">Financial</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-slate-600 hover:bg-slate-700">
                <Calendar className="h-4 w-4 mr-2" />
                Date Range
              </Button>
            </div>
          </Card>

          {/* Reports Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredReports.map((report) => {
              const StatusIcon = getStatusIcon(report.status);
              return (
                <Card key={report.id} className="glass-effect p-6 hover:bg-slate-800/70 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-slate-700/50">
                        <StatusIcon className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{report.name}</h3>
                        <p className="text-sm text-slate-400">{report.type}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-slate-300 mb-4">{report.description}</p>
                  
                  <div className="space-y-2 text-sm text-slate-400 mb-4">
                    <div className="flex justify-between">
                      <span>Created by:</span>
                      <span className="text-white">{report.createdBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last run:</span>
                      <span className="text-white">{report.lastRun}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Format:</span>
                      <span className="text-white">{report.format} • {report.size}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="hover:bg-slate-700">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button variant="ghost" size="sm" className="hover:bg-slate-700">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="ghost" size="sm" className="hover:bg-slate-700">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="glass-effect p-6 hover:bg-slate-800/70 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{template.name}</h3>
                    <Badge className="mt-2 bg-blue-600/20 text-blue-400">
                      {template.category}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-sm text-slate-300 mb-4">{template.description}</p>
                
                <div className="space-y-2 text-sm text-slate-400 mb-4">
                  <div className="flex justify-between">
                    <span>Usage:</span>
                    <span className="text-white">{template.usage} reports</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Updated:</span>
                    <span className="text-white">{template.lastUpdated}</span>
                  </div>
                </div>
                
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Use Template
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-6">
          <Card className="glass-effect p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Scheduled Reports</h3>
            <p className="text-slate-400">
              Manage automated report generation and delivery schedules.
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="builder" className="space-y-6">
          <Card className="glass-effect p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Custom Report Builder</h3>
            <p className="text-slate-400">
              Drag-and-drop report builder with custom visualizations and data sources.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}