
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Database, Download, ExternalLink, Calendar, Tag, Building } from "lucide-react";
import { CkanApiService, CkanPackage, CkanResource } from "@/services/ckanApi";

const RealDataDashboard = () => {
  const [packages, setPackages] = useState<CkanPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState<CkanPackage | null>(null);
  const [resourceData, setResourceData] = useState<any>(null);
  const [loadingResource, setLoadingResource] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchGeesthachtData();
  }, []);

  const fetchGeesthachtData = async () => {
    try {
      setLoading(true);
      const data = await CkanApiService.searchPackages('Geesthacht');
      setPackages(data);
      console.log('Gefundene Datensätze:', data);
      
      toast({
        title: "Daten geladen",
        description: `${data.length} Datensätze für Geesthacht gefunden`,
      });
    } catch (error) {
      console.error('Fehler beim Laden der Daten:', error);
      toast({
        title: "Fehler",
        description: "Daten konnten nicht geladen werden",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadResourceData = async (resource: CkanResource) => {
    try {
      setLoadingResource(true);
      const data = await CkanApiService.getResourceData(resource.url);
      setResourceData(data);
      console.log('Ressource-Daten:', data);
      
      toast({
        title: "Ressource geladen",
        description: `Daten für ${resource.name} erfolgreich abgerufen`,
      });
    } catch (error) {
      console.error('Fehler beim Laden der Ressource:', error);
      toast({
        title: "Fehler",
        description: "Ressource konnte nicht geladen werden",
        variant: "destructive",
      });
    } finally {
      setLoadingResource(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE');
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <Database className="w-12 h-12 mx-auto mb-4 text-blue-600 animate-pulse" />
            <p className="text-lg font-medium">Lade echte Daten von GovData.de...</p>
            <Progress value={undefined} className="w-64 mt-4" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Echte Daten aus GovData.de
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">
                Gefundene Datensätze für Geesthacht: <span className="font-bold">{packages.length}</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Quelle: CKAN REST API - https://www.govdata.de/ckan/api/3/
              </p>
            </div>
            <Button onClick={fetchGeesthachtData} variant="outline" size="sm">
              Aktualisieren
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Datensätze Liste */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Verfügbare Datensätze</h3>
          {packages.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <Building className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">Keine Datensätze gefunden</p>
              </CardContent>
            </Card>
          ) : (
            packages.map((pkg) => (
              <Card 
                key={pkg.id} 
                className={`cursor-pointer transition-all ${
                  selectedPackage?.id === pkg.id ? 'ring-2 ring-blue-500' : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedPackage(pkg)}
              >
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">{pkg.title}</h4>
                    {pkg.organization && (
                      <Badge variant="outline" className="text-xs">
                        {pkg.organization.title}
                      </Badge>
                    )}
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(pkg.metadata_created)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Database className="w-3 h-3" />
                        {pkg.resources.length} Ressourcen
                      </div>
                    </div>
                    {pkg.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {pkg.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag.name} variant="secondary" className="text-xs">
                            {tag.display_name}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Details Panel */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Datensatz Details</h3>
          {selectedPackage ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{selectedPackage.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedPackage.notes && (
                  <div>
                    <h5 className="font-medium text-sm mb-2">Beschreibung</h5>
                    <p className="text-sm text-gray-600">{selectedPackage.notes}</p>
                  </div>
                )}

                <div>
                  <h5 className="font-medium text-sm mb-2">Ressourcen ({selectedPackage.resources.length})</h5>
                  <div className="space-y-2">
                    {selectedPackage.resources.map((resource) => (
                      <div 
                        key={resource.id} 
                        className="p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{resource.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {resource.format}
                              </Badge>
                              {resource.last_modified && (
                                <span className="text-xs text-gray-500">
                                  {formatDate(resource.last_modified)}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                loadResourceData(resource);
                              }}
                              disabled={loadingResource}
                            >
                              <Download className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(resource.url, '_blank');
                              }}
                            >
                              <ExternalLink className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {resourceData && (
                  <div>
                    <h5 className="font-medium text-sm mb-2">Vorschau der Daten</h5>
                    <div className="p-3 bg-gray-50 rounded-lg max-h-64 overflow-auto">
                      <pre className="text-xs text-gray-700">
                        {typeof resourceData === 'string' 
                          ? resourceData.substring(0, 1000) + (resourceData.length > 1000 ? '...' : '')
                          : JSON.stringify(resourceData, null, 2).substring(0, 1000)
                        }
                      </pre>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <Database className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">Wählen Sie einen Datensatz aus, um Details anzuzeigen</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default RealDataDashboard;
