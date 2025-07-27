'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Brain, 
  Target, 
  Zap,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  LineChart,
  PieChart
} from 'lucide-react';

const predictions = [
  {
    id: 1,
    title: 'Q1 Campaign Performance Forecast',
    type: 'Performance',
    confidence: 87,
    status: 'completed',
    prediction: '+15.3% ROI increase expected',
    impact: 'High',
    timeframe: 'Next 90 days',
    accuracy: '92%',
    lastUpdated: '2 hours ago'
  },
  {
    id: 2,
    title: 'Audience Engagement Prediction',
    type: 'Audience',
    confidence: 94,
    status: 'running',
    prediction: 'Peak engagement at 8-10 PM weekdays',
    impact: 'Medium',
    timeframe: 'Next 30 days',
    accuracy: '89%',
    lastUpdated: '15 minutes ago'
  },
  {
    id: 3,
    title: 'Budget Optimization Model',
    type: 'Financial',
    confidence: 78,
    status: 'scheduled',
    prediction: 'Reallocate 12% budget to digital channels',
    impact: 'High',
    timeframe: 'Next 60 days',
    accuracy: '85%',
    lastUpdated: '1 day ago'
  }
];

const models = [
  {
    id: 1,
    name: 'ROI Prediction Model',
    type: 'Regression',
    accuracy: 92.5,
    status: 'active',
    lastTrained: '2024-01-10',
    features: 15,
    predictions: 1250
  },
  {
    id: 2,
    name: 'Audience Segmentation',
    type: 'Clustering',
    accuracy: 88.3,
    status: 'active',
    lastTrained: '2024-01-12',
    features: 22,
    predictions: 890
  },
  {
    id: 3,
    name: 'Channel Attribution',
    type: 'Classification',
    accuracy: 85.7,
    status: 'training',
    lastTrained: '2024-01-14',
    features: 18,
    predictions: 650
  }
];

export default function PredictionsPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-600/20 text-emerald-400';
      case 'running': return 'bg-blue-600/20 text-blue-400';
      case 'scheduled': return 'bg-amber-600/20 text-amber-400';
      case 'active': return 'bg-emerald-600/20 text-emerald-400';
      case 'training': return 'bg-purple-600/20 text-purple-400';
      default: return 'bg-slate-600/20 text-slate-400';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'text-red-400';
      case 'Medium': return 'text-amber-400';
      case 'Low': return 'text-emerald-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Predictive Analytics</h1>
          <p className="text-slate-400 mt-1">
            AI-powered insights and forecasting for media planning optimization
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-slate-600 hover:bg-slate-700">
            <Brain className="h-4 w-4 mr-2" />
            Train Model
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Zap className="h-4 w-4 mr-2" />
            Generate Forecast
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-effect p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Active Models</p>
              <p className="text-2xl font-bold text-white">8</p>
            </div>
            <Brain className="h-8 w-8 text-blue-400" />
          </div>
        </Card>
        <Card className="glass-effect p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Avg Accuracy</p>
              <p className="text-2xl font-bold text-white">89.2%</p>
            </div>
            <Target className="h-8 w-8 text-emerald-400" />
          </div>
        </Card>
        <Card className="glass-effect p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Predictions</p>
              <p className="text-2xl font-bold text-white">2,790</p>
            </div>
            <TrendingUp className="h-8 w-8 text-amber-400" />
          </div>
        </Card>
        <Card className="glass-effect p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Success Rate</p>
              <p className="text-2xl font-bold text-white">94.5%</p>
            </div>
            <CheckCircle className="h-8 w-8 text-purple-400" />
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="predictions" className="space-y-6">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="predictions" className="data-[state=active]:bg-slate-700">
            Predictions
          </TabsTrigger>
          <TabsTrigger value="models" className="data-[state=active]:bg-slate-700">
            ML Models
          </TabsTrigger>
          <TabsTrigger value="insights" className="data-[state=active]:bg-slate-700">
            AI Insights
          </TabsTrigger>
          <TabsTrigger value="scenarios" className="data-[state=active]:bg-slate-700">
            What-If Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="predictions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {predictions.map((prediction) => (
              <Card key={prediction.id} className="glass-effect p-6 hover:bg-slate-800/70 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{prediction.title}</h3>
                    <Badge className="mt-2 bg-blue-600/20 text-blue-400">
                      {prediction.type}
                    </Badge>
                  </div>
                  <Badge className={getStatusColor(prediction.status)}>
                    {prediction.status}
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/50">
                    <p className="text-white font-medium">{prediction.prediction}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Confidence Level</span>
                      <span className="text-white font-medium">{prediction.confidence}%</span>
                    </div>
                    <Progress value={prediction.confidence} className="h-2" />
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-400">Impact:</span>
                        <span className={`ml-2 font-medium ${getImpactColor(prediction.impact)}`}>
                          {prediction.impact}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400">Timeframe:</span>
                        <span className="text-white ml-2">{prediction.timeframe}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Accuracy:</span>
                        <span className="text-white ml-2">{prediction.accuracy}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Updated:</span>
                        <span className="text-white ml-2">{prediction.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="models" className="space-y-6">
          <Card className="glass-effect">
            <div className="p-6 border-b border-slate-700">
              <h3 className="text-lg font-semibold text-white">Machine Learning Models</h3>
              <p className="text-sm text-slate-400">Monitor and manage predictive models</p>
            </div>
            
            <div className="divide-y divide-slate-700/50">
              {models.map((model) => (
                <div key={model.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-medium text-white">{model.name}</h4>
                      <p className="text-sm text-slate-400">{model.type} Model</p>
                    </div>
                    <Badge className={getStatusColor(model.status)}>
                      {model.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Model Accuracy</span>
                      <span className="text-white font-medium">{model.accuracy}%</span>
                    </div>
                    <Progress value={model.accuracy} className="h-2" />
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-slate-400">Features:</span>
                        <span className="text-white ml-2">{model.features}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Predictions:</span>
                        <span className="text-white ml-2">{model.predictions.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Last Trained:</span>
                        <span className="text-white ml-2">{model.lastTrained}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="glass-effect p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded-lg bg-blue-600/20">
                  <BarChart3 className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Performance Insights</h3>
                  <p className="text-sm text-slate-400">Campaign optimization recommendations</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-slate-700/30">
                  <p className="text-sm text-white">Prime time slots show 23% higher engagement</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-700/30">
                  <p className="text-sm text-white">Weekend campaigns have 15% better ROI</p>
                </div>
              </div>
            </Card>

            <Card className="glass-effect p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded-lg bg-emerald-600/20">
                  <LineChart className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Trend Analysis</h3>
                  <p className="text-sm text-slate-400">Market and audience trends</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-slate-700/30">
                  <p className="text-sm text-white">Streaming viewership up 18% this quarter</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-700/30">
                  <p className="text-sm text-white">Mobile engagement increasing 12% monthly</p>
                </div>
              </div>
            </Card>

            <Card className="glass-effect p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded-lg bg-amber-600/20">
                  <PieChart className="h-6 w-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Audience Insights</h3>
                  <p className="text-sm text-slate-400">Demographic and behavioral patterns</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-slate-700/30">
                  <p className="text-sm text-white">25-34 age group most responsive to ads</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-700/30">
                  <p className="text-sm text-white">Sports content drives 31% more engagement</p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-6">
          <Card className="glass-effect p-6">
            <h3 className="text-lg font-semibold text-white mb-4">What-If Scenario Analysis</h3>
            <p className="text-slate-400">
              Interactive scenario modeling to test different budget allocations, timing strategies, 
              and channel mix optimizations.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}