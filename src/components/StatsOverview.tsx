
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Users, Car, Zap, TreePine, Home, AlertTriangle } from "lucide-react";

const StatsOverview = () => {
  const cityStats = [
    {
      title: "Einwohner",
      value: "31.020",
      change: "+1.2%",
      trend: "up",
      icon: Users,
      color: "bg-blue-500"
    },
    {
      title: "Pendler täglich",
      value: "12.400",
      change: "+3.1%",
      trend: "up",
      icon: Car,
      color: "bg-green-500"
    },
    {
      title: "Energieverbrauch",
      value: "89.2 GWh",
      change: "-2.3%",
      trend: "down",
      icon: Zap,
      color: "bg-yellow-500"
    },
    {
      title: "Grünflächen",
      value: "42.8%",
      change: "+0.5%",
      trend: "up",
      icon: TreePine,
      color: "bg-emerald-500"
    }
  ];

  const qualityIndicators = [
    { name: "Luftqualität", value: 85, status: "Gut" },
    { name: "Lärmbelastung", value: 35, status: "Niedrig" },
    { name: "Verkehrssicherheit", value: 78, status: "Gut" },
    { name: "Nahversorgung", value: 92, status: "Sehr gut" }
  ];

  const recentAlerts = [
    { type: "Verkehr", message: "Baustelle B5 - Verzögerungen möglich", time: "vor 2h", severity: "medium" },
    { type: "Umwelt", message: "Erhöhte Pollenwerte - Birke", time: "vor 4h", severity: "low" },
    { type: "Energie", message: "Stromverbrauch 12% über Durchschnitt", time: "vor 6h", severity: "medium" }
  ];

  return (
    <div className="space-y-6">
      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cityStats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center mt-1">
                    {stat.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quality Indicators */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              Lebensqualitäts-Indikatoren
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {qualityIndicators.map((indicator, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{indicator.name}</span>
                  <Badge variant={indicator.value > 70 ? "default" : indicator.value > 40 ? "secondary" : "destructive"}>
                    {indicator.status}
                  </Badge>
                </div>
                <Progress value={indicator.value} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Aktuelle Meldungen
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentAlerts.map((alert, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  alert.severity === "high" ? "bg-red-500" : 
                  alert.severity === "medium" ? "bg-yellow-500" : "bg-blue-500"
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {alert.type}
                    </Badge>
                    <span className="text-xs text-gray-500">{alert.time}</span>
                  </div>
                  <p className="text-sm text-gray-900 mt-1">{alert.message}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Schnellaktionen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 text-center bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <MapPin className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Karte öffnen</span>
            </button>
            <button className="p-4 text-center bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
              <MessageSquare className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <span className="text-sm font-medium text-green-900">Meldung abgeben</span>
            </button>
            <button className="p-4 text-center bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors">
              <Zap className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-900">Energie-Check</span>
            </button>
            <button className="p-4 text-center bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
              <Car className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              <span className="text-sm font-medium text-purple-900">ÖPNV-Planer</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsOverview;
