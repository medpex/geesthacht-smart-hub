
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Layers, MapPin, Volume2, Building, Car, Sun, TreePine, Users } from "lucide-react";

const InteractiveMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [activeLayer, setActiveLayer] = useState<string>('base');
  const [selectedArea, setSelectedArea] = useState<any>(null);

  const mapLayers = [
    { id: 'base', name: 'Stadtplan', icon: MapPin, color: 'bg-blue-500' },
    { id: 'noise', name: 'Lärmkarte', icon: Volume2, color: 'bg-red-500' },
    { id: 'buildings', name: 'Bebauung', icon: Building, color: 'bg-gray-500' },
    { id: 'traffic', name: 'Verkehr', icon: Car, color: 'bg-orange-500' },
    { id: 'solar', name: 'Solarpotenzial', icon: Sun, color: 'bg-yellow-500' },
    { id: 'green', name: 'Grünflächen', icon: TreePine, color: 'bg-green-500' },
    { id: 'population', name: 'Bevölkerung', icon: Users, color: 'bg-purple-500' }
  ];

  // Simulierte Kartendaten für verschiedene Stadtteile
  const areaData = {
    'zentrum': {
      name: 'Zentrum',
      population: 5420,
      noiseLevel: 68,
      solarPotential: 85,
      greenSpace: 25,
      trafficIntensity: 92
    },
    'krümmel': {
      name: 'Krümmel',
      population: 3210,
      noiseLevel: 45,
      solarPotential: 78,
      greenSpace: 65,
      trafficIntensity: 35
    },
    'düneberg': {
      name: 'Düneberg',
      population: 4150,
      noiseLevel: 52,
      solarPotential: 82,
      greenSpace: 45,
      trafficIntensity: 58
    }
  };

  const MapArea = ({ area, data, isActive, onClick }: any) => (
    <div
      className={`absolute rounded-lg border-2 cursor-pointer transition-all duration-300 ${
        isActive 
          ? 'border-blue-500 bg-blue-100/80 shadow-lg scale-105' 
          : 'border-gray-300 bg-white/60 hover:bg-white/80'
      }`}
      style={{
        left: area.x + '%',
        top: area.y + '%',
        width: area.w + '%',
        height: area.h + '%'
      }}
      onClick={() => onClick(area.key, data)}
    >
      <div className="p-2 h-full flex flex-col justify-center">
        <h4 className="font-semibold text-sm text-center">{data.name}</h4>
        <p className="text-xs text-gray-600 text-center">{data.population.toLocaleString()} Einw.</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Layer Controls */}
      <div className="flex flex-wrap gap-2 p-4 bg-white rounded-lg border">
        {mapLayers.map((layer) => (
          <Button
            key={layer.id}
            variant={activeLayer === layer.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveLayer(layer.id)}
            className="flex items-center gap-2"
          >
            <layer.icon className="w-4 h-4" />
            {layer.name}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Interactive Map */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="w-5 h-5" />
                Interaktive Karte - {mapLayers.find(l => l.id === activeLayer)?.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                ref={mapRef}
                className="relative w-full h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg border overflow-hidden"
                style={{
                  backgroundImage: `radial-gradient(circle at 30% 40%, rgba(34, 197, 94, 0.2) 0%, transparent 50%),
                                   radial-gradient(circle at 70% 20%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
                                   radial-gradient(circle at 50% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)`
                }}
              >
                {/* Elbe (Fluss) */}
                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-blue-300 to-blue-200 opacity-60" />
                
                {/* Stadtteile */}
                <MapArea 
                  area={{ key: 'zentrum', x: 25, y: 35, w: 30, h: 25 }}
                  data={areaData.zentrum}
                  isActive={selectedArea?.key === 'zentrum'}
                  onClick={(key: string, data: any) => setSelectedArea({ key, ...data })}
                />
                
                <MapArea 
                  area={{ key: 'krümmel', x: 60, y: 20, w: 25, h: 20 }}
                  data={areaData.krümmel}
                  isActive={selectedArea?.key === 'krümmel'}
                  onClick={(key: string, data: any) => setSelectedArea({ key, ...data })}
                />
                
                <MapArea 
                  area={{ key: 'düneberg', x: 10, y: 15, w: 35, h: 30 }}
                  data={areaData.düneberg}
                  isActive={selectedArea?.key === 'düneberg'}
                  onClick={(key: string, data: any) => setSelectedArea({ key, ...data })}
                />

                {/* Layer-spezifische Overlays */}
                {activeLayer === 'noise' && (
                  <div className="absolute inset-0 bg-red-500/20 rounded-lg">
                    <div className="absolute top-4 left-4">
                      <Badge variant="destructive">Lärmbelastung: Hoch</Badge>
                    </div>
                  </div>
                )}
                
                {activeLayer === 'solar' && (
                  <div className="absolute inset-0 bg-yellow-400/30 rounded-lg">
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-yellow-500">Solarpotenzial: Sehr gut</Badge>
                    </div>
                  </div>
                )}
                
                {activeLayer === 'green' && (
                  <div className="absolute inset-0 bg-green-500/25 rounded-lg">
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-green-600">Grünflächen: 42.8%</Badge>
                    </div>
                  </div>
                )}

                {/* Kompass */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center border shadow-sm">
                  <div className="text-xs font-bold">N</div>
                  <div className="absolute w-0.5 h-3 bg-red-500 -mt-1"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Area Details Panel */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedArea ? `Stadtteil: ${selectedArea.name}` : 'Bereich auswählen'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedArea ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <Users className="w-6 h-6 mx-auto mb-1 text-blue-600" />
                      <div className="text-lg font-bold">{selectedArea.population.toLocaleString()}</div>
                      <div className="text-xs text-gray-600">Einwohner</div>
                    </div>
                    
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <TreePine className="w-6 h-6 mx-auto mb-1 text-green-600" />
                      <div className="text-lg font-bold">{selectedArea.greenSpace}%</div>
                      <div className="text-xs text-gray-600">Grünflächen</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Lärmbelastung</span>
                        <span>{selectedArea.noiseLevel} dB</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            selectedArea.noiseLevel > 65 ? 'bg-red-500' : 
                            selectedArea.noiseLevel > 50 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(selectedArea.noiseLevel, 80)}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Solarpotenzial</span>
                        <span>{selectedArea.solarPotential}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-yellow-500"
                          style={{ width: `${selectedArea.solarPotential}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Verkehrsaufkommen</span>
                        <span>{selectedArea.trafficIntensity}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            selectedArea.trafficIntensity > 70 ? 'bg-red-500' : 
                            selectedArea.trafficIntensity > 40 ? 'bg-orange-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${selectedArea.trafficIntensity}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <Button className="w-full" variant="outline">
                    Detailanalyse anzeigen
                  </Button>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Klicken Sie auf einen Stadtteil auf der Karte, um Details anzuzeigen.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
