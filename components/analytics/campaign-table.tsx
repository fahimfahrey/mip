'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, TrendingUp, TrendingDown } from 'lucide-react';

const campaigns = [
  {
    id: 1,
    name: 'Summer Brand Campaign',
    status: 'active',
    spend: '$125,000',
    revenue: '$385,000',
    roi: '208%',
    impressions: '2.4M',
    trend: 'up'
  },
  {
    id: 2,
    name: 'Product Launch Q4',
    status: 'active',
    spend: '$89,500',
    revenue: '$245,000',
    roi: '174%',
    impressions: '1.8M',
    trend: 'up'
  },
  {
    id: 3,
    name: 'Holiday Promotion',
    status: 'paused',
    spend: '$65,000',
    revenue: '$125,000',
    roi: '92%',
    impressions: '1.2M',
    trend: 'down'
  },
  {
    id: 4,
    name: 'Brand Awareness Drive',
    status: 'completed',
    spend: '$95,000',
    revenue: '$315,000',
    roi: '232%',
    impressions: '3.1M',
    trend: 'up'
  }
];

export function CampaignTable() {
  return (
    <Card className="glass-effect">
      <div className="p-6 border-b border-slate-700">
        <h3 className="text-lg font-semibold text-white">Campaign Performance</h3>
        <p className="text-sm text-slate-400">Detailed breakdown of all active campaigns</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-800/50">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-slate-300">Campaign</th>
              <th className="text-left p-4 text-sm font-medium text-slate-300">Status</th>
              <th className="text-left p-4 text-sm font-medium text-slate-300">Spend</th>
              <th className="text-left p-4 text-sm font-medium text-slate-300">Revenue</th>
              <th className="text-left p-4 text-sm font-medium text-slate-300">ROI</th>
              <th className="text-left p-4 text-sm font-medium text-slate-300">Impressions</th>
              <th className="text-right p-4 text-sm font-medium text-slate-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign.id} className="border-t border-slate-700/50 hover:bg-slate-800/30">
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div>
                      <p className="text-sm font-medium text-white">{campaign.name}</p>
                      <p className="text-xs text-slate-400">ID: {campaign.id}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <Badge 
                    variant="secondary" 
                    className={`capitalize ${
                      campaign.status === 'active' ? 'bg-emerald-600/20 text-emerald-400' :
                      campaign.status === 'paused' ? 'bg-amber-600/20 text-amber-400' :
                      'bg-slate-600/20 text-slate-400'
                    }`}
                  >
                    {campaign.status}
                  </Badge>
                </td>
                <td className="p-4 text-white">{campaign.spend}</td>
                <td className="p-4 text-white">{campaign.revenue}</td>
                <td className="p-4">
                  <div className="flex items-center space-x-1">
                    {campaign.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-400" />
                    )}
                    <span className="text-white font-medium">{campaign.roi}</span>
                  </div>
                </td>
                <td className="p-4 text-white">{campaign.impressions}</td>
                <td className="p-4 text-right">
                  <Button variant="ghost" size="sm" className="hover:bg-slate-700">
                    <Eye className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}