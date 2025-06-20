
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { MessageSquare, MapPin, AlertTriangle, CheckCircle, Clock, Trash2, Car, Lightbulb, TreePine, Construction } from "lucide-react";

const CitizenReporting = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [reportTitle, setReportTitle] = useState<string>('');
  const [reportDescription, setReportDescription] = useState<string>('');
  const [reportLocation, setReportLocation] = useState<string>('');

  const reportCategories = [
    { id: 'infrastructure', name: 'Infrastruktur', icon: Construction, color: 'bg-orange-500' },
    { id: 'waste', name: 'Abfall/Sauberkeit', icon: Trash2, color: 'bg-red-500' },
    { id: 'traffic', name: 'Verkehr', icon: Car, color: 'bg-blue-500' },
    { id: 'lighting', name: 'Beleuchtung', icon: Lightbulb, color: 'bg-yellow-500' },
    { id: 'environment', name: 'Umwelt', icon: TreePine, color: 'bg-green-500' },
    { id: 'other', name: 'Sonstiges', icon: MessageSquare, color: 'bg-gray-500' }
  ];

  const recentReports = [
    {
      id: 1,
      title: 'Defekte Straßenlaterne',
      category: 'lighting',
      location: 'Bergedorfer Str. 15',
      status: 'in-progress',
      date: '2024-01-15',
      votes: 12,
      description: 'Straßenlaterne ist seit 3 Tagen defekt, sehr dunkel abends.'
    },
    {
      id: 2,
      title: 'Überfüllter Glascontainer',
      category: 'waste',
      location: 'Marktplatz',
      status: 'resolved',
      date: '2024-01-14',
      votes: 8,
      description: 'Glascontainer ist seit Tagen überfüllt, Glas liegt daneben.'
    },
    {
      id: 3,
      title: 'Schlagloch B5',
      category: 'infrastructure',
      location: 'B5 Richtung Hamburg',
      status: 'reported',
      date: '2024-01-13',
      votes: 25,
      description: 'Großes Schlagloch nach der Ampel, gefährlich für Radfahrer.'
    },
    {
      id: 4,
      title: 'Wildes Parken blockiert Radweg',
      category: 'traffic',
      location: 'Elbuferstraße',
      status: 'in-progress',
      date: '2024-01-12',
      votes: 18,
      description: 'Autos parken regelmäßig auf dem Radweg, Umfahrung gefährlich.'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'reported':
        return <Badge variant="secondary" className="bg-gray-500">Gemeldet</Badge>;
      case 'in-progress':
        return <Badge variant="secondary" className="bg-blue-500">In Bearbeitung</Badge>;
      case 'resolved':
        return <Badge variant="secondary" className="bg-green-500">Erledigt</Badge>;
      default:
        return <Badge variant="secondary">Unbekannt</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'reported':
        return <AlertTriangle className="w-4 h-4 text-gray-500" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <MessageSquare className="w-4 h-4 text-gray-500" />;
    }
  };

  const getCategoryInfo = (categoryId: string) => {
    return reportCategories.find(cat => cat.id === categoryId) || reportCategories[reportCategories.length - 1];
  };

  const handleSubmitReport = () => {
    if (!selectedCategory || !reportTitle || !reportDescription || !reportLocation) {
      toast({
        title: "Unvollständige Angaben",
        description: "Bitte füllen Sie alle Felder aus.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Meldung erfolgreich abgesendet",
      description: "Vielen Dank für Ihre Meldung. Wir werden sie schnellstmöglich bearbeiten.",
    });

    // Reset form
    setSelectedCategory('');
    setReportTitle('');
    setReportDescription('');
    setReportLocation('');
  };

  return (
    <div className="space-y-6">
      {/* Report Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <MessageSquare className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold">247</div>
            <div className="text-sm text-gray-600">Meldungen gesamt</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Clock className="w-8 h-8 mx-auto mb-2 text-orange-600" />
            <div className="text-2xl font-bold">23</div>
            <div className="text-sm text-gray-600">In Bearbeitung</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold">198</div>
            <div className="text-sm text-gray-600">Erledigt</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-red-600" />
            <div className="text-2xl font-bold">26</div>
            <div className="text-sm text-gray-600">Neu gemeldet</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* New Report Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Neue Meldung abgeben
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Kategorie</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Kategorie auswählen" />
                </SelectTrigger>
                <SelectContent>
                  {reportCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      <div className="flex items-center gap-2">
                        <category.icon className="w-4 h-4" />
                        {category.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Titel</label>
              <Input
                placeholder="Kurze Beschreibung des Problems"
                value={reportTitle}
                onChange={(e) => setReportTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Ort</label>
              <Input
                placeholder="z.B. Bergedorfer Str. 15 oder Marktplatz"
                value={reportLocation}
                onChange={(e) => setReportLocation(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Beschreibung</label>
              <Textarea
                placeholder="Detaillierte Beschreibung des Problems..."
                value={reportDescription}
                onChange={(e) => setReportDescription(e.target.value)}
                rows={4}
              />
            </div>

            <Button onClick={handleSubmitReport} className="w-full">
              Meldung abgeben
            </Button>

            <div className="text-xs text-gray-500 text-center">
              Ihre Meldung wird anonymisiert an die Stadtverwaltung weitergeleitet.
            </div>
          </CardContent>
        </Card>

        {/* Category Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Meldungen nach Kategorie</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {reportCategories.map((category) => (
                <div
                  key={category.id}
                  className="p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-8 h-8 ${category.color} rounded-lg flex items-center justify-center`}>
                      <category.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-sm">{category.name}</span>
                  </div>
                  <div className="text-xs text-gray-600">
                    {Math.floor(Math.random() * 20) + 5} Meldungen
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Aktuelle Meldungen</span>
            <Badge variant="secondary">{recentReports.length} Einträge</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReports.map((report) => {
              const categoryInfo = getCategoryInfo(report.category);
              return (
                <div key={report.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 ${categoryInfo.color} rounded-lg flex items-center justify-center`}>
                        <categoryInfo.icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium">{report.title}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                          <MapPin className="w-3 h-3" />
                          {report.location}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(report.status)}
                      <div className="text-xs text-gray-500 mt-1">{report.date}</div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-3">{report.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      {getStatusIcon(report.status)}
                      <span className="capitalize">{report.status}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Button variant="ghost" size="sm" className="h-6 px-2">
                        👍 {report.votes}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CitizenReporting;
