import {
  useEffect,
  useState,
} from 'react';

import { useQuery } from 'react-query';

import productService from '../services/productService';
import usePage from '../states/pagination';
import useCartStore from '../states/searching';
import Error from './common/Error';
import Loader from './common/Loader';
import Search from './search';
import Table from './Table';

const GetAll = () => {
  const [searching] = useCartStore((state) => [
    state.searching,
    state.setSearchStatus,
  ]);

  const [{ atualPage, perPage }, setDataPage] = usePage((state) => [
    state.dataPage,
    state.setDataPage,
  ]);

  const { data, isLoading, isError, refetch } = useQuery(
    "products",
    () => {
      return productService.getAll(atualPage, perPage).then((response) => {
        setDataPage({
          atualPage: atualPage,
          perPage: perPage,
          total: response.data.total,
        });

        return response.data;
      });
    },
    {
      enabled: false,
      retry: 0,
    }
  );

  useEffect(() => {
    refetch();
  }, [atualPage]);

  const [table, setTable] = useState("");

  useEffect(() => {
    console.log(searching);
    if (searching.status) {
      setTable("search");
    } else {
      console.log("caiu no else");
      setTable("");
      refetch();
    }
  }, [searching.name]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      {table !== "search" ? (
        data && data.products ? (
          <Table data={data.products} />
        ) : (
          <Loader />
        )
      ) : (
        <Search />
      )}

      {/* <Table data={data.products} /> */}
    </>
  );
};

export default GetAll;
