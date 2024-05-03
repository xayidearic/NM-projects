import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { formatDataAmounts } from '../total-rewards/formatting/formatDataAmounts.js';
import formatPercentages from '../total-rewards/formatting/formatPercentages.js';
import getCookieValue from '../total-rewards/compensation/getCookieValue.js';

/**
 * API Service - define APIs endpoints, fetch data & manage state datacls
 */
export const totalRewardsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/totalrewards',
  }),
  endpoints: (builder) => ({
    getCompensationData: builder.query({
      query: () => '/compensation',
      transformResponse: (response) => {
        const formattedResponse = formatDataAmounts(formatPercentages(response));
        let processedResponse = getCookieValue(formattedResponse, 'hideCompData');
        return processedResponse;
      },
    }),
    getProjectionsData: builder.query({
      query: () => '/projections',
      transformResponse: (response) => {
        return formatDataAmounts(response);
      },
    }),
    getHealthBenefitsData: builder.query({
      query: () => '/benefits',
      transformResponse: (response) => {
        const formattedHCResponse = formatDataAmounts(response);
        const processedHCResponse = getCookieValue(formattedHCResponse, 'hideHCData');

        return processedHCResponse;
      },
    }),
    getRetirementData: builder.query({
      query: () => '/retirement',
      transformResponse: (response) => {
        const formattedResponse = formatDataAmounts(response.data);
        return formattedResponse;
      },
    }),
    getInvestmentsData: builder.query({
      query: () => '/investments',
      transformResponse: (response) => {
        const formattedFSResponse = formatDataAmounts(response);
        const processedFSResponse = getCookieValue(formattedFSResponse, 'hideFSData');

        return processedFSResponse;
      },
    }),
    getDeferredData: builder.query({
      query: () => '/deferred-comp',
    }),
    getDashboardData: builder.query({
      query: () => '/totals',
      transformResponse: (response) => {
        const formattedDashboardResponse = formatDataAmounts(response);
        const processedDashboardResponse = getCookieValue(formattedDashboardResponse, 'hideDashboardData');
        return processedDashboardResponse;
      },
    }),
  }),
});

export const {
  useGetCompensationDataQuery,
  useGetProjectionsDataQuery,
  useGetHealthBenefitsDataQuery,
  useGetRetirementDataQuery,
  useGetInvestmentsDataQuery,
  useGetDeferredDataQuery,
  useGetDashboardDataQuery,
} = totalRewardsApi;
