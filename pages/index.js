import React from 'react';
import axios from 'axios';
import Head from 'next/head';

import Error from '../components/error';
import Table from '../components/table';
import Search from '../components/search';
import Header from '../components/header';
import Pagination from '../components/pagination';

import headers from '../data/headers.json';

export default function Home() {
  // Initialize required app state
  const [rows, setRows] = React.useState([]);
  const [sortField, setSortField] = React.useState('');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [sortDirection, setSortDirection] = React.useState('asc');
  const [totalRows, setTotalRows] = React.useState(1);
  const [rowCount, setRowCount] = React.useState(25);
  const [error, setError] = React.useState('');
  const [page, setPage] = React.useState(1);

  // Fetch/persist api data on initial load and when query params changed
  React.useEffect(() => {
    axios
      .get('/api/data', {
        params: {
          field: sortField,
          search: searchTerm,
          direction: sortDirection,
          size: rowCount,
          page: page,
        },
      })
      .then(({data}) => {
        setTotalRows(data.total);
        setRows(data.results);
      })
      .catch(err => {
        console.error('Error', err);
        setError(err);
      });
  }, [page, rowCount, sortField, searchTerm, sortDirection]);

  // Helper function for initiating csv download
  const initiateDownload = () => {
    const params = new URLSearchParams({
      field: sortField,
      search: searchTerm,
      direction: sortDirection,
    });
    const url = `/api/download/?${params.toString()}`;
    window.open(url);
  };

  return (
    <React.Fragment>
      <div className="w-full p-5">
        <Head>
          <title>score-code</title>
          <meta name="description" content="nfl-rushing code challenge" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header {...{initiateDownload}} />
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
        {error && <Error {...{error}} />}
        <Table headers={headers} rows={rows} />
        <Pagination {...{page, setPage, totalRows, rowCount, setRowCount}} />
      </div>
    </React.Fragment>
  );
}
