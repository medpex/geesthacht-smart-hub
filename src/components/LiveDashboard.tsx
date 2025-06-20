
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, MapPin, TrendingUp, Satellite, Database } from "lucide-react";
import { LiveDataService, LiveDataPoint, StatistikNordData, GNSSData } from "@/services/liveDataService";

const LiveDashboard = () => {
  const [liveData, setLiveData] = useState<LiveDataPoint[]>([]);
  const [statistikData, setStatistikData] = useState<StatistikNordData[]>([]);
  const [gnssData, setGnssData] = useState<GNSSData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllLiveData();
    
    // Aktualisiere alle 30 Sekunden
    const interval = setInterval(fetchAllLiveData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchAllLiveData = async () => {
    try {
      setLoading(true);
      const [environmental, statistik, gnss] = await Promise.all([
        LiveDataService.getLiveEnvironmentalData(),
        LiveDataService.getStatistikNordData(),
        LiveDataService.getSAPOSData()
      ]);
      
      setLiveData(environmental);
      setStatistikData(statistik);
      setGnssData(gnss);
    } catch (error) {
      console.error('Error fetching live data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('de-DE', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="space-y-6">
      {/* Live Status Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-500" />
            Live-Datenstreams
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse ml-2"></div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <Badge variant="default" className="mb-2">
                <Database className="w-3 h-3 mr-1" />
                CKAN APIs
              </Badge>
              <p className="text-sm text-gray-600">Aktiv</p>
            </div>
            <div className="text-center">
              <Badge variant="default" className="mb-2">
                <Satellite className="w-3 h-3 mr-1" />
                SAPOS GNSS
              </Badge>
              <p className="text-sm text-gray-600">
                {gnssData ? `±${gnssData.accuracy.toFixed(1)}m` : 'Lädt...'}
              </p>
            </div>
            <div className="text-center">
              <Badge variant="default" className="mb-2">
                <TrendingUp className="w-3 h-3 mr-1" />
                Statistik Nord
              </Badge>
              <p className="text-sm text-gray-600">Verbunden</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Umweltdaten */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Live Luftqualität</CardTitle>
          </CardHeader>
          <CardContent>
            {liveData.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">
                    {liveData[0].value.toFixed(1)} {liveData[0].unit}
                  </span>
                  <Badge variant={liveData[0].value < 25 ? "default" : "secondary"}>
                    {liveData[0].value < 25 ? "Gut" : "Mäßig"}
                  </Badge>
                </div>
                <div className="text-sm text-gray-500">
                  Letztes Update: {formatTime(liveData[0].timestamp)}
                </div>
                <ResponsiveContainer width="100%" height={150}>
                  <LineChart data={liveData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" tickFormatter={formatTime} />
                    <YAxis />
                    <Tooltip 
                      labelFormatter={(value) => `Zeit: ${formatTime(value as string)}`}
                      formatter={(value: number) => [`${value.toFixed(1)} µg/m³`, 'PM2.5']}
                    />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="text-center py-8">
                <Activity className="w-8 h-8 mx-auto mb-2 text-gray-400 animate-pulse" />
                <p className="text-gray-500">Lade Live-Daten...</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* GNSS Position */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              SAPOS Präzisionsposition
            </CardTitle>
          </CardHeader>
          <CardContent>
            {gnssData ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Breitengrad</p>
                    <p className="font-mono text-sm">{gnssData.lat.toFixed(6)}°</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Längengrad</p>
                    <p className="font-mono text-sm">{gnssData.lng.toFixed(6)}°</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Genauigkeit</p>
                  <div className="flex items-center gap-2">
                    <Progress value={Math.max(0, 100 - gnssData.accuracy * 20)} className="flex-1" />
                    <span className="text-sm">±{gnssData.accuracy.toFixed(1)}m</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  Letztes Update: {formatTime(gnssData.timestamp)}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Satellite className="w-8 h-8 mx-auto mb-2 text-gray-400 animate-pulse" />
                <p className="text-gray-500">Verbinde mit SAPOS...</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Statistik Trends */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Statistik Nord - Geesthacht Trends</CardTitle>
          </CardHeader>
          <CardContent>
            {statistikData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={statistikData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line 
                    yAxisId="left" 
                    type="monotone" 
                    dataKey="population" 
                    stroke="#8884d8" 
                    name="Einwohner" 
                  />
                  <Line 
                    yAxisId="left" 
                    type="monotone" 
                    dataKey="businesses" 
                    stroke="#82ca9d" 
                    name="Betriebe" 
                  />
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="unemployment_rate" 
                    stroke="#ffc658" 
                    name="Arbeitslosigkeit %" 
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-8">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-gray-500">Lade Statistik-Daten...</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LiveDashboard;
