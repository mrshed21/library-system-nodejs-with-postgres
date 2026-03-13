import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import Routers from '../routers/Routers';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen dark:bg-slate-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />
      <main className="flex-1   ">
        <Routers />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;