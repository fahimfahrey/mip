import { LoginForm } from '@/components/auth/login-form';
import { Card } from '@/components/ui/card';
import { TrendingUp, BarChart3, Users, Shield } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Platform Overview */}
        <div className="space-y-8">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Media Intelligence Platform
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Advanced TV media buying analytics and business intelligence for data-driven decisions
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="metric-card">
              <TrendingUp className="h-8 w-8 text-emerald-400 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Real-time Analytics</h3>
              <p className="text-slate-400 text-sm">Live performance tracking and predictive insights</p>
            </div>
            
            <div className="metric-card">
              <BarChart3 className="h-8 w-8 text-blue-400 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Interactive Dashboards</h3>
              <p className="text-slate-400 text-sm">Customizable visualizations and reporting</p>
            </div>
            
            <div className="metric-card">
              <Users className="h-8 w-8 text-amber-400 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Team Collaboration</h3>
              <p className="text-slate-400 text-sm">Role-based access and workflow management</p>
            </div>
            
            <div className="metric-card">
              <Shield className="h-8 w-8 text-purple-400 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Enterprise Security</h3>
              <p className="text-slate-400 text-sm">Multi-factor auth and audit logging</p>
            </div>
          </div>
        </div>
        
        {/* Login Form */}
        <Card className="glass-effect p-8 w-full max-w-md mx-auto">
          <LoginForm />
        </Card>
      </div>
    </div>
  );
}