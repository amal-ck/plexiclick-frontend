
import Banner from './Banner/Banner';
import AdditionalInfo from './AdditionalInfo';
import Categories from './Categories/Categories';
import FeaturedProducts from './FeaturedProducts/FeaturedProducts';
import MetaData from '../Layouts/MetaData';

const Home = () => {

  return (
    <>
      <MetaData title="Plexi Click - The Acrylic Expert" />
      <main className="flex flex-col gap-14">
        <Banner />
        <AdditionalInfo />
        <Categories />
        <FeaturedProducts />
      </main>
    </>
  );
};

export default Home;
