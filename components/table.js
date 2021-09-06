const Table = props => {
  const renderHeaders = headers => {
    return headers.map(header => <th key={`th-${header}`}>{header}</th>);
  };

  const renderRows = rows => {
    return rows.map(row => (
      <tr key={`row-${row.Player}`.split(' ').join('')}>
        {props.headers.map((header, idx) => (
          <td
            className={idx === 0 ? 'sticky left-0 w-48' : ''}
            key={`td-${row.Player}-${header}`.split(' ').join('')}
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
          <tr>{renderHeaders(props.headers)}</tr>
        </thead>
        <tbody>{renderRows(props.rows)}</tbody>
      </table>
    </div>
  );
};

export default Table;
