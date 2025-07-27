'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AnalyticsChart } from '@/components/analytics/analytics-chart';
import { MetricsGrid } from '@/components/analytics/metrics-grid';
import { CampaignTable } from '@/components/analytics/campaign-table';
import { Download, Filter, Calendar } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
          <p className="text-slate-400 mt-1">
            Comprehensive performance insights and campaign analytics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="7days">
            <SelectTrigger className="w-40 bg-slate-700 border-slate-600">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-slate-600 hover:bg-slate-700">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <MetricsGrid />

      {/* Analytics Tabs */}
      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="performance" className="data-[state=active]:bg-slate-700">
            Performance
          </TabsTrigger>
          <TabsTrigger value="audience" className="data-[state=active]:bg-slate-700">
            Audience
          </TabsTrigger>
          <TabsTrigger value="channels" className="data-[state=active]:bg-slate-700">
            Channels
          </TabsTrigger>
          <TabsTrigger value="attribution" className="data-[state=active]:bg-slate-700">
            Attribution
          </TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnalyticsChart 
              title="Revenue Trends"
              subtitle="Campaign revenue over time"
              type="area"
            />
            <AnalyticsChart 
              title="ROI Analysis"
              subtitle="Return on investment by campaign"
              type="bar"
            />
          </div>
          <CampaignTable />
        </TabsContent>

        <TabsContent value="audience" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <AnalyticsChart 
              title="Age Demographics"
              subtitle="Audience breakdown by age group"
              type="pie"
            />
            <AnalyticsChart 
              title="Geographic Distribution"
              subtitle="Reach by region"
              type="bar"
            />
            <Card className="glass-effect p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Audience Insights</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Primary Audience</span>
                  <Badge className="bg-blue-600">25-34 Years</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Peak Hours</span>
                  <Badge className="bg-emerald-600">8PM - 10PM</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Top Device</span>
                  <Badge className="bg-purple-600">Connected TV</Badge>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="channels" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnalyticsChart 
              title="Channel Performance"
              subtitle="Revenue by media channel"
              type="bar"
            />
            <AnalyticsChart 
              title="Channel Mix"
              subtitle="Budget allocation across channels"
              type="pie"
            />
          </div>
        </TabsContent>

        <TabsContent value="attribution" className="space-y-6">
          <Card className="glass-effect p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Attribution Model</h3>
            <p className="text-slate-400">
              Multi-touch attribution analysis coming soon. This will show the customer journey 
              and touchpoint contribution to conversions.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}