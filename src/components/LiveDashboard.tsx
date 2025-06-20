
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Activity, Database, Info } from "lucide-react";
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

  return (
    <div className="space-y-6">
      {/* Live Status Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-500" />
            Live-Datenstreams
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Live-Datenstreams werden derzeit konfiguriert. Nur echte API-Verbindungen zu offiziellen Datenquellen werden angezeigt.
            </AlertDescription>
          </Alert>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="text-center">
              <Badge variant="outline" className="mb-2">
                <Database className="w-3 h-3 mr-1" />
                CKAN APIs
              </Badge>
              <p className="text-sm text-gray-600">Aktiv - Echte Daten</p>
            </div>
            <div className="text-center">
              <Badge variant="secondary" className="mb-2">
                Live-Sensoren
              </Badge>
              <p className="text-sm text-gray-600">Konfiguration erforderlich</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Echte Daten Verfügbarkeit */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Verfügbare echte Datenquellen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="font-medium">GovData.de CKAN API</span>
              <Badge variant="default">✓ Aktiv</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="font-medium">Open Data Schleswig-Holstein</span>
              <Badge variant="default">✓ Aktiv</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <span className="font-medium">SAPOS GeoNord Korrekturdaten</span>
              <Badge variant="secondary">API-Zugang erforderlich</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <span className="font-medium">Statistikamt Nord</span>
              <Badge variant="secondary">API-Zugang erforderlich</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveDashboard;
