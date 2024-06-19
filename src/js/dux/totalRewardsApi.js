import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { formatDataAmounts } from '../total-rewards/formatting/formatDataAmounts.js';
import formatPercentages from '../total-rewards/formatting/formatPercentages.js';
import getCookieValue from '../total-rewards/compensation/getCookieValue.js';

/**
 * API Service - define APIs endpoints, fetch data & manage state datacls
 */
export const totalRewardsApi = createApi({
  reducerPath: 'totalRewardsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/totalrewards',
  }),
  endpoints: (builder) => ({
    getCompensationData: builder.query({
      query: () => '/compensation',
      transformResponse: (response) => {
        return formatDataAmounts(formatPercentages(response));
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
        return formatDataAmounts(response);
      },
    }),
    getRetirementData: builder.query({
      query: () => '/retirement',
      transformResponse: (response) => {
        return formatDataAmounts(response.data);
      },
    }),
    getInvestmentsData: builder.query({
      query: () => '/investments',
      transformResponse: (response) => {
        return formatDataAmounts(response);
      },
    }),
    getDeferredData: builder.query({
      query: () => '/deferred-comp',
    }),
    getDashboardData: builder.query({
      query: () => '/totals',
      transformResponse: (response) => {
        return formatDataAmounts(response);
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
