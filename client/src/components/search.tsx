import { useEffect } from 'react';

import { useQuery } from 'react-query';

import productService from '../services/productService';
import usePage from '../states/pagination';
import useCartStore from '../states/searching';
import Error from './common/Error';
import Loader from './common/Loader';
import Table from './Table';

const Search = () => {
  const [searching] = useCartStore((state) => [
    state.searching,
    state.setSearchStatus,
  ]);

  const [{ atualPage, perPage }, setDataPage] = usePage((state) => [
    state.dataPage,
    state.setDataPage,
  ]);

  const { data, isLoading, isError, refetch } = useQuery(
    "search",
    () => {
      return productService
        .serach(searching.name, atualPage, perPage)
        .then((response) => {
          setDataPage({
            atualPage: atualPage,
            perPage: perPage,
            total: response.data.total,
          });
          return response.data;
        });
    },
    {
      retry: 1,
    }
  );

  useEffect(() => {
    if (searching.status) {
      refetch();
    }
  }, [searching.name]);

  useEffect(() => {
    refetch();
  }, [atualPage]);

  if (isLoading) {
    console.log("loading search");
    return <Loader />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      {data.total === 0 || data.total === undefined ? (
        <p data-aos="fade-down" className="text-center mt-4 mf-10">
          Nenhum produto foi encontrado
        </p>
      ) : (
        <Table data={data.products} />
      )}

      {/* <Table data={data} /> */}
    </>
  );
};

export default Search;
