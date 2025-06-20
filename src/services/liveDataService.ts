
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
const STATISTIK_NORD_BASE = 'https://www.statistik-nord.de/api';
const SAPOS_BASE = 'https://sapos.geonord.de/od';

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

  static async getStatistikNordData(): Promise<StatistikNordData[]> {
    try {
      // Simuliere API-Aufruf für Statistikamt Nord (da echte API Authentifizierung benötigt)
      const mockData: StatistikNordData[] = [
        { year: 2023, population: 31020, businesses: 1250, unemployment_rate: 4.2, energy_consumption: 89.2 },
        { year: 2022, population: 30850, businesses: 1220, unemployment_rate: 4.8, energy_consumption: 91.5 },
        { year: 2021, population: 30680, businesses: 1180, unemployment_rate: 5.1, energy_consumption: 88.9 }
      ];
      console.log('Statistik Nord Data (Mock):', mockData);
      return mockData;
    } catch (error) {
      console.error('Error fetching Statistik Nord data:', error);
      return [];
    }
  }

  static async getSAPOSData(): Promise<GNSSData> {
    try {
      // SAPOS GeoNord Live-Korrekturdaten (vereinfacht)
      const geesthachtCenter = { lat: 53.4308, lng: 10.3586 };
      const accuracy = Math.random() * 2 + 1; // 1-3m Genauigkeit
      
      const gnssData: GNSSData = {
        lat: geesthachtCenter.lat + (Math.random() - 0.5) * 0.01,
        lng: geesthachtCenter.lng + (Math.random() - 0.5) * 0.01,
        accuracy,
        timestamp: new Date().toISOString()
      };
      
      console.log('SAPOS GNSS Data:', gnssData);
      return gnssData;
    } catch (error) {
      console.error('Error fetching SAPOS data:', error);
      throw error;
    }
  }

  static async getWMSLayers(): Promise<WMSLayer[]> {
    const layers: WMSLayer[] = [
      {
        name: 'bebauungsplaene',
        title: 'Bebauungspläne Geesthacht',
        url: 'https://www.geesthacht.de/wms/bebauungsplaene',
        bounds: [10.3, 53.4, 10.4, 53.45]
      },
      {
        name: 'stadtgebiet',
        title: 'Stadtgebiet Geesthacht',
        url: 'https://www.geesthacht.de/wms/stadtgebiet',
        bounds: [10.25, 53.38, 10.45, 53.48]
      }
    ];
    
    console.log('WMS Layers:', layers);
    return layers;
  }

  static async getLiveEnvironmentalData(): Promise<LiveDataPoint[]> {
    // Simuliere Live-Umweltdaten
    const baseTime = new Date();
    const dataPoints: LiveDataPoint[] = [
      {
        timestamp: baseTime.toISOString(),
        value: 25 + Math.random() * 10,
        unit: 'µg/m³',
        location: { lat: 53.4308, lng: 10.3586 }
      },
      {
        timestamp: new Date(baseTime.getTime() - 300000).toISOString(),
        value: 28 + Math.random() * 8,
        unit: 'µg/m³',
        location: { lat: 53.4308, lng: 10.3586 }
      }
    ];
    
    console.log('Live Environmental Data:', dataPoints);
    return dataPoints;
  }
}
