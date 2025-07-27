'use client';

import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface ChartContainerProps {
  title: string;
  subtitle: string;
  type: 'line' | 'pie';
}

const lineData = [
  { name: 'Jan', revenue: 4000, spend: 2400 },
  { name: 'Feb', revenue: 3000, spend: 1398 },
  { name: 'Mar', revenue: 2000, spend: 9800 },
  { name: 'Apr', revenue: 2780, spend: 3908 },
  { name: 'May', revenue: 1890, spend: 4800 },
  { name: 'Jun', revenue: 2390, spend: 3800 },
];

const pieData = [
  { name: '18-24', value: 400, color: '#3b82f6' },
  { name: '25-34', value: 300, color: '#10b981' },
  { name: '35-44', value: 300, color: '#f59e0b' },
  { name: '45-54', value: 200, color: '#8b5cf6' },
];

export function ChartContainer({ title, subtitle, type }: ChartContainerProps) {
  return (
    <Card className="glass-effect p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-slate-400">{subtitle}</p>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'line' ? (
            <LineChart data={lineData}>
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
              <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="spend" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          ) : (
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