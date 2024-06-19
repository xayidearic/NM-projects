import {
  useGetCompensationDataQuery,
  useGetDeferredDataQuery,
  useGetHealthBenefitsDataQuery,
  useGetInvestmentsDataQuery,
  useGetProjectionsDataQuery,
  useGetRetirementDataQuery,
} from '../../dux/totalRewardsApi.js';

/**
 * Custom hook that encapsulates the endpoint hooks and makes it reusable
 * @returns object containing the data from each query
 * if Projections fails, so does Retirement
 * Benefits and Deferred are not required during loading
 * isError is used to determine if the Main yellow banner should be displayed
 */
function useFetchData() {
  const benefitsQuery = useGetHealthBenefitsDataQuery('benefitfocus');
  const investmentsQuery = useGetInvestmentsDataQuery('vanguard');
  const retirementQuery = useGetRetirementDataQuery('actuarial');
  const compQuery = useGetCompensationDataQuery('comp');
  const deferredQuery = useGetDeferredDataQuery('newport');
  const projectionsQuery = useGetProjectionsDataQuery('calculations');

  return {
    hasInvestmentsLoading: investmentsQuery.isLoading,
    investments: investmentsQuery.data,
    hasInvestmentsError: investmentsQuery.isError,
    retirement: retirementQuery.data,
    hasRetirementLoading: retirementQuery.isLoading,
    hasRetirementError: retirementQuery.isError,
    hasBenefitsError: benefitsQuery.isError || benefitsQuery.isLoading,
    projections: projectionsQuery.data,
    hasProjectionsError: retirementQuery.isError || projectionsQuery.isError || compQuery.isError,
    hasProjectionLoading: retirementQuery.isLoading || projectionsQuery.isLoading || compQuery.isLoading,
    benefits: benefitsQuery.data,
    comp: compQuery.data,
    hasCompError: compQuery.isError,
    deferred: deferredQuery.data,
    hasDeferredError: deferredQuery.isError || deferredQuery.isLoading,
    isError:
      benefitsQuery.isError ||
      investmentsQuery.isError ||
      retirementQuery.isError ||
      compQuery.isError ||
      deferredQuery.isError ||
      projectionsQuery.isError,
  };
}

export default useFetchData;
