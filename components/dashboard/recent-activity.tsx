'use client';

import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { FileText, Upload, UserPlus, BarChart3 } from 'lucide-react';

const activities = [
  {
    id: 1,
    user: 'Sarah Johnson',
    action: 'Generated Q4 Performance Report',
    time: '2 minutes ago',
    type: 'report',
    icon: FileText,
    color: 'text-blue-400'
  },
  {
    id: 2,
    user: 'Mike Chen',
    action: 'Uploaded new BSCL data file',
    time: '15 minutes ago',
    type: 'upload',
    icon: Upload,
    color: 'text-emerald-400'
  },
  {
    id: 3,
    user: 'Emily Rodriguez',
    action: 'Created new campaign analysis',
    time: '1 hour ago',
    type: 'analysis',
    icon: BarChart3,
    color: 'text-amber-400'
  },
  {
    id: 4,
    user: 'Admin',
    action: 'Added new brand manager user',
    time: '2 hours ago',
    type: 'user',
    icon: UserPlus,
    color: 'text-purple-400'
  },
];

export function RecentActivity() {
  return (
    <Card className="glass-effect p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
        <Badge variant="secondary" className="bg-slate-700 text-slate-300">
          Live
        </Badge>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className="p-2 rounded-lg bg-slate-700/50">
              <activity.icon className={`h-4 w-4 ${activity.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white truncate">
                  {activity.user}
                </p>
                <p className="text-xs text-slate-400">{activity.time}</p>
              </div>
              <p className="text-sm text-slate-400">{activity.action}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}