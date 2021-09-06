const Table = props => {
  const renderHeaders = headers => {
    return headers.map(header => <th key={`th-${header}`}>{header}</th>);
  };

  const renderRows = rows => {
    return rows.map(row => (
      <tr>
        {props.headers.map((header, idx) => {
          const style = idx === 0 ? 'sticky left-0 w-48' : '';
          return <td className={style}>{row[header]}</td>;
        })}
      </tr>
    ));
  };

  return (
    <div className="overflow-x-auto">
      <table class="table w-full table-zebra">
        <thead>
          <tr>{renderHeaders(props.headers)}</tr>
        </thead>
        <tbody>{renderRows(props.rows)}</tbody>
      </table>
    </div>
  );
};

export default Table;
