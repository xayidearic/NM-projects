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
 * Track data & error
 */
function useFetchData() {
  const benefitsQuery = useGetHealthBenefitsDataQuery('benefitfocus');
  const investmentsQuery = useGetInvestmentsDataQuery('vanguard');
  const retirementQuery = useGetRetirementDataQuery('actuarial');
  const compQuery = useGetCompensationDataQuery('comp');
  const deferredQuery = useGetDeferredDataQuery('newport');
  const projectionsQuery = useGetProjectionsDataQuery('calculations');

  return {
    benefits: benefitsQuery.data,
    investments: investmentsQuery.data,
    retirement: retirementQuery.data,
    comp: compQuery.data,
    deferred: deferredQuery.data,
    projections: projectionsQuery.data,
    render: benefitsQuery.data && investmentsQuery.data && retirementQuery.data && compQuery.data && deferredQuery.data && projectionsQuery.data,
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
