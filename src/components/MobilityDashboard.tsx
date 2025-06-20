
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Car, Bus, Bike, Train, MapPin, Clock, TrendingUp, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const MobilityDashboard = () => {
  const [selectedRoute, setSelectedRoute] = useState<string>('');

  const commuterData = [
    { direction: 'Nach Hamburg', count: 4200, percentage: 34 },
    { direction: 'Nach Lauenburg', count: 1800, percentage: 15 },
    { direction: 'Nach Bergedorf', count: 2100, percentage: 17 },
    { direction: 'Innerhalb Stadt', count: 3200, percentage: 26 },
    { direction: 'Sonstige', count: 1100, percentage: 8 }
  ];

  const transportModes = [
    { name: 'PKW', value: 65, color: '#ef4444' },
    { name: 'ÖPNV', value: 18, color: '#3b82f6' },
    { name: 'Fahrrad', value: 12, color: '#10b981' },
    { name: 'Zu Fuß', value: 5, color: '#f59e0b' }
  ];

  const busRoutes = [
    { line: '8210', destination: 'Hamburg HBF', frequency: '30 min', capacity: 85, delay: 2 },
    { line: '8220', destination: 'Bergedorf', frequency: '60 min', capacity: 45, delay: 0 },
    { line: '321', destination: 'Lauenburg', frequency: '45 min', capacity: 62, delay: 5 }
  ];

  const trafficHotspots = [
    { location: 'B5 / Bergedorfer Str.', intensity: 92, time: 'Mo-Fr, 7-9 Uhr' },
    { location: 'Elbuferstraße', intensity: 78, time: 'Mo-Fr, 17-19 Uhr' },
    { location: 'Krümmel Zufahrt', intensity: 65, time: 'Wochenende' }
  ];

  return (
    <div className="space-y-6">
      {/* Key Mobility Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pendler täglich</p>
                <p className="text-2xl font-bold">12.400</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +3.1% vs. Vormonat
                </p>
              </div>
              <Car className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">ÖPNV Auslastung</p>
                <p className="text-2xl font-bold">64%</p>
                <p className="text-xs text-yellow-600">Stoßzeiten 85%</p>
              </div>
              <Bus className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Fahrradwege</p>
                <p className="text-2xl font-bold">42 km</p>
                <p className="text-xs text-blue-600">+2.5 km geplant</p>
              </div>
              <Bike className="w-8 h-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Durchschn. Pendelzeit</p>
                <p className="text-2xl font-bold">28 min</p>
                <p className="text-xs text-red-600">+4 min zu Stoßzeiten</p>
              </div>
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pendlerrichtungen */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Pendlerrichtungen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={commuterData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="direction" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Verkehrsmittelverteilung */}
        <Card>
          <CardHeader>
            <CardTitle>Verkehrsmittelwahl</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={transportModes}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {transportModes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ÖPNV Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bus className="w-5 h-5" />
              ÖPNV-Linien Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {busRoutes.map((route, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="font-mono">
                      {route.line}
                    </Badge>
                    <span className="font-medium">{route.destination}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {route.delay > 0 ? (
                      <Badge variant="destructive" className="text-xs">
                        +{route.delay} min Verspätung
                      </Badge>
                    ) : (
                      <Badge variant="default" className="text-xs bg-green-500">
                        Pünktlich
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Takt: </span>
                    <span className="font-medium">{route.frequency}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Auslastung: </span>
                    <span className="font-medium">{route.capacity}%</span>
                  </div>
                </div>
                
                <Progress value={route.capacity} className="mt-2 h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Verkehrs-Hotspots */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="w-5 h-5" />
              Verkehrs-Hotspots
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {trafficHotspots.map((spot, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{spot.location}</h4>
                  <Badge 
                    variant={spot.intensity > 80 ? "destructive" : spot.intensity > 60 ? "secondary" : "default"}
                    className={spot.intensity > 80 ? "" : spot.intensity > 60 ? "bg-yellow-500" : "bg-green-500"}
                  >
                    {spot.intensity}% Auslastung
                  </Badge>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{spot.time}</p>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      spot.intensity > 80 ? 'bg-red-500' : 
                      spot.intensity > 60 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${spot.intensity}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Mobility Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Mobilitätslösungen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Train className="w-6 h-6" />
              <span className="font-medium">S-Bahn Planer</span>
              <span className="text-xs text-gray-600">Nächste Verbindungen</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Bike className="w-6 h-6" />
              <span className="font-medium">Radwege-Navi</span>
              <span className="text-xs text-gray-600">Sichere Routen finden</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Users className="w-6 h-6" />
              <span className="font-medium">Carsharing</span>
              <span className="text-xs text-gray-600">Verfügbare Fahrzeuge</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MobilityDashboard;
