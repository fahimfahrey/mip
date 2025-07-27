'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/components/providers/auth-provider';
import { 
  Shield, 
  Search, 
  Filter, 
  Download,
  Eye,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Database,
  Settings,
  FileText
} from 'lucide-react';

const auditLogs = [
  {
    id: 1,
    timestamp: '2024-01-15 14:32:15',
    user: 'Sarah Johnson',
    userEmail: 'sarah@media.com',
    action: 'User Login',
    resource: 'Authentication System',
    details: 'Successful login from IP 192.168.1.100',
    severity: 'info',
    category: 'authentication'
  },
  {
    id: 2,
    timestamp: '2024-01-15 14:28:42',
    user: 'Mike Chen',
    userEmail: 'mike@media.com',
    action: 'Data Export',
    resource: 'Campaign Performance Report',
    details: 'Exported Q4 campaign data (2.4MB PDF)',
    severity: 'medium',
    category: 'data_access'
  },
  {
    id: 3,
    timestamp: '2024-01-15 14:15:33',
    user: 'System',
    userEmail: 'system@media.com',
    action: 'Failed Login Attempt',
    resource: 'Authentication System',
    details: 'Multiple failed login attempts from IP 203.0.113.45',
    severity: 'high',
    category: 'security'
  },
  {
    id: 4,
    timestamp: '2024-01-15 13:45:21',
    user: 'Emily Rodriguez',
    userEmail: 'emily@brand.com',
    action: 'User Created',
    resource: 'User Management',
    details: 'Created new brand manager account for John Doe',
    severity: 'medium',
    category: 'user_management'
  },
  {
    id: 5,
    timestamp: '2024-01-15 13:22:18',
    user: 'David Kim',
    userEmail: 'david@media.com',
    action: 'Settings Modified',
    resource: 'System Configuration',
    details: 'Updated data retention policy from 12 to 24 months',
    severity: 'high',
    category: 'configuration'
  },
  {
    id: 6,
    timestamp: '2024-01-15 12:58:07',
    user: 'Sarah Johnson',
    userEmail: 'sarah@media.com',
    action: 'Database Query',
    resource: 'Analytics Database',
    details: 'Executed complex query on audience_demographics table',
    severity: 'low',
    category: 'data_access'
  }
];

export default function AuditLogsPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Check if user has admin access
  if (user?.role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Card className="glass-effect p-8 text-center">
          <Shield className="h-16 w-16 text-slate-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Access Denied</h2>
          <p className="text-slate-400">You need administrator privileges to access audit logs.</p>
        </Card>
      </div>
    );
  }

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = selectedSeverity === 'all' || log.severity === selectedSeverity;
    const matchesCategory = selectedCategory === 'all' || log.category === selectedCategory;
    return matchesSearch && matchesSeverity && matchesCategory;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-600/20 text-red-400';
      case 'medium': return 'bg-amber-600/20 text-amber-400';
      case 'low': return 'bg-blue-600/20 text-blue-400';
      case 'info': return 'bg-emerald-600/20 text-emerald-400';
      default: return 'bg-slate-600/20 text-slate-400';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return XCircle;
      case 'medium': return AlertTriangle;
      case 'low': return CheckCircle;
      case 'info': return CheckCircle;
      default: return Clock;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'authentication': return User;
      case 'data_access': return Database;
      case 'security': return Shield;
      case 'user_management': return User;
      case 'configuration': return Settings;
      default: return FileText;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Audit Logs</h1>
          <p className="text-slate-400 mt-1">
            Security monitoring and compliance tracking for all system activities
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-slate-600 hover:bg-slate-700">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-effect p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Total Events</p>
              <p className="text-2xl font-bold text-white">1,247</p>
            </div>
            <FileText className="h-8 w-8 text-blue-400" />
          </div>
        </Card>
        <Card className="glass-effect p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Security Alerts</p>
              <p className="text-2xl font-bold text-white">3</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-400" />
          </div>
        </Card>
        <Card className="glass-effect p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Active Users</p>
              <p className="text-2xl font-bold text-white">24</p>
            </div>
            <User className="h-8 w-8 text-emerald-400" />
          </div>
        </Card>
        <Card className="glass-effect p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Data Exports</p>
              <p className="text-2xl font-bold text-white">156</p>
            </div>
            <Database className="h-8 w-8 text-amber-400" />
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="glass-effect p-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search audit logs..."
              className="pl-10 bg-slate-700/50 border-slate-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
            <SelectTrigger className="w-40 bg-slate-700/50 border-slate-600">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="all">All Severity</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="info">Info</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48 bg-slate-700/50 border-slate-600">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="authentication">Authentication</SelectItem>
              <SelectItem value="data_access">Data Access</SelectItem>
              <SelectItem value="security">Security</SelectItem>
              <SelectItem value="user_management">User Management</SelectItem>
              <SelectItem value="configuration">Configuration</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Audit Logs Table */}
      <Card className="glass-effect">
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-lg font-semibold text-white">
            Audit Trail ({filteredLogs.length} events)
          </h3>
          <p className="text-sm text-slate-400">Chronological record of all system activities</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-slate-300">Timestamp</th>
                <th className="text-left p-4 text-sm font-medium text-slate-300">User</th>
                <th className="text-left p-4 text-sm font-medium text-slate-300">Action</th>
                <th className="text-left p-4 text-sm font-medium text-slate-300">Resource</th>
                <th className="text-left p-4 text-sm font-medium text-slate-300">Severity</th>
                <th className="text-right p-4 text-sm font-medium text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => {
                const SeverityIcon = getSeverityIcon(log.severity);
                const CategoryIcon = getCategoryIcon(log.category);
                return (
                  <tr key={log.id} className="border-t border-slate-700/50 hover:bg-slate-800/30">
                    <td className="p-4">
                      <div className="text-sm text-white font-mono">{log.timestamp}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-blue-600 text-white text-xs">
                            {log.user.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-white">{log.user}</p>
                          <p className="text-xs text-slate-400">{log.userEmail}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <CategoryIcon className="h-4 w-4 text-slate-400" />
                        <span className="text-sm text-white">{log.action}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="text-sm text-white">{log.resource}</p>
                        <p className="text-xs text-slate-400">{log.details}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <SeverityIcon className="h-4 w-4" />
                        <Badge className={getSeverityColor(log.severity)}>
                          {log.severity}
                        </Badge>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <Button variant="ghost" size="sm" className="hover:bg-slate-700">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}