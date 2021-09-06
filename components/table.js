const Table = ({rows, headers}) => {
  // Function for rendering table header options based on supplied headers
  const renderHeaders = headers => {
    return headers.map(header => <th key={`th-${header}`}>{header}</th>);
  };

  // Function for rendering rows and data elements of supplied row data
  const renderRows = rows => {
    return rows.map(row => (
      <tr key={`row-${row.Player}`}>
        {headers.map((header, idx) => (
          <td
            key={`td-${row.Player}-${header}`}
            className={idx === 0 ? 'sticky left-0 w-48' : ''}
          >
            {row[header]}
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <div className="overflow-x-auto">
      <table className="table w-full table-zebra">
        <thead>
          <tr>{renderHeaders(headers)}</tr>
        </thead>
        <tbody>{renderRows(rows)}</tbody>
      </table>
    </div>
  );
};

export default Table;
