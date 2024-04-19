import axios from 'axios';
//@ts-ignore
import Freecurrencyapi from '@everapi/freecurrencyapi-js';

const baseURL = 'http://localhost:3004'; // Update with your API URL
const freecurrencyapi = new Freecurrencyapi('fca_live_HqFBuQWRMgAgxv2CWpL3o1CfOAKOyKruN9lvHG6Z');

const axiosInstance = axios.create({
  baseURL,
  timeout: 5000, // Timeout after 5 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

const handleError = (error: unknown) => {
  console.error('API Error:', error);
  throw error;
};

const apiService = {
  get: async (url: string) => {
    try {
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  getTickets: async () => {
    return apiService.get('/tickets');
  },

  getSortByStopsData: async () => {
    return apiService.get('/sortByStops');
  },

  getLatestCurrency: async () => {
    try {
      const response = await freecurrencyapi.latest({
        base_currency: 'RUB',
        currencies: 'EUR,USD,RUB',
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
};

export default apiService;
