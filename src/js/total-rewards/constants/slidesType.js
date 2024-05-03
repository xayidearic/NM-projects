import CompSlide from "../dashboard/slider/CompSlide";
import DevelopmentSlide from "../dashboard/slider/DevelopmentSlide";
import HealthcareSlide from "../dashboard/slider/HealthcareSlide";
import SecuritySlide from "../dashboard/slider/SecuritySlide";
import TimeOffSlide from "../dashboard/slider/TimeOffSlide";
import WellBeingSlide from "../dashboard/slider/WellBeingSlide";

const slidesType = new Map ([
    ['comp', CompSlide],
    ['fs', SecuritySlide],
    ['hc', HealthcareSlide],
    ['well', WellBeingSlide],
    ['timeoff', TimeOffSlide],
    ['career', DevelopmentSlide]
]);

export default slidesType;