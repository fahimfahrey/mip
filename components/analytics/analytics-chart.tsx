'use client';

import { Card } from '@/components/ui/card';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface AnalyticsChartProps {
  title: string;
  subtitle: string;
  type: 'area' | 'bar' | 'pie';
}

const areaData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
];

const barData = [
  { name: 'Campaign A', value: 4000 },
  { name: 'Campaign B', value: 3000 },
  { name: 'Campaign C', value: 2000 },
  { name: 'Campaign D', value: 2780 },
];

const pieData = [
  { name: '18-24', value: 30, color: '#3b82f6' },
  { name: '25-34', value: 35, color: '#10b981' },
  { name: '35-44', value: 20, color: '#f59e0b' },
  { name: '45+', value: 15, color: '#8b5cf6' },
];

export function AnalyticsChart({ title, subtitle, type }: AnalyticsChartProps) {
  return (
    <Card className="glass-effect p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-slate-400">{subtitle}</p>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'area' && (
            <AreaChart data={areaData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #475569',
                  borderRadius: '8px'
                }} 
              />
              <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
            </AreaChart>
          )}
          
          {type === 'bar' && (
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #475569',
                  borderRadius: '8px'
                }} 
              />
              <Bar dataKey="value" fill="#10b981" />
            </BarChart>
          )}
          
          {type === 'pie' && (
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </Card>
  );
}