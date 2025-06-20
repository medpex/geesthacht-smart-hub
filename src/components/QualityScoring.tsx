
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Home, School, ShoppingCart, Hospital, TreePine, Volume2, Car, Star } from "lucide-react";

const QualityScoring = () => {
  const [selectedStreet, setSelectedStreet] = useState<string>('bergedorfer-str');
  const [weightings, setWeightings] = useState({
    noise: 25,
    air: 20,
    green: 15,
    shopping: 15,
    education: 10,
    healthcare: 10,
    transport: 5
  });

  const streetData = {
    'bergedorfer-str': {
      name: 'Bergedorfer Straße',
      overallScore: 72,
      factors: {
        noise: { score: 45, label: 'Lärmbelastung', icon: Volume2, unit: 'dB' },
        air: { score: 78, label: 'Luftqualität', icon: TreePine, unit: 'AQI' },
        green: { score: 35, label: 'Grünflächen', icon: TreePine, unit: '%' },
        shopping: { score: 92, label: 'Nahversorgung', icon: ShoppingCart, unit: 'm' },
        education: { score: 88, label: 'Bildung', icon: School, unit: 'Punkte' },
        healthcare: { score: 65, label: 'Gesundheit', icon: Hospital, unit: 'm' },
        transport: { score: 95, label: 'ÖPNV-Anbindung', icon: Car, unit: 'Punkte' }
      }
    },
    'elbuferstr': {
      name: 'Elbuferstraße',
      overallScore: 85,
      factors: {
        noise: { score: 82, label: 'Lärmbelastung', icon: Volume2, unit: 'dB' },
        air: { score: 91, label: 'Luftqualität', icon: TreePine, unit: 'AQI' },
        green: { score: 95, label: 'Grünflächen', icon: TreePine, unit: '%' },
        shopping: { score: 45, label: 'Nahversorgung', icon: ShoppingCart, unit: 'm' },
        education: { score: 72, label: 'Bildung', icon: School, unit: 'Punkte' },
        healthcare: { score: 58, label: 'Gesundheit', icon: Hospital, unit: 'm' },
        transport: { score: 68, label: 'ÖPNV-Anbindung', icon: Car, unit: 'Punkte' }
      }
    },
    'kruemmel': {
      name: 'Krümmel',
      overallScore: 68,
      factors: {
        noise: { score: 88, label: 'Lärmbelastung', icon: Volume2, unit: 'dB' },
        air: { score: 85, label: 'Luftqualität', icon: TreePine, unit: 'AQI' },
        green: { score: 78, label: 'Grünflächen', icon: TreePine, unit: '%' },
        shopping: { score: 35, label: 'Nahversorgung', icon: ShoppingCart, unit: 'm' },
        education: { score: 55, label: 'Bildung', icon: School, unit: 'Punkte' },
        healthcare: { score: 42, label: 'Gesundheit', icon: Hospital, unit: 'm' },
        transport: { score: 48, label: 'ÖPNV-Anbindung', icon: Car, unit: 'Punkte' }
      }
    }
  };

  const currentData = streetData[selectedStreet as keyof typeof streetData];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return 'Sehr gut';
    if (score >= 60) return 'Gut';
    if (score >= 40) return 'Befriedigend';
    return 'Verbesserungsbedarf';
  };

  const calculateWeightedScore = () => {
    let totalScore = 0;
    let totalWeight = 0;
    
    Object.entries(weightings).forEach(([key, weight]) => {
      if (currentData.factors[key as keyof typeof currentData.factors]) {
        totalScore += currentData.factors[key as keyof typeof currentData.factors].score * weight;
        totalWeight += weight;
      }
    });
    
    return Math.round(totalScore / totalWeight);
  };

  return (
    <div className="space-y-6">
      {/* Street Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="w-5 h-5" />
            Lebensqualität nach Straßenzug
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(streetData).map(([key, data]) => (
              <Button
                key={key}
                variant={selectedStreet === key ? "default" : "outline"}
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={() => setSelectedStreet(key)}
              >
                <div className="text-lg font-bold">{data.overallScore}</div>
                <div className="text-sm">{data.name}</div>
                <Badge className={getScoreColor(data.overallScore)}>
                  {getScoreBadge(data.overallScore)}
                </Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Area Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{currentData.name}</span>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-2xl font-bold">{calculateWeightedScore()}</span>
                  <span className="text-sm text-gray-500">/ 100</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(currentData.factors).map(([key, factor]) => (
                  <div key={key} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <factor.icon className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium">{factor.label}</span>
                      </div>
                      <Badge className={getScoreColor(factor.score)}>
                        {factor.score}
                      </Badge>
                    </div>
                    <Progress value={factor.score} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Stadtteil-Vergleich</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(streetData).map(([key, data]) => (
                  <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        selectedStreet === key ? 'bg-blue-500' : 'bg-gray-300'
                      }`} />
                      <span className="font-medium">{data.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={data.overallScore} className="w-24 h-2" />
                      <span className="text-sm font-bold w-8">{data.overallScore}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weighting Controls */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Bewertungskriterien anpassen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(weightings).map(([key, value]) => {
                const factor = currentData.factors[key as keyof typeof currentData.factors];
                if (!factor) return null;
                
                return (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <factor.icon className="w-4 h-4" />
                        <span className="text-sm">{factor.label}</span>
                      </div>
                      <span className="text-sm font-medium">{value}%</span>
                    </div>
                    <Slider
                      value={[value]}
                      onValueChange={(newValue) => 
                        setWeightings(prev => ({ ...prev, [key]: newValue[0] }))
                      }
                      max={50}
                      min={0}
                      step={5}
                      className="w-full"
                    />
                  </div>
                );
              })}
              
              <div className="pt-4 border-t">
                <div className="text-sm text-gray-600 mb-2">
                  Gewichteter Gesamtscore:
                </div>
                <div className="text-2xl font-bold text-center">
                  {calculateWeightedScore()} / 100
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Info */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-lg">Bewertungshilfe</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span>80-100: Sehr gut</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <span>60-79: Gut</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full" />
                <span>40-59: Befriedigend</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <span>0-39: Verbesserungsbedarf</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QualityScoring;
