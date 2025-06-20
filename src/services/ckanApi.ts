export interface CkanResource {
  id: string;
  name: string;
  description?: string;
  url: string;
  format: string;
  created: string;
  last_modified?: string;
}

export interface CkanPackage {
  id: string;
  name: string;
  title: string;
  notes?: string;
  organization?: {
    title: string;
    name: string;
  };
  resources: CkanResource[];
  metadata_created: string;
  metadata_modified: string;
  tags: Array<{
    name: string;
    display_name: string;
  }>;
}

export interface CkanSearchResponse {
  success: boolean;
  result: {
    count: number;
    results: CkanPackage[];
  };
}

const CKAN_BASE_URL = 'https://www.govdata.de/ckan/api/3/action';
const SH_CKAN_BASE = 'https://opendata.schleswig-holstein.de/api/3/action';

export class CkanApiService {
  static async searchPackages(query: string = 'Geesthacht'): Promise<CkanPackage[]> {
    try {
      // Kombiniere GovData und SH-Portal
      const [govDataResponse, shDataResponse] = await Promise.all([
        fetch(`${CKAN_BASE_URL}/package_search?q=${encodeURIComponent(query)}&rows=50`),
        fetch(`${SH_CKAN_BASE}/package_search?q=${encodeURIComponent(query)}&rows=50`).catch(() => null)
      ]);
      
      const govData: CkanSearchResponse = await govDataResponse.json();
      let allResults = govData.success ? govData.result.results : [];
      
      if (shDataResponse) {
        const shData: CkanSearchResponse = await shDataResponse.json();
        if (shData.success) {
          allResults = [...allResults, ...shData.result.results];
        }
      }
      
      // Entferne Duplikate basierend auf ID
      const uniqueResults = allResults.filter((pkg, index, self) => 
        index === self.findIndex(p => p.id === pkg.id)
      );
      
      console.log('Combined CKAN search results:', uniqueResults);
      return uniqueResults;
    } catch (error) {
      console.error('Error fetching CKAN data:', error);
      throw error;
    }
  }

  static async getPackageDetails(packageId: string): Promise<CkanPackage> {
    try {
      const response = await fetch(`${CKAN_BASE_URL}/package_show?id=${packageId}`);
      const data = await response.json();
      
      if (data.success) {
        return data.result;
      }
      throw new Error('CKAN API package details failed');
    } catch (error) {
      console.error('Error fetching package details:', error);
      throw error;
    }
  }

  static async getResourceData(resourceUrl: string): Promise<any> {
    try {
      const response = await fetch(resourceUrl);
      const contentType = response.headers.get('content-type');
      
      if (contentType?.includes('application/json')) {
        return await response.json();
      } else if (contentType?.includes('text/csv')) {
        return await response.text();
      } else {
        return await response.text();
      }
    } catch (error) {
      console.error('Error fetching resource data:', error);
      throw error;
    }
  }

  static async searchGeesthachtSpecific(): Promise<CkanPackage[]> {
    const queries = ['Geesthacht', 'Herzogtum Lauenburg', 'Kreis Herzogtum Lauenburg'];
    const allResults: CkanPackage[] = [];
    
    for (const query of queries) {
      try {
        const results = await this.searchPackages(query);
        allResults.push(...results);
      } catch (error) {
        console.error(`Error searching for ${query}:`, error);
      }
    }
    
    // Entferne Duplikate und filtere relevante Datensätze
    const uniqueResults = allResults.filter((pkg, index, self) => 
      index === self.findIndex(p => p.id === pkg.id) &&
      (pkg.title.toLowerCase().includes('geesthacht') || 
       pkg.notes?.toLowerCase().includes('geesthacht') ||
       pkg.organization?.name.toLowerCase().includes('geesthacht'))
    );
    
    return uniqueResults;
  }
}
