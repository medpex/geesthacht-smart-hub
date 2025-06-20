
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

export class CkanApiService {
  static async searchPackages(query: string = 'Geesthacht'): Promise<CkanPackage[]> {
    try {
      const response = await fetch(`${CKAN_BASE_URL}/package_search?q=${encodeURIComponent(query)}&rows=50`);
      const data: CkanSearchResponse = await response.json();
      
      if (data.success) {
        return data.result.results;
      }
      throw new Error('CKAN API search failed');
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
}
