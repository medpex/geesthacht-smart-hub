import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, Sun, Wind, Home, TrendingUp, TrendingDown, Calculator, Lightbulb } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const EnergyDashboard = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('zentrum');

  const monthlyConsumption = [
    { month: 'Jan', strom: 8200, waerme: 12500 },
    { month: 'Feb', strom: 7800, waerme: 11200 },
    { month: 'Mar', strom: 7500, waerme: 9800 },
    { month: 'Apr', strom: 7200, waerme: 7500 },
    { month: 'Mai', strom: 6800, waerme: 5200 },
    { month: 'Jun', strom: 6500, waerme: 3800 },
    { month: 'Jul', strom: 6800, waerme: 3200 },
    { month: 'Aug', strom: 6900, waerme: 3500 },
    { month: 'Sep', strom: 7100, waerme: 5800 },
    { month: 'Okt', strom: 7600, waerme: 8200 },
    { month: 'Nov', strom: 8100, waerme: 10500 },
    { month: 'Dez', strom: 8500, waerme: 12800 }
  ];

  const energySources = [
    { name: 'Erdgas', value: 45, color: '#ef4444' },
    { name: 'Fernwärme', value: 25, color: '#f97316' },
    { name: 'Solar', value: 18, color: '#eab308' },
    { name: 'Sonstige', value: 12, color: '#6b7280' }
  ];

  const districtData = {
    zentrum: {
      name: 'Zentrum',
      consumption: 145,
      efficiency: 68,
      solarPotential: 85,
      co2Savings: 1250
    },
    kruemmel: {
      name: 'Krümmel',
      consumption: 98,
      efficiency: 82,
      solarPotential: 78,
      co2Savings: 890
    },
    dueneberg: {
      name: 'Düneberg',
      consumption: 112,
      efficiency: 75,
      solarPotential: 88,
      co2Savings: 1080
    }
  };

  const solarPotentialData = [
    { type: 'Wohngebäude', suitable: 2400, total: 3200, potential: 75 },
    { type: 'Gewerbe', suitable: 180, total: 220, potential: 82 },
    { type: 'Öffentlich', suitable: 45, total: 68, potential: 66 }
  ];

  const currentDistrict = districtData[selectedDistrict as keyof typeof districtData];

  return (
    <div className="space-y-6">
      {/* Energy Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Gesamtverbrauch</p>
                <p className="text-2xl font-bold">89.2 GWh</p>
                <p className="text-xs text-red-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +2.3% vs. Vorjahr
                </p>
              </div>
              <Zap className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Erneuerbare</p>
                <p className="text-2xl font-bold">30%</p>
                <p className="text-xs text-green-600">Ziel: 50% bis 2030</p>
              </div>
              <Sun className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">CO₂-Einsparung</p>
                <p className="text-2xl font-bold">3.2t</p>
                <p className="text-xs text-green-600">pro Haushalt/Jahr</p>
              </div>
              <Wind className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Energieeffizienz</p>
                <p className="text-2xl font-bold">B+</p>
                <p className="text-xs text-blue-600">Stadtdurchschnitt</p>
              </div>
              <Home className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="consumption" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="consumption">Verbrauch</TabsTrigger>
          <TabsTrigger value="sources">Energiequellen</TabsTrigger>
          <TabsTrigger value="solar">Solarpotenzial</TabsTrigger>
          <TabsTrigger value="districts">Stadtteile</TabsTrigger>
        </TabsList>

        <TabsContent value="consumption" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monatlicher Energieverbrauch</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyConsumption}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="strom" stroke="#3b82f6" name="Strom (MWh)" />
                    <Line type="monotone" dataKey="waerme" stroke="#ef4444" name="Wärme (MWh)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Verbrauch nach Sektoren</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Private Haushalte</span>
                    <div className="flex items-center gap-2">
                      <Progress value={65} className="w-32" />
                      <span className="text-sm font-medium">65%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Gewerbe & Industrie</span>
                    <div className="flex items-center gap-2">
                      <Progress value={25} className="w-32" />
                      <span className="text-sm font-medium">25%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Öffentliche Einrichtungen</span>
                    <div className="flex items-center gap-2">
                      <Progress value={10} className="w-32" />
                      <span className="text-sm font-medium">10%</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Energiespar-Tipps</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• LED-Beleuchtung spart bis zu 80% Strom</li>
                    <li>• Heizung um 1°C senken = 6% weniger Verbrauch</li>
                    <li>• Smart Home-Systeme optimieren automatisch</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sources" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Energiequellen-Mix</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={energySources}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {energySources.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Erneuerbare Energien Ausbau</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Sun className="w-5 h-5 text-yellow-500" />
                      <span>Photovoltaik</span>
                    </div>
                    <Badge className="bg-yellow-500">+15% geplant</Badge>
                  </div>
                  <Progress value={18} className="mb-2" />
                  <p className="text-sm text-gray-600">Aktuell: 18% des Strommixes</p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Wind className="w-5 h-5 text-green-500" />
                      <span>Windkraft</span>
                    </div>
                    <Badge className="bg-green-500">Ausbau prüfen</Badge>
                  </div>
                  <Progress value={5} className="mb-2" />
                  <p className="text-sm text-gray-600">Aktuell: 5% des Strommixes</p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-blue-500" />
                      <span>Wasserkraft</span>
                    </div>
                    <Badge variant="secondary">Elbe-Potenzial</Badge>
                  </div>
                  <Progress value={7} className="mb-2" />
                  <p className="text-sm text-gray-600">Aktuell: 7% des Strommixes</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="solar" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sun className="w-5 h-5" />
                  Solarpotenzial nach Gebäudetyp
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={solarPotentialData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="suitable" fill="#eab308" name="Geeignete Dächer" />
                    <Bar dataKey="total" fill="#94a3b8" name="Gesamt Dächer" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Solar-Rechner
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-medium text-yellow-900 mb-2">Beispiel-Berechnung</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Dachfläche:</span>
                      <span className="font-medium">100 m²</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sonnenstunden/Jahr:</span>
                      <span className="font-medium">1.450 h</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Potenzielle Leistung:</span>
                      <span className="font-medium">15 kWp</span>
                    </div>
                    <div className="flex justify-between font-medium text-yellow-900 pt-2 border-t">
                      <span>Jährliche Erzeugung:</span>
                      <span>14.500 kWh</span>
                    </div>
                    <div className="flex justify-between font-medium text-green-700">
                      <span>CO₂-Einsparung:</span>
                      <span>8,7 t/Jahr</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  <Calculator className="w-4 h-4 mr-2" />
                  Persönlichen Solar-Check starten
                </Button>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="text-center p-2 bg-green-50 rounded">
                    <div className="font-bold text-green-800">2.625</div>
                    <div className="text-green-600">geeignete Dächer</div>
                  </div>
                  <div className="text-center p-2 bg-blue-50 rounded">
                    <div className="font-bold text-blue-800">78%</div>
                    <div className="text-blue-600">Ausbaupotenzial</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="districts" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            {Object.entries(districtData).map(([key, data]) => (
              <Button
                key={key}
                variant={selectedDistrict === key ? "default" : "outline"}
                className="h-auto p-4 flex flex-col gap-2"
                onClick={() => setSelectedDistrict(key)}
              >
                <span className="font-medium">{data.name}</span>
                <div className="text-xs text-gray-600">
                  {data.consumption} kWh/m²·Jahr
                </div>
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <Zap className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold">{currentDistrict.consumption}</div>
                <div className="text-sm text-gray-600">kWh/m²·Jahr</div>
                <div className="text-xs text-gray-500 mt-1">Verbrauch</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Home className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold">{currentDistrict.efficiency}%</div>
                <div className="text-sm text-gray-600">Effizienz</div>
                <div className="text-xs text-gray-500 mt-1">vs. Standard</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Sun className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                <div className="text-2xl font-bold">{currentDistrict.solarPotential}%</div>
                <div className="text-sm text-gray-600">Solar-Potenzial</div>
                <div className="text-xs text-gray-500 mt-1">geeignete Flächen</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Wind className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
                <div className="text-2xl font-bold">{currentDistrict.co2Savings}</div>
                <div className="text-sm text-gray-600">kg CO₂</div>
                <div className="text-xs text-gray-500 mt-1">Einsparung/Jahr</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnergyDashboard;
