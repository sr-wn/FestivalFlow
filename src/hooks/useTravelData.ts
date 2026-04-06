import { useState, useEffect, useCallback } from 'react';
import { TravelSearchQuery, TravelOption, DemandForecast, CorridorRisk, FareAlert, FestivalInfo } from '@/lib/types';
import { TravelDataService } from '@/lib/travel-service';

export const useTravelData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const travelService = TravelDataService.getInstance();

  const searchTravelOptions = useCallback(async (query: TravelSearchQuery): Promise<TravelOption[]> => {
    setLoading(true);
    setError(null);
    try {
      const results = await travelService.searchTravelOptions(query);
      return results;
    } catch (err) {
      const errorMessage = 'Failed to search travel options';
      setError(errorMessage);
      console.error(errorMessage, err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getDemandForecast = useCallback(async (origin: string, destination: string): Promise<DemandForecast[]> => {
    setLoading(true);
    setError(null);
    try {
      const results = await travelService.getDemandForecast(origin, destination);
      return results;
    } catch (err) {
      const errorMessage = 'Failed to get demand forecast';
      setError(errorMessage);
      console.error(errorMessage, err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getCorridorRisks = useCallback(async (): Promise<CorridorRisk[]> => {
    setLoading(true);
    setError(null);
    try {
      const results = await travelService.getCorridorRisks();
      return results;
    } catch (err) {
      const errorMessage = 'Failed to get corridor risks';
      setError(errorMessage);
      console.error(errorMessage, err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getFareAlert = useCallback(async (origin: string, destination: string): Promise<FareAlert | null> => {
    setLoading(true);
    setError(null);
    try {
      const results = await travelService.getFareAlert(origin, destination);
      return results;
    } catch (err) {
      const errorMessage = 'Failed to get fare alert';
      setError(errorMessage);
      console.error(errorMessage, err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getFestivalInfo = useCallback(async (): Promise<FestivalInfo[]> => {
    setLoading(true);
    setError(null);
    try {
      const results = await travelService.getFestivalInfo();
      return results;
    } catch (err) {
      const errorMessage = 'Failed to get festival information';
      setError(errorMessage);
      console.error(errorMessage, err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const subscribeToAlerts = useCallback(async (email: string, route: string, preferences: any): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const results = await travelService.subscribeToAlerts(email, route, preferences);
      return results;
    } catch (err) {
      const errorMessage = 'Failed to subscribe to alerts';
      setError(errorMessage);
      console.error(errorMessage, err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    searchTravelOptions,
    getDemandForecast,
    getCorridorRisks,
    getFareAlert,
    getFestivalInfo,
    subscribeToAlerts
  };
};

export const useTravelSearch = (query: TravelSearchQuery | null) => {
  const [results, setResults] = useState<TravelOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);
  const { searchTravelOptions } = useTravelData();

  useEffect(() => {
    if (query) {
      setSearched(true);
      setLoading(true);
      setError(null);
      
      let isMounted = true;
      
      searchTravelOptions(query)
        .then((data) => {
          if (isMounted) {
            setResults(data);
          }
        })
        .catch(err => {
          if (isMounted) {
            const errorMessage = 'Failed to search travel options';
            setError(errorMessage);
            console.error(errorMessage, err);
            setResults([]);
          }
        })
        .finally(() => {
          if (isMounted) {
            setLoading(false);
          }
        });
        
      return () => {
        isMounted = false;
      };
    } else {
      setResults([]);
      setSearched(false);
      setError(null);
      setLoading(false);
    }
  }, [query, searchTravelOptions]);

  return { results, loading, error, searched };
};
