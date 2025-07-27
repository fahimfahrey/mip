'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/components/providers/auth-provider';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Database,
  Palette,
  Globe,
  Save,
  RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';

export default function SettingsPage() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  // Profile settings
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || '',
    timezone: 'America/New_York',
    language: 'en'
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailReports: true,
    pushNotifications: false,
    weeklyDigest: true,
    securityAlerts: true,
    dataUpdates: false,
    campaignAlerts: true
  });

  // System settings (admin only)
  const [systemSettings, setSystemSettings] = useState({
    dataRetention: '24',
    sessionTimeout: '8',
    maxFileSize: '50',
    backupFrequency: 'daily',
    maintenanceMode: false
  });

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveNotifications = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Notification preferences updated');
    } catch (error) {
      toast.error('Failed to update notifications');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSystem = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('System settings updated');
    } catch (error) {
      toast.error('Failed to update system settings');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-slate-400 mt-1">
            Manage your account preferences and system configuration
          </p>
        </div>
        <Button variant="outline" className="border-slate-600 hover:bg-slate-700">
          <RefreshCw className="h-4 w-4 mr-2" />
          Reset to Defaults
        </Button>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="profile" className="data-[state=active]:bg-slate-700">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-slate-700">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-slate-700">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="appearance" className="data-[state=active]:bg-slate-700">
            <Palette className="h-4 w-4 mr-2" />
            Appearance
          </TabsTrigger>
          {user?.role === 'admin' && (
            <TabsTrigger value="system" className="data-[state=active]:bg-slate-700">
              <Database className="h-4 w-4 mr-2" />
              System
            </TabsTrigger>
          )}
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="glass-effect p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 rounded-lg bg-blue-600/20">
                <User className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Profile Information</h3>
                <p className="text-sm text-slate-400">Update your personal details and preferences</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-slate-700/50 border-slate-600"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-slate-700/50 border-slate-600"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select value={profileData.timezone} onValueChange={(value) => setProfileData(prev => ({ ...prev, timezone: value }))}>
                  <SelectTrigger className="bg-slate-700/50 border-slate-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="America/New_York">Eastern Time</SelectItem>
                    <SelectItem value="America/Chicago">Central Time</SelectItem>
                    <SelectItem value="America/Denver">Mountain Time</SelectItem>
                    <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select value={profileData.language} onValueChange={(value) => setProfileData(prev => ({ ...prev, language: value }))}>
                  <SelectTrigger className="bg-slate-700/50 border-slate-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button onClick={handleSaveProfile} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="glass-effect p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 rounded-lg bg-amber-600/20">
                <Bell className="h-6 w-6 text-amber-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Notification Preferences</h3>
                <p className="text-sm text-slate-400">Choose how you want to be notified</p>
              </div>
            </div>

            <div className="space-y-6">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30">
                  <div>
                    <h4 className="text-white font-medium capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </h4>
                    <p className="text-sm text-slate-400">
                      {key === 'emailReports' && 'Receive scheduled reports via email'}
                      {key === 'pushNotifications' && 'Browser push notifications for alerts'}
                      {key === 'weeklyDigest' && 'Weekly summary of platform activity'}
                      {key === 'securityAlerts' && 'Important security notifications'}
                      {key === 'dataUpdates' && 'Notifications when data sources update'}
                      {key === 'campaignAlerts' && 'Campaign performance alerts'}
                    </p>
                  </div>
                  <Switch
                    checked={value}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, [key]: checked }))
                    }
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-6">
              <Button onClick={handleSaveNotifications} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? 'Saving...' : 'Save Preferences'}
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card className="glass-effect p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 rounded-lg bg-red-600/20">
                <Shield className="h-6 w-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Security Settings</h3>
                <p className="text-sm text-slate-400">Manage your account security and privacy</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-4 rounded-lg bg-slate-700/30">
                <h4 className="text-white font-medium mb-2">Change Password</h4>
                <p className="text-sm text-slate-400 mb-4">Update your account password</p>
                <Button variant="outline" className="border-slate-600 hover:bg-slate-700">
                  Change Password
                </Button>
              </div>

              <div className="p-4 rounded-lg bg-slate-700/30">
                <h4 className="text-white font-medium mb-2">Two-Factor Authentication</h4>
                <p className="text-sm text-slate-400 mb-4">Add an extra layer of security to your account</p>
                <Button variant="outline" className="border-slate-600 hover:bg-slate-700">
                  Enable 2FA
                </Button>
              </div>

              <div className="p-4 rounded-lg bg-slate-700/30">
                <h4 className="text-white font-medium mb-2">Active Sessions</h4>
                <p className="text-sm text-slate-400 mb-4">Manage your active login sessions</p>
                <Button variant="outline" className="border-slate-600 hover:bg-slate-700">
                  View Sessions
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6">
          <Card className="glass-effect p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 rounded-lg bg-purple-600/20">
                <Palette className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Appearance Settings</h3>
                <p className="text-sm text-slate-400">Customize the look and feel of your dashboard</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-4 rounded-lg bg-slate-700/30">
                <h4 className="text-white font-medium mb-2">Theme</h4>
                <p className="text-sm text-slate-400 mb-4">Choose your preferred color scheme</p>
                <Select defaultValue="dark">
                  <SelectTrigger className="w-48 bg-slate-700/50 border-slate-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="dark">Dark Theme</SelectItem>
                    <SelectItem value="light">Light Theme</SelectItem>
                    <SelectItem value="auto">Auto (System)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="p-4 rounded-lg bg-slate-700/30">
                <h4 className="text-white font-medium mb-2">Dashboard Layout</h4>
                <p className="text-sm text-slate-400 mb-4">Customize your dashboard layout</p>
                <Select defaultValue="default">
                  <SelectTrigger className="w-48 bg-slate-700/50 border-slate-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="default">Default Layout</SelectItem>
                    <SelectItem value="compact">Compact Layout</SelectItem>
                    <SelectItem value="expanded">Expanded Layout</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* System Settings (Admin Only) */}
        {user?.role === 'admin' && (
          <TabsContent value="system" className="space-y-6">
            <Card className="glass-effect p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 rounded-lg bg-emerald-600/20">
                  <Database className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">System Configuration</h3>
                  <p className="text-sm text-slate-400">Manage system-wide settings and preferences</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="dataRetention">Data Retention (months)</Label>
                  <Input
                    id="dataRetention"
                    type="number"
                    value={systemSettings.dataRetention}
                    onChange={(e) => setSystemSettings(prev => ({ ...prev, dataRetention: e.target.value }))}
                    className="bg-slate-700/50 border-slate-600"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (hours)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={systemSettings.sessionTimeout}
                    onChange={(e) => setSystemSettings(prev => ({ ...prev, sessionTimeout: e.target.value }))}
                    className="bg-slate-700/50 border-slate-600"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="maxFileSize">Max File Size (MB)</Label>
                  <Input
                    id="maxFileSize"
                    type="number"
                    value={systemSettings.maxFileSize}
                    onChange={(e) => setSystemSettings(prev => ({ ...prev, maxFileSize: e.target.value }))}
                    className="bg-slate-700/50 border-slate-600"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="backupFrequency">Backup Frequency</Label>
                  <Select value={systemSettings.backupFrequency} onValueChange={(value) => setSystemSettings(prev => ({ ...prev, backupFrequency: value }))}>
                    <SelectTrigger className="bg-slate-700/50 border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-lg bg-slate-700/30">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Maintenance Mode</h4>
                    <p className="text-sm text-slate-400">Enable maintenance mode for system updates</p>
                  </div>
                  <Switch
                    checked={systemSettings.maintenanceMode}
                    onCheckedChange={(checked) => 
                      setSystemSettings(prev => ({ ...prev, maintenanceMode: checked }))
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button onClick={handleSaveSystem} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? 'Saving...' : 'Save System Settings'}
                </Button>
              </div>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}