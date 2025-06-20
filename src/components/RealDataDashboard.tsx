import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Database, Satellite, BarChart3, Map, RefreshCw } from "lucide-react";
import { CkanApiService, CkanPackage } from "@/services/ckanApi";
import { LiveDataService, StatistikNordData, WMSLayer } from "@/services/liveDataService";
import LiveDashboard from "./LiveDashboard";

const RealDataDashboard = () => {
  const [packages, setPackages] = useState<CkanPackage[]>([]);
  const [shPackages, setShPackages] = useState<CkanPackage[]>([]);
  const [statistikData, setStatistikData] = useState<StatistikNordData[]>([]);
  const [wmsLayers, setWmsLayers] = useState<WMSLayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("live");
  const { toast } = useToast();

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      
      const [govData, shData, statistik, wms] = await Promise.all([
        CkanApiService.searchPackages('Geesthacht'),
        LiveDataService.getShleswickHolsteinData('Geesthacht'),
        LiveDataService.getStatistikNordData(),
        LiveDataService.getWMSLayers()
      ]);
      
      setPackages(govData);
      setShPackages(shData);
      setStatistikData(statistik);
      setWmsLayers(wms);
      
      toast({
        title: "Alle Datenquellen geladen",
        description: `${govData.length + shData.length} Datensätze, ${wms.length} WMS-Layer gefunden`,
      });
    } catch (error) {
      console.error('Fehler beim Laden der Daten:', error);
      toast({
        title: "Fehler",
        description: "Einige Datenquellen konnten nicht geladen werden",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <Database className="w-12 h-12 mx-auto mb-4 text-blue-600 animate-pulse" />
          <p className="text-lg font-medium">Lade alle Datenquellen...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header mit Datenquellen-Übersicht */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Multi-Source Daten-Integration
            </CardTitle>
            <Button onClick={fetchAllData} variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Aktualisieren
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{packages.length}</div>
              <p className="text-sm text-gray-600">GovData.de</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{shPackages.length}</div>
              <p className="text-sm text-gray-600">Open Data SH</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{statistikData.length}</div>
              <p className="text-sm text-gray-600">Statistik Nord</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{wmsLayers.length}</div>
              <p className="text-sm text-gray-600">WMS Services</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs für verschiedene Datenquellen */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="live" className="flex items-center gap-2">
            <Satellite className="w-4 h-4" />
            Live-Daten
          </TabsTrigger>
          <TabsTrigger value="govdata" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            GovData
          </TabsTrigger>
          <TabsTrigger value="sh-data" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            SH-Portal
          </TabsTrigger>
          <TabsTrigger value="statistik" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Statistik
          </TabsTrigger>
          <TabsTrigger value="wms" className="flex items-center gap-2">
            <Map className="w-4 h-4" />
            WMS/GIS
          </TabsTrigger>
        </TabsList>

        <TabsContent value="live">
          <LiveDashboard />
        </TabsContent>

        <TabsContent value="govdata">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {packages.map((pkg) => (
              <Card key={pkg.id}>
                <CardContent className="p-4">
                  <h4 className="font-medium text-sm mb-2">{pkg.title}</h4>
                  {pkg.organization && (
                    <Badge variant="outline" className="text-xs mb-2">
                      {pkg.organization.title}
                    </Badge>
                  )}
                  <p className="text-xs text-gray-500">
                    {formatDate(pkg.metadata_created)} • {pkg.resources.length} Ressourcen
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sh-data">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {shPackages.map((pkg) => (
              <Card key={pkg.id}>
                <CardContent className="p-4">
                  <h4 className="font-medium text-sm mb-2">{pkg.title}</h4>
                  {pkg.organization && (
                    <Badge variant="secondary" className="text-xs mb-2">
                      SH: {pkg.organization.title}
                    </Badge>
                  )}
                  <p className="text-xs text-gray-500">
                    {formatDate(pkg.metadata_created)} • {pkg.resources.length} Ressourcen
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="statistik">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {statistikData.map((data) => (
              <Card key={data.year}>
                <CardHeader>
                  <CardTitle className="text-lg">{data.year}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Einwohner:</span>
                    <span className="font-medium">{data.population.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Betriebe:</span>
                    <span className="font-medium">{data.businesses}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Arbeitslosigkeit:</span>
                    <span className="font-medium">{data.unemployment_rate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Energie:</span>
                    <span className="font-medium">{data.energy_consumption} GWh</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="wms">
          <div className="space-y-4">
            {wmsLayers.map((layer) => (
              <Card key={layer.name}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{layer.title}</h4>
                      <p className="text-sm text-gray-600">{layer.name}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Bounds: {layer.bounds.join(', ')}
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(layer.url, '_blank')}
                    >
                      <Map className="w-4 h-4 mr-2" />
                      WMS öffnen
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RealDataDashboard;
