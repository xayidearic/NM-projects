import { BlurToggle } from '../BlurToggle.jsx';
import { useGetDashboardDataQuery } from '../../dux/totalRewardsApi.js';

const DashboardBlurToggle = ({ blurSlide, setBlurSlide }) => {
  const { refetch } = useGetDashboardDataQuery('totals');

  return (
    <div className="d-flex justify-content-center mb-8">
      <BlurToggle cookName="hideDashboardData" refetch={refetch} landingPage={true} blurSlide={blurSlide} setBlurSlide={setBlurSlide} />
    </div>
  );
};

export default DashboardBlurToggle;
