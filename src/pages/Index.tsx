import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, BarChart3, Home, Zap, MessageSquare, Users, TreePine, Car, Database } from "lucide-react";
import InteractiveMap from '@/components/InteractiveMap';
import MobilityDashboard from '@/components/MobilityDashboard';
import QualityScoring from '@/components/QualityScoring';
import EnergyDashboard from '@/components/EnergyDashboard';
import CitizenReporting from '@/components/CitizenReporting';
import StatsOverview from '@/components/StatsOverview';
import RealDataDashboard from '@/components/RealDataDashboard';

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Geesthacht Smart City</h1>
                <p className="text-sm text-gray-600">Interaktives Bürger-Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live Daten aktiv</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-8 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Übersicht</span>
            </TabsTrigger>
            <TabsTrigger value="realdata" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              <span className="hidden sm:inline">Live-Daten</span>
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="hidden sm:inline">Karte</span>
            </TabsTrigger>
            <TabsTrigger value="mobility" className="flex items-center gap-2">
              <Car className="w-4 h-4" />
              <span className="hidden sm:inline">Mobilität</span>
            </TabsTrigger>
            <TabsTrigger value="quality" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Lebensqualität</span>
            </TabsTrigger>
            <TabsTrigger value="energy" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span className="hidden sm:inline">Energie</span>
            </TabsTrigger>
            <TabsTrigger value="reporting" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Meldungen</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <StatsOverview />
          </TabsContent>

          <TabsContent value="realdata" className="space-y-6">
            <RealDataDashboard />
          </TabsContent>

          <TabsContent value="map" className="space-y-6">
            <Card className="p-1">
              <InteractiveMap />
            </Card>
          </TabsContent>

          <TabsContent value="mobility" className="space-y-6">
            <MobilityDashboard />
          </TabsContent>

          <TabsContent value="quality" className="space-y-6">
            <QualityScoring />
          </TabsContent>

          <TabsContent value="energy" className="space-y-6">
            <EnergyDashboard />
          </TabsContent>

          <TabsContent value="reporting" className="space-y-6">
            <CitizenReporting />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur-sm border-t border-blue-200 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-gray-600">
            <p>Live-Datenquellen: <a href="https://www.govdata.de/suche?q=Geesthacht" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GovData.de</a> • <a href="https://opendata.schleswig-holstein.de" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Open Data SH</a> • <a href="https://sapos.geonord.de" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">SAPOS GeoNord</a></p>
            <p className="mt-1">Multi-Source Smart City Dashboard mit Live-Integration</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
