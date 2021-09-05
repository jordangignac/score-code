import React from 'react';
import axios from 'axios';
import Head from 'next/head';

import Table from '../components/table';
import Search from '../components/search';
import Header from '../components/header';
import Pagination from '../components/pagination';

import headers from '../data/headers.json';

export default function Home() {
  const [rows, setRows] = React.useState([]);
  const [sortField, setSortField] = React.useState('');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [sortDirection, setSortDirection] = React.useState('asc');

  React.useEffect(() => {
    axios
      .get('/api/data', {
        params: {
          field: sortField,
          search: searchTerm,
          direction: sortDirection,
        },
      })
      .then(({data}) => setRows(data))
      .catch(err => console.error('Error', err));
  }, [sortField, searchTerm, sortDirection]);

  return (
    <React.Fragment data-theme="light">
      <div className="w-full p-5">
        <Head>
          <title>score-code</title>
          <meta name="description" content="nfl-rushing code challenge" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <Search
          {...{
            searchTerm,
            setSearchTerm,
            sortField,
            setSortField,
            sortDirection,
            setSortDirection,
          }}
        />
        <Table headers={headers} rows={rows} />
        <Pagination />
      </div>
    </React.Fragment>
  );
}
