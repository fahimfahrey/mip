'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/providers/auth-provider';
import {
  LayoutDashboard,
  BarChart3,
  Database,
  FileText,
  Settings,
  Users,
  Upload,
  TrendingUp,
  Shield,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['admin', 'planner', 'brand_manager'] },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3, roles: ['admin', 'planner', 'brand_manager'] },
  { name: 'Data Integration', href: '/dashboard/data', icon: Database, roles: ['admin', 'planner'] },
  { name: 'File Upload', href: '/dashboard/upload', icon: Upload, roles: ['admin', 'planner'] },
  { name: 'Reports', href: '/dashboard/reports', icon: FileText, roles: ['admin', 'planner', 'brand_manager'] },
  { name: 'Predictions', href: '/dashboard/predictions', icon: TrendingUp, roles: ['admin', 'planner'] },
  { name: 'User Management', href: '/dashboard/users', icon: Users, roles: ['admin'] },
  { name: 'Audit Logs', href: '/dashboard/audit', icon: Shield, roles: ['admin'] },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings, roles: ['admin', 'planner', 'brand_manager'] },
];

export function Sidebar() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const filteredNavigation = navigation.filter(item => 
    item.roles.includes(user?.role || '')
  );

  return (
    <div className={cn(
      "gradient-bg border-r border-slate-700 transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          {!collapsed && (
            <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Media Intel
            </h1>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="hover:bg-slate-700"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {filteredNavigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start hover:bg-slate-700",
                    isActive && "bg-slate-700 text-white",
                    collapsed && "px-2"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {!collapsed && <span className="ml-2">{item.name}</span>}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* User Info */}
        {!collapsed && (
          <div className="p-4 border-t border-slate-700">
            <div className="text-sm">
              <p className="font-medium text-white">{user?.name}</p>
              <p className="text-slate-400 capitalize">{user?.role?.replace('_', ' ')}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}