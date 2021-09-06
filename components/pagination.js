const ROW_VALUES = [25, 50, 100];

const Pagination = props => {
  const {page, setPage, totalRows, rowCount, setRowCount} = props;
  const rowTo = Math.min((page - 1) * rowCount + rowCount, totalRows);
  const rowFrom = Math.max((page - 1) * rowCount + 1, 1);
  return (
    <div className="flex align-center justify-between mt-5 px-5">
      <h3 className="mr-5">{`${rowFrom} - ${rowTo} of ${totalRows}`}</h3>
      <div className="flex align-center justify-center">
        <select
          value={rowCount}
          onChange={e => {
            const count = parseInt(e.target.value);
            setPage(count % page);
            setRowCount(count);
          }}
          className="select select-bordered w-36 mr-5 select-sm"
        >
          {ROW_VALUES.map(count => (
            <option
              value={count}
              key={`cnt-${count}`}
            >{`${count} per page`}</option>
          ))}
        </select>
        <div className="btn-group">
          <button
            disabled={rowFrom <= 1}
            onClick={() => setPage(page - 1)}
            className="btn btn-outline btn-sm"
          >
            Previous
          </button>
          <button
            disabled={rowTo === totalRows}
            onClick={() => setPage(page + 1)}
            className="btn btn-outline btn-sm"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
