import '../styles/App.css';

import GetAll from '../components/GetAll';
import Header from '../components/Header';
import Pagination from '../components/Paginations';

const Home = () => {
  return (
    <>
      <main className="h-screen w-screen max-w-screen max-h-screen overflow-hidden py-5 flex flex-col  items-center gap-1  bg-[#1D1E42] ">
        <div className="flex flex-col gap-2 w-11/12  h-full p-2 transition-all duration-300 mb-5">
          <h1 className="p-3 ¨ font-bold text-emerald-200 leading-light text-left text-4xl transition-all duration-300">
            ProductsApp
          </h1>
          <Header />

          <GetAll />
          <Pagination />
        </div>
      </main>
    </>
  );
};

export default Home;
