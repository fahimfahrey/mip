'use client';

import { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Download,
  Eye,
  Trash2
} from 'lucide-react';
import { toast } from 'sonner';

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  status: 'processing' | 'completed' | 'error';
  progress: number;
  uploadedAt: string;
  records: number;
  errors: number;
}

export default function FileUploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    {
      id: '1',
      name: 'Q4_Campaign_Data.csv',
      size: '2.4 MB',
      type: 'CSV',
      status: 'completed',
      progress: 100,
      uploadedAt: '2024-01-15 14:30',
      records: 15420,
      errors: 0
    },
    {
      id: '2',
      name: 'Audience_Demographics.xlsx',
      size: '1.8 MB',
      type: 'Excel',
      status: 'processing',
      progress: 65,
      uploadedAt: '2024-01-15 15:45',
      records: 8900,
      errors: 12
    },
    {
      id: '3',
      name: 'Media_Spend_Report.csv',
      size: '950 KB',
      type: 'CSV',
      status: 'error',
      progress: 0,
      uploadedAt: '2024-01-15 16:20',
      records: 0,
      errors: 45
    }
  ]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach(file => {
      const newFile: UploadedFile = {
        id: Date.now().toString(),
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        type: file.name.split('.').pop()?.toUpperCase() || 'Unknown',
        status: 'processing',
        progress: 0,
        uploadedAt: new Date().toLocaleString(),
        records: 0,
        errors: 0
      };
      
      setUploadedFiles(prev => [newFile, ...prev]);
      
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadedFiles(prev => prev.map(f => {
          if (f.id === newFile.id && f.progress < 100) {
            const newProgress = Math.min(f.progress + Math.random() * 20, 100);
            return {
              ...f,
              progress: newProgress,
              status: newProgress === 100 ? 'completed' : 'processing',
              records: newProgress === 100 ? Math.floor(Math.random() * 20000) : 0
            };
          }
          return f;
        }));
      }, 500);
      
      setTimeout(() => {
        clearInterval(interval);
        toast.success(`${file.name} uploaded successfully`);
      }, 3000);
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-600/20 text-emerald-400';
      case 'processing': return 'bg-blue-600/20 text-blue-400';
      case 'error': return 'bg-red-600/20 text-red-400';
      default: return 'bg-slate-600/20 text-slate-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'processing': return Upload;
      case 'error': return XCircle;
      default: return FileText;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">File Upload</h1>
          <p className="text-slate-400 mt-1">
            Upload and validate CSV, Excel, and other data files
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Download className="h-4 w-4 mr-2" />
          Download Template
        </Button>
      </div>

      {/* Upload Area */}
      <Card className="glass-effect p-8">
        <div
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
            dragActive 
              ? 'border-blue-400 bg-blue-400/10' 
              : 'border-slate-600 hover:border-slate-500'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="h-16 w-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            Drop files here or click to upload
          </h3>
          <p className="text-slate-400 mb-6">
            Supports CSV, Excel, JSON files up to 50MB
          </p>
          <input
            type="file"
            multiple
            accept=".csv,.xlsx,.xls,.json"
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button className="bg-blue-600 hover:bg-blue-700" asChild>
              <span>Select Files</span>
            </Button>
          </label>
        </div>
      </Card>

      {/* File Management */}
      <Tabs defaultValue="recent" className="space-y-6">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="recent" className="data-[state=active]:bg-slate-700">
            Recent Uploads
          </TabsTrigger>
          <TabsTrigger value="validation" className="data-[state=active]:bg-slate-700">
            Validation Rules
          </TabsTrigger>
          <TabsTrigger value="templates" className="data-[state=active]:bg-slate-700">
            Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-6">
          <Card className="glass-effect">
            <div className="p-6 border-b border-slate-700">
              <h3 className="text-lg font-semibold text-white">Upload History</h3>
              <p className="text-sm text-slate-400">Track and manage your uploaded files</p>
            </div>
            
            <div className="divide-y divide-slate-700/50">
              {uploadedFiles.map((file) => {
                const StatusIcon = getStatusIcon(file.status);
                return (
                  <div key={file.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-slate-700/50">
                          <StatusIcon className="h-5 w-5 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-white">{file.name}</h4>
                          <p className="text-sm text-slate-400">
                            {file.size} • {file.type} • {file.uploadedAt}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(file.status)}>
                          {file.status}
                        </Badge>
                        <Button variant="ghost" size="sm" className="hover:bg-slate-700">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="hover:bg-slate-700 text-red-400">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {file.status === 'processing' && (
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Processing...</span>
                          <span className="text-white">{file.progress}%</span>
                        </div>
                        <Progress value={file.progress} className="h-2" />
                      </div>
                    )}
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-slate-400">Records:</span>
                        <span className="text-white ml-2">{file.records.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Errors:</span>
                        <span className={`ml-2 ${file.errors > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                          {file.errors}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400">Status:</span>
                        <span className="text-white ml-2 capitalize">{file.status}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="validation" className="space-y-6">
          <Card className="glass-effect p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Data Validation Rules</h3>
            <p className="text-slate-400">
              Configure validation rules for data quality assurance and error detection.
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card className="glass-effect p-6">
            <h3 className="text-lg font-semibold text-white mb-4">File Templates</h3>
            <p className="text-slate-400">
              Download standardized templates for consistent data uploads.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}