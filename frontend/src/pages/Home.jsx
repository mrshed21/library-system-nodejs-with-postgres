import MainSec from '../components/homePage/MainSec';
import StatsSec from '../components/homePage/StatsSec';
import NewBooks from '../components/homePage/NewBooks';
import FeaturesSec from '../components/homePage/FeaturesSec';
import CtaSec from '../components/homePage/CtaSec';

const Home = () => {
  return (
    <div className="w-full overflow-hidden">
      <MainSec />
      <StatsSec />
      <NewBooks />
      <FeaturesSec />
      <CtaSec />
    </div>
  );
};

export default Home;