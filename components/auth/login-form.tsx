'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useAuth } from '@/components/providers/auth-provider';
import { toast } from 'sonner';

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Demo credentials for different roles
      const demoUsers = {
        'admin@media.com': { role: 'admin', name: 'Sarah Admin' },
        'planner@media.com': { role: 'planner', name: 'John Planner' },
        'brand@media.com': { role: 'brand_manager', name: 'Emily Brand' }
      };
      
      const user = demoUsers[formData.email as keyof typeof demoUsers];
      
      if (user && formData.password === 'demo123') {
        login({
          id: '1',
          email: formData.email,
          name: user.name,
          role: user.role as 'admin' | 'planner' | 'brand_manager'
        });
        
        toast.success(`Welcome back, ${user.name}!`);
        router.push('/dashboard');
      } else {
        toast.error('Invalid credentials. Try demo accounts: admin@media.com, planner@media.com, or brand@media.com with password: demo123');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
        <p className="text-slate-400">Sign in to your media intelligence dashboard</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              className="pl-10 bg-slate-700/50 border-slate-600"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              className="pl-10 pr-10 bg-slate-700/50 border-slate-600"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-2 h-6 w-6 p-0"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>
      
      <Card className="p-4 bg-slate-700/30 border-slate-600">
        <h3 className="font-semibold mb-2">Demo Accounts</h3>
        <div className="text-sm text-slate-300 space-y-1">
          <p><strong>Admin:</strong> admin@media.com / demo123</p>
          <p><strong>Planner:</strong> planner@media.com / demo123</p>
          <p><strong>Brand Manager:</strong> brand@media.com / demo123</p>
        </div>
      </Card>
    </div>
  );
}