import { useEffect, useState } from 'react';
import { useDataContext } from '@/contexts/DataContext';
import { Bell, CheckCircle, AlertTriangle, Info, X } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
}

export default function LiveNotifications() {
  const { realTimeMetrics } = useDataContext();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Generate notifications based on real-time metrics
  useEffect(() => {
    const newNotifications: Notification[] = [];

    // Energy efficiency notifications
    if (realTimeMetrics.energyEfficiencyScore > 90) {
      newNotifications.push({
        id: `efficiency-${Date.now()}`,
        type: 'success',
        title: 'Excellent Energy Efficiency!',
        message: `Current efficiency score: ${realTimeMetrics.energyEfficiencyScore}%`,
        timestamp: new Date(),
        isRead: false
      });
    } else if (realTimeMetrics.energyEfficiencyScore < 75) {
      newNotifications.push({
        id: `efficiency-low-${Date.now()}`,
        type: 'warning',
        title: 'Energy Efficiency Alert',
        message: `Efficiency dropped to ${realTimeMetrics.energyEfficiencyScore}%. Consider optimizing usage.`,
        timestamp: new Date(),
        isRead: false
      });
    }

    // Battery level notifications
    if (realTimeMetrics.batteryLevel < 30) {
      newNotifications.push({
        id: `battery-${Date.now()}`,
        type: 'warning',
        title: 'Low Battery Level',
        message: `Battery at ${realTimeMetrics.batteryLevel}%. Consider switching to grid power.`,
        timestamp: new Date(),
        isRead: false
      });
    }

    // Temperature notifications
    if (realTimeMetrics.averageTemperature > 26) {
      newNotifications.push({
        id: `temp-${Date.now()}`,
        type: 'info',
        title: 'Temperature Alert',
        message: `Average temperature is ${realTimeMetrics.averageTemperature.toFixed(1)}°C. HVAC optimization recommended.`,
        timestamp: new Date(),
        isRead: false
      });
    }

    // Cost savings milestone
    if (realTimeMetrics.costSavingsToday > 20000) {
      newNotifications.push({
        id: `savings-${Date.now()}`,
        type: 'success',
        title: 'Cost Savings Milestone!',
        message: `You've saved ₹${realTimeMetrics.costSavingsToday.toLocaleString()} today!`,
        timestamp: new Date(),
        isRead: false
      });
    }

    // Air quality notifications
    if (realTimeMetrics.airQualityIndex > 100) {
      newNotifications.push({
        id: `air-${Date.now()}`,
        type: 'warning',
        title: 'Air Quality Alert',
        message: `AQI is ${realTimeMetrics.airQualityIndex}. Consider improving ventilation.`,
        timestamp: new Date(),
        isRead: false
      });
    }

    // Add new notifications (limit to prevent spam)
    if (newNotifications.length > 0) {
      setNotifications(prev => {
        const combined = [...newNotifications, ...prev];
        return combined.slice(0, 10); // Keep only latest 10
      });
    }
  }, [realTimeMetrics]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-600" />;
      default:
        return <Info className="h-4 w-4 text-blue-600" />;
    }
  };

  const getBorderColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-l-green-500';
      case 'warning':
        return 'border-l-yellow-500';
      case 'info':
        return 'border-l-blue-500';
      default:
        return 'border-l-blue-500';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Notification Bell */}
      <div className="relative">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="relative bg-background/80 backdrop-blur-sm border-2"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>

        {/* Notifications Panel */}
        {isOpen && (
          <div className="absolute top-12 right-0 w-80 max-h-96 bg-background border rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b bg-muted/50">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Live Notifications</h3>
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs"
                  >
                    Mark all read
                  </Button>
                )}
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  No notifications yet
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-l-4 ${getBorderColor(notification.type)} ${
                      !notification.isRead ? 'bg-muted/30' : ''
                    } hover:bg-muted/50 transition-colors cursor-pointer`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2 flex-1">
                        {getIcon(notification.type)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-sm truncate">
                              {notification.title}
                            </h4>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeNotification(notification.id);
                        }}
                        className="h-6 w-6 p-0 hover:bg-destructive/10"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-2 border-t bg-muted/50">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setNotifications([])}
                  className="w-full text-xs"
                >
                  Clear all notifications
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
