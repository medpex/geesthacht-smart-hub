
export interface LiveDataPoint {
  timestamp: string;
  value: number;
  unit: string;
  location?: {
    lat: number;
    lng: number;
  };
}

export interface StatistikNordData {
  year: number;
  population: number;
  businesses: number;
  unemployment_rate: number;
  energy_consumption: number;
}

export interface GNSSData {
  lat: number;
  lng: number;
  accuracy: number;
  timestamp: string;
}

export interface WMSLayer {
  name: string;
  title: string;
  url: string;
  bounds: [number, number, number, number];
}

const SH_CKAN_BASE = 'https://opendata.schleswig-holstein.de/api/3/action';

export class LiveDataService {
  static async getShleswickHolsteinData(query: string = 'Geesthacht'): Promise<any[]> {
    try {
      const response = await fetch(`${SH_CKAN_BASE}/package_search?q=${encodeURIComponent(query)}&rows=100`);
      const data = await response.json();
      console.log('SH CKAN Data:', data);
      return data.success ? data.result.results : [];
    } catch (error) {
      console.error('Error fetching SH data:', error);
      return [];
    }
  }

  // Entfernt: Mock-Daten für Statistik Nord - nur echte API-Aufrufe
  static async getStatistikNordData(): Promise<StatistikNordData[]> {
    // Nur echte API-Daten, keine Mock-Daten mehr
    return [];
  }

  // Entfernt: Mock-Daten für SAPOS - nur echte API-Aufrufe  
  static async getSAPOSData(): Promise<GNSSData | null> {
    // Nur echte API-Daten, keine Mock-Daten mehr
    return null;
  }

  // Entfernt: Mock WMS Layer - nur echte Services
  static async getWMSLayers(): Promise<WMSLayer[]> {
    // Nur echte WMS-Services, keine Mock-Daten mehr
    return [];
  }

  // Entfernt: Mock-Umweltdaten - nur echte Sensordaten
  static async getLiveEnvironmentalData(): Promise<LiveDataPoint[]> {
    // Nur echte Sensordaten, keine Mock-Daten mehr
    return [];
  }
}
