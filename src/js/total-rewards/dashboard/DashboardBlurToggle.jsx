import { useDispatch } from 'react-redux';
import { BlurToggle } from '../BlurToggle.jsx';
import { useEffect } from 'react';
import { setHideData } from '../../dux/hideDataSlice.js';
import { CookieManager } from '../../app/cookieManager.js';

const DashboardBlurToggle = ({ blurSlide, setBlurSlide }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHideData({ hideDashboardData: CookieManager.getCookie('hideDashboardData') }));
  }, [dispatch]);

  return (
    <div className="d-flex justify-content-center mt-2 mb-8">
      <BlurToggle cookName="hideDashboardData" landingPage={true} blurSlide={blurSlide} setBlurSlide={setBlurSlide} />
    </div>
  );
};

export default DashboardBlurToggle;
