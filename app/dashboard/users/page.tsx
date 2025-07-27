'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { UserForm } from '@/components/users/user-form';
import { useAuth } from '@/components/providers/auth-provider';
import { Plus, Search, Edit, Trash2, Shield, Clock } from 'lucide-react';
import { toast } from 'sonner';

const mockUsers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah@media.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2 hours ago',
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    name: 'Mike Chen',
    email: 'mike@media.com',
    role: 'planner',
    status: 'active',
    lastLogin: '5 minutes ago',
    createdAt: '2024-01-20'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    email: 'emily@brand.com',
    role: 'brand_manager',
    status: 'pending',
    lastLogin: 'Never',
    createdAt: '2024-02-01'
  },
  {
    id: 4,
    name: 'David Kim',
    email: 'david@media.com',
    role: 'planner',
    status: 'inactive',
    lastLogin: '2 weeks ago',
    createdAt: '2023-12-10'
  }
];

export default function UsersPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Check if user has admin access
  if (user?.role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Card className="glass-effect p-8 text-center">
          <Shield className="h-16 w-16 text-slate-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Access Denied</h2>
          <p className="text-slate-400">You need administrator privileges to access user management.</p>
        </Card>
      </div>
    );
  }

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
    toast.success('User deleted successfully');
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-600/20 text-red-400';
      case 'planner': return 'bg-blue-600/20 text-blue-400';
      case 'brand_manager': return 'bg-emerald-600/20 text-emerald-400';
      default: return 'bg-slate-600/20 text-slate-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-600/20 text-emerald-400';
      case 'pending': return 'bg-amber-600/20 text-amber-400';
      case 'inactive': return 'bg-slate-600/20 text-slate-400';
      default: return 'bg-slate-600/20 text-slate-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">User Management</h1>
          <p className="text-slate-400 mt-1">
            Manage user accounts, roles, and permissions
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-white">Add New User</DialogTitle>
            </DialogHeader>
            <UserForm onClose={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card className="glass-effect p-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search users by name or email..."
              className="pl-10 bg-slate-700/50 border-slate-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="border-slate-600 hover:bg-slate-700">
            Filter by Role
          </Button>
          <Button variant="outline" className="border-slate-600 hover:bg-slate-700">
            Filter by Status
          </Button>
        </div>
      </Card>

      {/* Users Table */}
      <Card className="glass-effect">
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-lg font-semibold text-white">
            All Users ({filteredUsers.length})
          </h3>
          <p className="text-sm text-slate-400">Manage user accounts and permissions</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-slate-300">User</th>
                <th className="text-left p-4 text-sm font-medium text-slate-300">Role</th>
                <th className="text-left p-4 text-sm font-medium text-slate-300">Status</th>
                <th className="text-left p-4 text-sm font-medium text-slate-300">Last Login</th>
                <th className="text-left p-4 text-sm font-medium text-slate-300">Created</th>
                <th className="text-right p-4 text-sm font-medium text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-t border-slate-700/50 hover:bg-slate-800/30">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-blue-600 text-white text-sm">
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-white">{user.name}</p>
                        <p className="text-xs text-slate-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge className={`capitalize ${getRoleColor(user.role)}`}>
                      {user.role.replace('_', ' ')}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Badge className={`capitalize ${getStatusColor(user.status)}`}>
                      {user.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-slate-300 text-sm">{user.lastLogin}</td>
                  <td className="p-4 text-slate-300 text-sm">{user.createdAt}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" className="hover:bg-slate-700">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="hover:bg-slate-700 text-red-400 hover:text-red-300"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}